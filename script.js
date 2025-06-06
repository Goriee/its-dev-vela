// script.js - Vela Portfolio
// Mobile navigation, real-time translation, and scroll animations

document.addEventListener('DOMContentLoaded', () => {
  // Initialize translation service
  const translationService = new TranslationService();
    // Store original content for translation - Auto-detects ALL content
  function captureOriginalContent() {
    return {
      title: document.title,
      heroTitle: document.querySelector('.hero__title')?.innerHTML,
      heroSubtitle: document.querySelector('.hero__subtitle')?.textContent,
      heroDesc: document.querySelector('.hero__desc')?.textContent,
      viewWork: document.querySelector('.hero__cta')?.textContent,
      aboutHeading: document.querySelector('.about__heading')?.textContent,
      aboutText: document.querySelector('.about__text p')?.textContent,
      educationHeading: document.querySelector('.education__heading')?.textContent,
      projectsHeading: document.querySelector('.projects__heading')?.textContent,
      contactHeading: document.querySelector('.contact__heading')?.textContent,
      nameLabel: document.querySelector('label[for="name"]')?.textContent,
      emailLabel: document.querySelector('label[for="email"]')?.textContent,
      messageLabel: document.querySelector('label[for="message"]')?.textContent,
      sendButton: document.querySelector('.contact__submit')?.textContent,
      footerText: document.querySelector('.footer__text')?.textContent,
      // Automatically capture ALL projects (no manual updates needed!)
      projectTitles: Array.from(document.querySelectorAll('.project__title')).map(el => el.textContent),
      projectDescs: Array.from(document.querySelectorAll('.project__desc')).map(el => {
        // Extract text without GitHub link
        const clone = el.cloneNode(true);
        const githubLink = clone.querySelector('strong');
        if (githubLink) githubLink.remove();
        return clone.textContent.trim();
      }),
      projectLinks: Array.from(document.querySelectorAll('.project__link')).map(el => el.textContent),
      // Auto-capture education items
      educationItems: Array.from(document.querySelectorAll('.education__item')).map(el => ({
        year: el.querySelector('.education__year')?.textContent,
        degree: el.querySelector('.education__degree')?.textContent,
        school: el.querySelector('.education__school')?.textContent
      }))
    };
  }
  
  const originalContent = captureOriginalContent();
  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Translation Feature
  const translateButton = document.getElementById('translateButton');
  const translateDropdown = document.getElementById('translateDropdown');
  const translateOptions = document.querySelectorAll('.translate__option');

  if (translateButton && translateDropdown) {
    // Handle translate button click
    translateButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = translateButton.getAttribute('aria-expanded') === 'true';
      
      translateButton.setAttribute('aria-expanded', !isExpanded);
      translateDropdown.classList.toggle('active');
    });    // Close translate dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!translateButton.contains(e.target) && !translateDropdown.contains(e.target)) {
        translateButton.setAttribute('aria-expanded', 'false');
        translateDropdown.classList.remove('active');
      }
    });

    // Translation dictionary
    const translations = {
      en: {
        title: "My Portfolio",
        heroTitle: "Hi, It's me Dev Vela",
        heroSubtitle: "Aspiring Backend Developer & Web3 Gamer",
        heroDesc: "I build efficient backend solutions, explore Web3 gaming, and love learning new tech and trading strategies.",
        viewWork: "View My Work",
        aboutHeading: "About Me",
        aboutText: "I am a backend developer and Web3 enthusiast with a knack for building secure and scalable server-side applications. My journey in tech spans from creating traditional web applications to exploring decentralized platforms. Currently, I am diving into the world of trading, constantly learning strategies to navigate the markets.",
        educationHeading: "Education",
        projectsHeading: "Projects",
        contactHeading: "Contact",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        sendButton: "Send",
        footerText: "© 2025 De Vela. Built with HTML, CSS & JS.",
        translate: "Translate",
        classroomTitle: "Classroom Reserve",
        classroomDesc: "A classroom reservation system for managing and booking rooms efficiently. Built with modern web technologies.",
        scraperTitle: "Web Scraper & AI Chatbot",
        scraperDesc: "A web application that combines web scraping capabilities with an AI-powered chatbot for intelligent data extraction and interaction.",
        viewProject: "View Project"
      },
      es: {
        title: "Mi Portafolio",
        heroTitle: "Hola, Soy Dev Vela",
        heroSubtitle: "Aspirante a Desarrollador Backend y Gamer Web3",
        heroDesc: "Construyo soluciones backend eficientes, exploro juegos Web3 y me encanta aprender nuevas tecnologías y estrategias de trading.",
        viewWork: "Ver Mi Trabajo",
        aboutHeading: "Acerca de Mí",
        aboutText: "Soy un desarrollador backend y entusiasta de Web3 con talento para construir aplicaciones del lado del servidor seguras y escalables. Mi viaje en tecnología abarca desde crear aplicaciones web tradicionales hasta explorar plataformas descentralizadas. Actualmente, me estoy sumergiendo en el mundo del trading, aprendiendo constantemente estrategias para navegar los mercados.",
        educationHeading: "Educación",
        projectsHeading: "Proyectos",
        contactHeading: "Contacto",
        nameLabel: "Nombre",
        emailLabel: "Correo Electrónico",
        messageLabel: "Mensaje",
        sendButton: "Enviar",
        footerText: "© 2025 De Vela. Construido con HTML, CSS y JS.",
        translate: "Traducir",
        classroomTitle: "Reserva de Aula",
        classroomDesc: "Un sistema de reserva de aulas para gestionar y reservar salas de manera eficiente. Construido con tecnologías web modernas.",
        scraperTitle: "Web Scraper y Chatbot IA",
        scraperDesc: "Una aplicación web que combina capacidades de web scraping con un chatbot impulsado por IA para extracción e interacción inteligente de datos.",
        viewProject: "Ver Proyecto"
      },
      'zh-CN': {
        title: "我的作品集",
        heroTitle: "你好，我是 Dev Vela",
        heroSubtitle: "有抱负的后端开发者和Web3游戏玩家",
        heroDesc: "我构建高效的后端解决方案，探索Web3游戏，喜欢学习新技术和交易策略。",
        viewWork: "查看我的作品",
        aboutHeading: "关于我",
        aboutText: "我是一名后端开发者和Web3爱好者，擅长构建安全且可扩展的服务器端应用程序。我的技术之旅从创建传统Web应用程序到探索去中心化平台。目前，我正在深入交易世界，不断学习导航市场的策略。",
        educationHeading: "教育背景",
        projectsHeading: "项目",
        contactHeading: "联系我",
        nameLabel: "姓名",
        emailLabel: "邮箱",
        messageLabel: "消息",
        sendButton: "发送",
        footerText: "© 2025 De Vela. 使用HTML、CSS和JS构建。",
        translate: "翻译",
        classroomTitle: "教室预约",
        classroomDesc: "一个高效管理和预订房间的教室预约系统。使用现代网络技术构建。",
        scraperTitle: "网络爬虫和AI聊天机器人",
        scraperDesc: "一个结合网络爬虫功能和AI驱动聊天机器人的网络应用程序，用于智能数据提取和交互。",
        viewProject: "查看项目"
      },
      ja: {
        title: "私のポートフォリオ",
        heroTitle: "こんにちは、Dev Velaです",
        heroSubtitle: "バックエンド開発者志望＆Web3ゲーマー",
        heroDesc: "効率的なバックエンドソリューションを構築し、Web3ゲームを探求し、新しい技術と取引戦略を学ぶことが大好きです。",
        viewWork: "私の作品を見る",
        aboutHeading: "私について",
        aboutText: "私は安全でスケーラブルなサーバーサイドアプリケーションの構築が得意なバックエンド開発者兼Web3愛好家です。私の技術への旅は、従来のWebアプリケーションの作成から分散プラットフォームの探求まで及びます。現在、私は取引の世界に飛び込み、市場をナビゲートする戦略を常に学んでいます。",
        educationHeading: "学歴",
        projectsHeading: "プロジェクト",
        contactHeading: "お問い合わせ",
        nameLabel: "名前",
        emailLabel: "メール",
        messageLabel: "メッセージ",
        sendButton: "送信",
        footerText: "© 2025 De Vela. HTML、CSS、JSで構築。",
        translate: "翻訳",
        classroomTitle: "教室予約",
        classroomDesc: "効率的に部屋を管理・予約するための教室予約システム。最新のWeb技術で構築。",
        scraperTitle: "Webスクレイパー＆AIチャットボット",
        scraperDesc: "Webスクレイピング機能とAI駆動チャットボットを組み合わせたWebアプリケーションで、インテリジェントなデータ抽出と対話を実現。",
        viewProject: "プロジェクトを見る"
      },
      fr: {
        title: "Mon Portfolio",
        heroTitle: "Salut, C'est moi Dev Vela",
        heroSubtitle: "Développeur Backend Aspirant & Joueur Web3",
        heroDesc: "Je construis des solutions backend efficaces, explore les jeux Web3 et adore apprendre de nouvelles technologies et stratégies de trading.",
        viewWork: "Voir Mon Travail",
        aboutHeading: "À Propos de Moi",
        aboutText: "Je suis un développeur backend et passionné de Web3 avec un talent pour construire des applications côté serveur sécurisées et évolutives. Mon parcours dans la technologie s'étend de la création d'applications web traditionnelles à l'exploration de plateformes décentralisées. Actuellement, je plonge dans le monde du trading, apprenant constamment des stratégies pour naviguer les marchés.",
        educationHeading: "Éducation",
        projectsHeading: "Projets",
        contactHeading: "Contact",
        nameLabel: "Nom",
        emailLabel: "Email",
        messageLabel: "Message",
        sendButton: "Envoyer",
        footerText: "© 2025 De Vela. Construit avec HTML, CSS et JS.",
        translate: "Traduire",
        classroomTitle: "Réservation de Salle",
        classroomDesc: "Un système de réservation de salles pour gérer et réserver des salles efficacement. Construit avec des technologies web modernes.",
        scraperTitle: "Web Scraper & Chatbot IA",
        scraperDesc: "Une application web qui combine les capacités de web scraping avec un chatbot alimenté par l'IA pour l'extraction et l'interaction intelligentes de données.",
        viewProject: "Voir le Projet"
      },
      de: {
        title: "Mein Portfolio",
        heroTitle: "Hallo, Ich bin Dev Vela",
        heroSubtitle: "Angehender Backend-Entwickler & Web3-Gamer",
        heroDesc: "Ich erstelle effiziente Backend-Lösungen, erkunde Web3-Gaming und lerne gerne neue Technologien und Trading-Strategien.",
        viewWork: "Meine Arbeit Ansehen",
        aboutHeading: "Über Mich",
        aboutText: "Ich bin ein Backend-Entwickler und Web3-Enthusiast mit einem Talent für das Erstellen sicherer und skalierbarer serverseitiger Anwendungen. Meine Reise in der Technologie reicht von der Erstellung traditioneller Webanwendungen bis zur Erkundung dezentraler Plattformen. Derzeit tauche ich in die Welt des Tradings ein und lerne ständig Strategien zur Navigation der Märkte.",
        educationHeading: "Bildung",
        projectsHeading: "Projekte",
        contactHeading: "Kontakt",
        nameLabel: "Name",
        emailLabel: "E-Mail",
        messageLabel: "Nachricht",
        sendButton: "Senden",
        footerText: "© 2025 De Vela. Erstellt mit HTML, CSS & JS.",
        translate: "Übersetzen",
        classroomTitle: "Klassenzimmer-Reservierung",
        classroomDesc: "Ein Klassenzimmer-Reservierungssystem zur effizienten Verwaltung und Buchung von Räumen. Mit modernen Web-Technologien erstellt.",
        scraperTitle: "Web Scraper & KI Chatbot",
        scraperDesc: "Eine Webanwendung, die Web-Scraping-Funktionen mit einem KI-gesteuerten Chatbot für intelligente Datenextraktion und -interaktion kombiniert.",
        viewProject: "Projekt Ansehen"
      }
    };

    // Current language state
    let currentLang = 'en';    // Handle translation option selection
    translateOptions.forEach(option => {
      option.addEventListener('click', async () => {
        const lang = option.getAttribute('data-lang');
        const langText = option.textContent;
        
        console.log('Translation clicked:', lang, langText); // Debug log
        
        // Update button text to show selected language
        const translateText = translateButton.querySelector('.translate__text');
        if (lang === 'en') {
          translateText.textContent = 'Translate';
        } else {
          // Extract just the language name (after the flag emoji)
          const languageName = langText.split(' ')[1];
          translateText.textContent = languageName;
        }
        
        // Perform translation
        await translateToLanguage(lang);
        
        // Close dropdown
        translateButton.setAttribute('aria-expanded', 'false');
        translateDropdown.classList.remove('active');
      });
    });    // Translation function using API or fallback to local translations
    async function translateToLanguage(targetLang) {
      console.log('translateToLanguage called with:', targetLang); // Debug log
      
      if (targetLang === 'en') {
        // Restore original English content
        restoreOriginalContent();
        currentLang = 'en';
        return;
      }

      // Show loading state
      showTranslationLoading(true);
      
      try {
        // Try API translation first
        await translateWithAPI(targetLang);
        currentLang = targetLang;
      } catch (error) {
        console.error('API translation failed, falling back to local translations:', error);
        
        // Fallback to local translations
        if (translations[targetLang]) {
          translateWithLocal(targetLang);
          currentLang = targetLang;
        } else {
          console.error('No translation available for:', targetLang);
          alert(`Translation not available for ${targetLang}. Using English.`);
          restoreOriginalContent();
          currentLang = 'en';
        }
      } finally {
        showTranslationLoading(false);
      }
    }    // API-based translation function - Handles unlimited projects automatically
    async function translateWithAPI(targetLang) {
      const elementsToTranslate = [
        { selector: '.hero__title', key: 'heroTitle', isHTML: true },
        { selector: '.hero__subtitle', key: 'heroSubtitle' },
        { selector: '.hero__desc', key: 'heroDesc' },
        { selector: '.hero__cta', key: 'viewWork' },
        { selector: '.about__heading', key: 'aboutHeading' },
        { selector: '.about__text p', key: 'aboutText' },
        { selector: '.education__heading', key: 'educationHeading' },
        { selector: '.projects__heading', key: 'projectsHeading' },
        { selector: '.contact__heading', key: 'contactHeading' },
        { selector: 'label[for="name"]', key: 'nameLabel' },
        { selector: 'label[for="email"]', key: 'emailLabel' },
        { selector: 'label[for="message"]', key: 'messageLabel' },
        { selector: '.contact__submit', key: 'sendButton' },
        { selector: '.footer__text', key: 'footerText' }
      ];

      // Collect all texts to translate
      const textsToTranslate = [];
      const validElements = [];

      elementsToTranslate.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
          let text;
          if (item.isHTML) {
            // For HTML content, extract text only
            text = element.textContent || element.innerText;
          } else {
            text = element.textContent || element.innerText;
          }
          
          if (text && originalContent[item.key]) {
            textsToTranslate.push(originalContent[item.key]);
            validElements.push({ element, item, originalText: originalContent[item.key] });
          }
        }
      });

      // Auto-add ALL projects (no manual work needed!)
      const projectTitles = document.querySelectorAll('.project__title');
      const projectDescs = document.querySelectorAll('.project__desc');
      const projectLinks = document.querySelectorAll('.project__link');

      // Add project titles
      if (originalContent.projectTitles) {
        originalContent.projectTitles.forEach((title, index) => {
          if (projectTitles[index]) {
            textsToTranslate.push(title);
            validElements.push({ 
              element: projectTitles[index], 
              item: { key: `projectTitle${index}` },
              originalText: title
            });
          }
        });
      }

      // Add project descriptions
      if (originalContent.projectDescs) {
        originalContent.projectDescs.forEach((desc, index) => {
          if (projectDescs[index]) {
            textsToTranslate.push(desc);
            validElements.push({ 
              element: projectDescs[index], 
              item: { key: `projectDesc${index}`, isProject: true },
              originalText: desc
            });
          }
        });
      }

      // Add project links
      if (originalContent.projectLinks) {
        originalContent.projectLinks.forEach((linkText, index) => {
          if (projectLinks[index]) {
            textsToTranslate.push(linkText);
            validElements.push({ 
              element: projectLinks[index], 
              item: { key: `projectLink${index}` },
              originalText: linkText
            });
          }
        });
      }

      // Auto-add education content
      if (originalContent.educationItems) {
        const educationElements = document.querySelectorAll('.education__item');
        originalContent.educationItems.forEach((eduItem, index) => {
          const eduElement = educationElements[index];
          if (eduElement && eduItem.degree) {
            textsToTranslate.push(eduItem.degree);
            validElements.push({
              element: eduElement.querySelector('.education__degree'),
              item: { key: `educationDegree${index}` },
              originalText: eduItem.degree
            });
          }
          if (eduElement && eduItem.school) {
            textsToTranslate.push(eduItem.school);
            validElements.push({
              element: eduElement.querySelector('.education__school'),
              item: { key: `educationSchool${index}` },
              originalText: eduItem.school
            });
          }
        });
      }

      console.log(`🚀 Auto-detected ${textsToTranslate.length} items to translate`);

      // Translate all texts using the translation service
      const translatedTexts = await translationService.translateBatch(
        textsToTranslate, 
        targetLang === 'zh-CN' ? 'zh' : targetLang
      );

      // Apply translations to elements
      validElements.forEach((item, index) => {
        const translatedText = translatedTexts[index];
        
        if (item.item.isHTML) {
          // For hero title, preserve the span structure
          if (item.item.key === 'heroTitle') {
            item.element.innerHTML = translatedText.replace('Dev Vela', '<span class="hero__name">Dev Vela</span>');
          } else {
            item.element.innerHTML = translatedText;
          }
        } else if (item.item.isProject) {
          // For project descriptions, preserve GitHub links
          const githubLink = item.element.querySelector('a');
          if (githubLink) {
            item.element.innerHTML = `${translatedText}<br><strong>GitHub:</strong> ${githubLink.outerHTML}`;
          } else {
            item.element.textContent = translatedText;
          }
        } else {
          item.element.textContent = translatedText;
        }
      });

      // Update page title
      if (originalContent.title) {
        const translatedTitle = await translationService.translateText(originalContent.title, targetLang === 'zh-CN' ? 'zh' : targetLang);
        document.title = translatedTitle;
      }

      console.log(`✅ Page translated to: ${targetLang} using API (${translatedTexts.length} items)`);
    }

    // Local translation function (fallback)
    function translateWithLocal(targetLang) {
      if (!translations[targetLang]) {
        console.log('Translation not available for:', targetLang);
        return;
      }

      const t = translations[targetLang];
      
      console.log('Using local translation with data:', t); // Debug log

      // Update page title
      document.title = t.title;

      // Update hero section
      const heroTitle = document.querySelector('.hero__title');
      if (heroTitle) {
        heroTitle.innerHTML = t.heroTitle.replace('Dev Vela', '<span class="hero__name">Dev Vela</span>');
      }

      const heroSubtitle = document.querySelector('.hero__subtitle');
      if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;

      const heroDesc = document.querySelector('.hero__desc');
      if (heroDesc) heroDesc.textContent = t.heroDesc;

      const heroCta = document.querySelector('.hero__cta');
      if (heroCta) heroCta.textContent = t.viewWork;

      // Update about section
      const aboutHeading = document.querySelector('.about__heading');
      if (aboutHeading) aboutHeading.textContent = t.aboutHeading;

      const aboutText = document.querySelector('.about__text p');
      if (aboutText) aboutText.textContent = t.aboutText;

      // Update education section
      const educationHeading = document.querySelector('.education__heading');
      if (educationHeading) educationHeading.textContent = t.educationHeading;

      // Update projects section
      const projectsHeading = document.querySelector('.projects__heading');
      if (projectsHeading) projectsHeading.textContent = t.projectsHeading;

      // Update project titles and descriptions
      const projectTitles = document.querySelectorAll('.project__title');
      const projectDescs = document.querySelectorAll('.project__desc');
      const projectLinks = document.querySelectorAll('.project__link');

      if (projectTitles[0]) projectTitles[0].textContent = t.classroomTitle;
      if (projectDescs[0]) {
        const githubLink = projectDescs[0].querySelector('a');
        if (githubLink) {
          projectDescs[0].innerHTML = `${t.classroomDesc} <br><strong>GitHub:</strong> ${githubLink.outerHTML}`;
        }
      }

      if (projectTitles[1]) projectTitles[1].textContent = t.scraperTitle;
      if (projectDescs[1]) {
        const githubLink = projectDescs[1].querySelector('a');
        if (githubLink) {
          projectDescs[1].innerHTML = `${t.scraperDesc}<br><strong>GitHub:</strong> ${githubLink.outerHTML}`;
        }
      }

      projectLinks.forEach(link => {
        if (link) link.textContent = t.viewProject;
      });

      // Update contact section
      const contactHeading = document.querySelector('.contact__heading');
      if (contactHeading) contactHeading.textContent = t.contactHeading;

      const nameLabel = document.querySelector('label[for="name"]');
      if (nameLabel) nameLabel.textContent = t.nameLabel;

      const emailLabel = document.querySelector('label[for="email"]');
      if (emailLabel) emailLabel.textContent = t.emailLabel;

      const messageLabel = document.querySelector('label[for="message"]');
      if (messageLabel) messageLabel.textContent = t.messageLabel;

      const sendButton = document.querySelector('.contact__submit');
      if (sendButton) sendButton.textContent = t.sendButton;

      // Update footer
      const footerText = document.querySelector('.footer__text');
      if (footerText) footerText.textContent = t.footerText;

      console.log(`Page translated to: ${targetLang} using local translations`);
    }    // Restore original English content - Handles unlimited projects automatically
    function restoreOriginalContent() {
      // Restore page title
      if (originalContent.title) {
        document.title = originalContent.title;
      }

      // Restore hero section
      const heroTitle = document.querySelector('.hero__title');
      if (heroTitle && originalContent.heroTitle) {
        heroTitle.innerHTML = originalContent.heroTitle;
      }

      const heroSubtitle = document.querySelector('.hero__subtitle');
      if (heroSubtitle && originalContent.heroSubtitle) {
        heroSubtitle.textContent = originalContent.heroSubtitle;
      }

      const heroDesc = document.querySelector('.hero__desc');
      if (heroDesc && originalContent.heroDesc) {
        heroDesc.textContent = originalContent.heroDesc;
      }

      const heroCta = document.querySelector('.hero__cta');
      if (heroCta && originalContent.viewWork) {
        heroCta.textContent = originalContent.viewWork;
      }

      // Restore about section
      const aboutHeading = document.querySelector('.about__heading');
      if (aboutHeading && originalContent.aboutHeading) {
        aboutHeading.textContent = originalContent.aboutHeading;
      }

      const aboutText = document.querySelector('.about__text p');
      if (aboutText && originalContent.aboutText) {
        aboutText.textContent = originalContent.aboutText;
      }

      // Restore other sections
      const educationHeading = document.querySelector('.education__heading');
      if (educationHeading && originalContent.educationHeading) {
        educationHeading.textContent = originalContent.educationHeading;
      }

      const projectsHeading = document.querySelector('.projects__heading');
      if (projectsHeading && originalContent.projectsHeading) {
        projectsHeading.textContent = originalContent.projectsHeading;
      }

      const contactHeading = document.querySelector('.contact__heading');
      if (contactHeading && originalContent.contactHeading) {
        contactHeading.textContent = originalContent.contactHeading;
      }

      // Restore form labels
      const nameLabel = document.querySelector('label[for="name"]');
      if (nameLabel && originalContent.nameLabel) {
        nameLabel.textContent = originalContent.nameLabel;
      }

      const emailLabel = document.querySelector('label[for="email"]');
      if (emailLabel && originalContent.emailLabel) {
        emailLabel.textContent = originalContent.emailLabel;
      }

      const messageLabel = document.querySelector('label[for="message"]');
      if (messageLabel && originalContent.messageLabel) {
        messageLabel.textContent = originalContent.messageLabel;
      }

      const sendButton = document.querySelector('.contact__submit');
      if (sendButton && originalContent.sendButton) {
        sendButton.textContent = originalContent.sendButton;
      }

      // Restore footer
      const footerText = document.querySelector('.footer__text');
      if (footerText && originalContent.footerText) {
        footerText.textContent = originalContent.footerText;
      }

      // Auto-restore ALL projects (no manual work needed!)
      const projectTitles = document.querySelectorAll('.project__title');
      const projectDescs = document.querySelectorAll('.project__desc');
      const projectLinks = document.querySelectorAll('.project__link');

      if (originalContent.projectTitles) {
        originalContent.projectTitles.forEach((title, index) => {
          if (projectTitles[index]) {
            projectTitles[index].textContent = title;
          }
        });
      }

      if (originalContent.projectDescs) {
        originalContent.projectDescs.forEach((desc, index) => {
          if (projectDescs[index]) {
            const githubLink = projectDescs[index].querySelector('a');
            if (githubLink) {
              projectDescs[index].innerHTML = `${desc}<br><strong>GitHub:</strong> ${githubLink.outerHTML}`;
            } else {
              projectDescs[index].textContent = desc;
            }
          }
        });
      }

      if (originalContent.projectLinks) {
        originalContent.projectLinks.forEach((linkText, index) => {
          if (projectLinks[index]) {
            projectLinks[index].textContent = linkText;
          }
        });
      }

      // Auto-restore education content
      if (originalContent.educationItems) {
        const educationElements = document.querySelectorAll('.education__item');
        originalContent.educationItems.forEach((eduItem, index) => {
          const eduElement = educationElements[index];
          if (eduElement) {
            const degreeEl = eduElement.querySelector('.education__degree');
            const schoolEl = eduElement.querySelector('.education__school');
            
            if (degreeEl && eduItem.degree) {
              degreeEl.textContent = eduItem.degree;
            }
            if (schoolEl && eduItem.school) {
              schoolEl.textContent = eduItem.school;
            }
          }
        });
      }

      console.log('✅ Original English content restored for all projects');
    }

    // Show/hide translation loading state
    function showTranslationLoading(isLoading) {
      const translateText = translateButton.querySelector('.translate__text');
      if (isLoading) {
        translateText.textContent = 'Translating...';
        translateButton.style.opacity = '0.7';
        translateButton.disabled = true;
      } else {
        translateButton.style.opacity = '1';
        translateButton.disabled = false;
      }
    }
  }

  // Add CSS fallback for translation dropdown
  const style = document.createElement('style');
  style.textContent = `
    .translate__dropdown.active {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0) !important;
      display: block !important;
      z-index: 9999 !important;
    }
    .translate__dropdown {
      position: absolute !important;
      top: calc(100% + 0.5rem) !important;
      right: 0 !important;
      background: rgba(10,25,47,0.95) !important;
      border: 1px solid rgba(100,255,218,0.2) !important;
      border-radius: 12px !important;
      padding: 0.5rem !important;
      min-width: 160px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3) !important;
    }
    .translate__option {
      display: block !important;
      width: 100% !important;
      background: none !important;
      border: none !important;
      color: #8892b0 !important;
      padding: 0.75rem 1rem !important;
      text-align: left !important;
      cursor: pointer !important;
      border-radius: 8px !important;
      font-size: 0.9rem !important;
    }
    .translate__option:hover {
      background: rgba(100,255,218,0.1) !important;
      color: #64ffda !important;
    }
  `;
  document.head.appendChild(style);

  // Debug information for translation
  console.log('Translation system initialized');
  console.log('Available translations:', Object.keys(translations));
  console.log('Translation service:', translationService);
  console.log('Original content stored:', Object.keys(originalContent));

  // Scroll-triggered reveal animations
  const revealElements = document.querySelectorAll('.hero, .about, .education, .project, .contact');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      } else {
        entry.target.classList.remove('reveal-visible');
      }
    });
  }, { threshold: 0.15 });
  
  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
