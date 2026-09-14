import { chromium } from 'playwright';
import path from 'path';

const screenshotDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\bbe8d348-7320-42b2-8845-6cf138c6c7f4';

async function runTests() {
  console.log('--- Launching Chromium Browser ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`Browser console error: ${msg.text()}`);
    }
  });

  console.log('1. Navigating to http://127.0.0.1:5173...');
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });

  // 1. Check title
  const title = await page.title();
  console.log(`Page title: "${title}"`);
  if (!title.includes('Dev Vela')) {
    throw new Error(`Unexpected page title: ${title}`);
  }

  // Verify 3D Model Viewer and Model Loading
  console.log('1b. Checking 3D Model Viewer & Loading...');
  await page.waitForSelector('.model-viewer', { state: 'visible' });
  await page.waitForSelector('.model-viewer__controls', { state: 'visible', timeout: 20000 });
  console.log('3D Model loaded and controls rendered successfully!');

  const modelViewerElement = page.locator('.model-viewer');
  await page.waitForTimeout(800); // Allow initial WebGL render to stabilize
  const modelBox = await modelViewerElement.boundingBox();

  // Take 3D model Dark Mode screenshot
  const modelDarkPath = path.join(screenshotDir, 'model3d_dark_mode.png');
  await page.screenshot({ path: modelDarkPath, clip: modelBox });
  console.log(`Saved screenshot: ${modelDarkPath}`);

  // Test Auto-Rotate toggle
  console.log('Testing Auto-Rotate toggle...');
  const autoRotateBtn = page.locator('.model-viewer__btn', { hasText: 'Auto Rotate' });
  await autoRotateBtn.click();
  await page.waitForTimeout(300);
  const rotatingStatus = await page.locator('.model-viewer__btn', { hasText: 'Rotating' }).isVisible();
  console.log(`Auto-rotate rotating visible: ${rotatingStatus}`);
  await page.locator('.model-viewer__btn', { hasText: 'Rotating' }).click(); // toggle back off
  await page.waitForTimeout(300);

  // Scroll down to trigger reveal animations for all sections
  await page.evaluate(async () => {
    const distance = 400;
    const delay = 40;
    let prevTop = -1;
    while (
      document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight - 10 &&
      document.scrollingElement.scrollTop !== prevTop
    ) {
      prevTop = document.scrollingElement.scrollTop;
      document.scrollingElement.scrollBy(0, distance);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);

  // Take screenshot: Dark mode homepage
  const darkPath = path.join(screenshotDir, 'dark_mode_home.png');
  await page.screenshot({ path: darkPath, fullPage: true });
  console.log(`Saved screenshot: ${darkPath}`);

  // 2. Test Theme Toggle (Dark -> Light)
  console.log('2. Testing Theme Toggle...');
  const themeToggleBtn = page.locator('.theme-toggle');
  await themeToggleBtn.click();
  await page.waitForTimeout(500);
  const themeAttr1 = await page.locator('html').getAttribute('data-theme');
  console.log(`Theme after toggle 1: ${themeAttr1}`);
  if (themeAttr1 !== 'light') throw new Error(`Expected light theme, got ${themeAttr1}`);

  // Take 3D model Light Mode screenshot
  const lightModelBox = await modelViewerElement.boundingBox();
  const modelLightPath = path.join(screenshotDir, 'model3d_light_mode.png');
  await page.screenshot({ path: modelLightPath, clip: lightModelBox });
  console.log(`Saved screenshot: ${modelLightPath}`);

  // Take screenshot: Light mode homepage
  const lightPath = path.join(screenshotDir, 'light_mode_home.png');
  await page.screenshot({ path: lightPath, fullPage: false });
  console.log(`Saved screenshot: ${lightPath}`);

  // Toggle back to Dark
  await themeToggleBtn.click();
  await page.waitForTimeout(200);
  const themeAttr2 = await page.locator('html').getAttribute('data-theme');
  console.log(`Theme after toggle 2: ${themeAttr2}`);
  if (themeAttr2 !== 'dark') throw new Error(`Expected dark theme, got ${themeAttr2}`);

  // 3. Test Language Selector (English -> Spanish)
  console.log('3. Testing Language Selector...');
  const langBtn = page.locator('.translate__button');
  await langBtn.click();
  await page.waitForTimeout(200);

  // Click Español
  const esOption = page.locator('.translate__option', { hasText: 'Español' });
  await esOption.click();
  await page.waitForTimeout(300);

  const aboutHeading = await page.locator('#about-heading').innerText();
  console.log(`About heading in Spanish: "${aboutHeading}"`);
  if (!aboutHeading.includes('Acerca de Mí')) {
    throw new Error(`Expected 'Acerca de Mí', got: ${aboutHeading}`);
  }

  // Switch back to English
  await langBtn.click();
  await page.locator('.translate__option', { hasText: 'English' }).click();
  await page.waitForTimeout(300);

  // 4. Test Project Filtering
  console.log('4. Testing Project Filtering...');
  const allCardsCount = await page.locator('.project-card').count();
  console.log(`Total projects before filtering: ${allCardsCount}`);

  // Click "Backend & Systems"
  await page.locator('.projects__filter-btn', { hasText: 'Backend & Systems' }).click();
  await page.waitForTimeout(200);
  const backendCardsCount = await page.locator('.project-card').count();
  console.log(`Backend projects visible: ${backendCardsCount}`);
  if (backendCardsCount !== 1) {
    throw new Error(`Expected 1 backend project, got ${backendCardsCount}`);
  }

  // Reset filter to All
  await page.locator('.projects__filter-btn', { hasText: 'All Projects' }).click();
  await page.waitForTimeout(200);

  // 5. Test Project Quick View Modal
  console.log('5. Testing Project Quick View Modal...');
  const firstProjectBtn = page.locator('.project-card__title-btn').first();
  const firstProjectTitle = await firstProjectBtn.innerText();
  console.log(`Opening modal for: "${firstProjectTitle}"`);
  await firstProjectBtn.click();
  await page.waitForSelector('.project-modal', { state: 'visible' });
  await page.waitForTimeout(400); // Wait for modal entrance animation to finish

  // Modal screenshot
  const modalPath = path.join(screenshotDir, 'project_modal.png');
  await page.screenshot({ path: modalPath, fullPage: false });
  console.log(`Saved screenshot: ${modalPath}`);

  // Close modal via Escape key
  await page.keyboard.press('Escape');
  await page.waitForSelector('.project-modal', { state: 'hidden' });
  console.log('Modal closed successfully via ESC key.');

  // 6. Test Copy Email & Toast Notification
  console.log('6. Testing Copy Email & Toast Notification...');
  await page.locator('.hero__cta-secondary').click();
  await page.waitForSelector('.toast-notification--visible', { state: 'visible' });
  const toastText = await page.locator('.toast-notification__message').innerText();
  console.log(`Toast displayed: "${toastText}"`);
  if (!toastText.includes('copied to clipboard')) {
    throw new Error(`Unexpected toast text: ${toastText}`);
  }

  // 6b. Test Resume button
  console.log('6b. Testing Resume link...');
  const resumeBtn = page.locator('.hero__cta-resume');
  const resumeHref = await resumeBtn.getAttribute('href');
  console.log(`Resume link href: "${resumeHref}"`);
  if (!resumeHref) throw new Error('Resume link has no href');

  // 7. Test Contact Form Validation & Submission
  console.log('7. Testing Contact Form...');
  // Scroll to contact form
  await page.locator('#contact').scrollIntoViewIfNeeded();
  
  // Try submitting empty
  await page.locator('.contact__submit-btn').click();
  await page.waitForTimeout(200);
  const nameError = await page.locator('#name-error').innerText();
  console.log(`Validation error shown: "${nameError}"`);

  // Fill valid inputs
  await page.locator('#name').fill('Sarah Connor');
  await page.locator('#email').fill('sarah@cyberdyne.com');
  await page.locator('#message').fill('Excited to collaborate on decentralized applications and backend infrastructure.');
  await page.locator('.contact__submit-btn').click();

  // Wait for success banner
  await page.waitForSelector('.contact__success-banner', { state: 'visible', timeout: 5000 });
  const successText = await page.locator('.contact__success-banner').innerText();
  console.log(`Success banner text: "${successText}"`);

  // 8. Test Mobile Viewport
  console.log('8. Testing Mobile Viewport (375x667)...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });

  // Check mobile hamburger button
  const toggleBtn = page.locator('.nav__toggle-btn');
  const isToggleVisible = await toggleBtn.isVisible();
  console.log(`Mobile toggle visible: ${isToggleVisible}`);
  if (!isToggleVisible) throw new Error('Mobile hamburger button not visible on 375px');

  // Open mobile drawer
  await toggleBtn.click();
  await page.waitForSelector('.nav__drawer--open', { state: 'visible' });
  await page.waitForTimeout(400); // Wait for drawer entrance animation to finish
  console.log('Mobile drawer opened successfully.');

  const mobilePath = path.join(screenshotDir, 'mobile_drawer.png');
  await page.screenshot({ path: mobilePath, fullPage: false });
  console.log(`Saved screenshot: ${mobilePath}`);

  await toggleBtn.click();
  await page.waitForSelector('.nav__drawer--open', { state: 'hidden' });
  console.log('Mobile drawer closed successfully.');

  console.log('\n=========================================');
  console.log('ALL TESTS PASSED WITH 100% SUCCESS!');
  console.log('=========================================');

  await browser.close();
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
