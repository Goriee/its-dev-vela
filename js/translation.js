// translation.js - Multi-language Translation System
// Handles UI translation with API fallback and local translations

class TranslationManager {
  constructor() {
    this.translateButton = document.getElementById('translateButton');
    this.translateDropdown = document.getElementById('translateDropdown');
    this.translateOptions = document.querySelectorAll('.translate__option');
    this.currentLang = 'en';
    this.originalContent = null;
    
    this.translations = {      en: {
        title: "My Portfolio",
        heroTitle: "Hi, It's me Dev Vela",
        heroSubtitle: "Aspiring Backend Developer & Web3 Gamer",
        heroDesc: "I build efficient backend solutions, explore Web3 gaming, and love learning new tech and trading strategies.",
        viewWork: "View My Work",
        home: "Home", about: "About", projects: "Projects", contact: "Contact", education: "Education",
        aboutHeading: "About Me",
        aboutText: "I am a backend developer and Web3 enthusiast with a knack for building secure and scalable server-side applications. My journey in tech spans from creating traditional web applications to exploring decentralized platforms. Currently, I am diving into the world of trading, constantly learning strategies to navigate the markets.",
        educationHeading: "Education", projectsHeading: "Projects", contactHeading: "Contact",
        nameLabel: "Name", emailLabel: "Email", messageLabel: "Message", sendButton: "Send",
        footerText: "© 2025 De Vela. Built with HTML, CSS & JS.", translate: "Translate",
        classroomTitle: "Classroom Reserve",
        classroomDesc: "A classroom reservation system for managing and booking rooms efficiently. Built with modern web technologies.",
        scraperTitle: "Web Scraper & AI Chatbot",
        scraperDesc: "A web application that combines web scraping capabilities with an AI-powered chatbot for intelligent data extraction and interaction.",
        viewProject: "View Project",
        // Education content
        educationItems: [
          {
            degree: "Bachelor of Science in Computer Science",
            school: "Naga College Foundation"
          },
          {
            degree: "Senior High School (TVL & ICT)",
            school: "Camarines Sur National High School"
          },
          {
            degree: "High School (Basic Education Program)",
            school: "Camarines Sur National High School"
          },
          {
            degree: "Elementary School",
            school: "Caluag Elementary School"
          }
        ]
      },      es: {
        title: "Mi Portafolio", heroTitle: "Hola, Soy Dev Vela",
        heroSubtitle: "Aspirante a Desarrollador Backend y Gamer Web3",
        heroDesc: "Construyo soluciones backend eficientes, exploro juegos Web3 y me encanta aprender nuevas tecnologías y estrategias de trading.",
        viewWork: "Ver Mi Trabajo", home: "Inicio", about: "Acerca de", projects: "Proyectos", contact: "Contacto", education: "Educación",
        aboutHeading: "Acerca de Mí",
        aboutText: "Soy un desarrollador backend y entusiasta de Web3 con talento para construir aplicaciones del lado del servidor seguras y escalables...",
        educationHeading: "Educación", projectsHeading: "Proyectos", contactHeading: "Contacto",
        nameLabel: "Nombre", emailLabel: "Correo Electrónico", messageLabel: "Mensaje", sendButton: "Enviar",
        footerText: "© 2025 De Vela. Construido con HTML, CSS y JS.", translate: "Traducir",
        classroomTitle: "Reserva de Aula", scraperTitle: "Web Scraper y Chatbot IA",
        classroomDesc: "Un sistema de reserva de aulas para gestionar y reservar salas de manera eficiente.",
        scraperDesc: "Una aplicación web que combina capacidades de web scraping con un chatbot impulsado por IA.",
        viewProject: "Ver Proyecto",
        // Education content
        educationItems: [
          {
            degree: "Licenciatura en Ciencias de la Computación",
            school: "Naga College Foundation"
          },
          {
            degree: "Educación Secundaria Superior (TVL y TIC)",
            school: "Camarines Sur National High School"
          },
          {
            degree: "Educación Secundaria (Programa de Educación Básica)",
            school: "Camarines Sur National High School"
          },
          {
            degree: "Escuela Primaria",
            school: "Caluag Elementary School"
          }
        ]
      },      'zh-CN': {
        title: "我的作品集", heroTitle: "你好，我是 Dev Vela", heroSubtitle: "有抱负的后端开发者和Web3游戏玩家",
        heroDesc: "我构建高效的后端解决方案，探索Web3游戏，喜欢学习新技术和交易策略。",
        viewWork: "查看我的作品", home: "首页", about: "关于", projects: "项目", contact: "联系", education: "教育",
        aboutHeading: "关于我", educationHeading: "教育背景", projectsHeading: "项目", contactHeading: "联系我",
        aboutText: "我是一名后端开发者和Web3爱好者，擅长构建安全且可扩展的服务器端应用程序...",
        nameLabel: "姓名", emailLabel: "邮箱", messageLabel: "消息", sendButton: "发送",
        footerText: "© 2025 De Vela. 使用HTML、CSS和JS构建。", translate: "翻译",
        classroomTitle: "教室预约", scraperTitle: "网络爬虫和AI聊天机器人",
        classroomDesc: "一个高效管理和预订房间的教室预约系统。", scraperDesc: "一个结合网络爬虫功能和AI驱动聊天机器人的网络应用程序。",
        viewProject: "查看项目",
        // Education content
        educationItems: [
          {
            degree: "计算机科学学士学位",
            school: "Naga College Foundation"
          },
          {
            degree: "高中（技术职业与信息通信技术）",
            school: "Camarines Sur National High School"
          },
          {
            degree: "初中（基础教育课程）",
            school: "Camarines Sur National High School"
          },
          {
            degree: "小学教育",
            school: "Caluag Elementary School"
          }
        ]
      },      ja: {
        title: "私のポートフォリオ", heroTitle: "こんにちは、Dev Velaです", heroSubtitle: "バックエンド開発者志望＆Web3ゲーマー",
        heroDesc: "効率的なバックエンドソリューションを構築し、Web3ゲームを探求し、新しい技術と取引戦略を学ぶことが大好きです。",
        viewWork: "私の作品を見る", home: "ホーム", about: "について", projects: "プロジェクト", contact: "お問い合わせ", education: "学歴",
        aboutHeading: "私について", educationHeading: "学歴", projectsHeading: "プロジェクト", contactHeading: "お問い合わせ",
        aboutText: "私は安全でスケーラブルなサーバーサイドアプリケーションの構築が得意なバックエンド開発者兼Web3愛好家です...",
        nameLabel: "名前", emailLabel: "メール", messageLabel: "メッセージ", sendButton: "送信",
        footerText: "© 2025 De Vela. HTML、CSS、JSで構築。", translate: "翻訳",
        classroomTitle: "教室予約", scraperTitle: "Webスクレイパー＆AIチャットボット",
        classroomDesc: "効率的に部屋を管理・予約するための教室予約システム。", scraperDesc: "Webスクレイピング機能とAI駆動チャットボットを組み合わせたWebアプリケーション。",
        viewProject: "プロジェクトを見る",
        // Education content
        educationItems: [
          {
            degree: "コンピュータサイエンス学士",
            school: "Naga College Foundation"
          },
          {
            degree: "高等学校（技術職業＆ICT）",
            school: "Camarines Sur National High School"
          },
          {
            degree: "高等学校（基礎教育プログラム）",
            school: "Camarines Sur National High School"
          },
          {
            degree: "小学校",
            school: "Caluag Elementary School"
          }
        ]
      },      fr: {
        title: "Mon Portfolio", heroTitle: "Salut, C'est moi Dev Vela", heroSubtitle: "Développeur Backend Aspirant & Joueur Web3",
        heroDesc: "Je construis des solutions backend efficaces, explore les jeux Web3 et adore apprendre de nouvelles technologies et stratégies de trading.",
        viewWork: "Voir Mon Travail", home: "Accueil", about: "À propos", projects: "Projets", contact: "Contact", education: "Éducation",
        aboutHeading: "À Propos de Moi", educationHeading: "Éducation", projectsHeading: "Projets", contactHeading: "Contact",
        aboutText: "Je suis un développeur backend et passionné de Web3 avec un talent pour construire des applications côté serveur sécurisées et évolutives...",
        nameLabel: "Nom", emailLabel: "Email", messageLabel: "Message", sendButton: "Envoyer",
        footerText: "© 2025 De Vela. Construit avec HTML, CSS et JS.", translate: "Traduire",
        classroomTitle: "Réservation de Salle", scraperTitle: "Web Scraper & Chatbot IA",
        classroomDesc: "Un système de réservation de salles pour gérer et réserver des salles efficacement.",
        scraperDesc: "Une application web qui combine les capacités de web scraping avec un chatbot alimenté par l'IA.",
        viewProject: "Voir le Projet",
        // Education content
        educationItems: [
          {
            degree: "Licence en Sciences Informatiques",
            school: "Naga College Foundation"
          },
          {
            degree: "Lycée Supérieur (TVL et TIC)",
            school: "Camarines Sur National High School"
          },
          {
            degree: "Lycée (Programme d'Éducation de Base)",
            school: "Camarines Sur National High School"
          },
          {
            degree: "École Primaire",
            school: "Caluag Elementary School"
          }
        ]
      },      de: {
        title: "Mein Portfolio", heroTitle: "Hallo, Ich bin Dev Vela", heroSubtitle: "Angehender Backend-Entwickler & Web3-Gamer",
        heroDesc: "Ich erstelle effiziente Backend-Lösungen, erkunde Web3-Gaming und lerne gerne neue Technologien und Trading-Strategien.",
        viewWork: "Meine Arbeit Ansehen", home: "Startseite", about: "Über mich", projects: "Projekte", contact: "Kontakt", education: "Bildung",
        aboutHeading: "Über Mich", educationHeading: "Bildung", projectsHeading: "Projekte", contactHeading: "Kontakt",
        aboutText: "Ich bin ein Backend-Entwickler und Web3-Enthusiast mit einem Talent für das Erstellen sicherer und skalierbarer serverseitiger Anwendungen...",
        nameLabel: "Name", emailLabel: "E-Mail", messageLabel: "Nachricht", sendButton: "Senden",
        footerText: "© 2025 De Vela. Erstellt mit HTML, CSS & JS.", translate: "Übersetzen",
        classroomTitle: "Klassenzimmer-Reservierung", scraperTitle: "Web Scraper & KI Chatbot",
        classroomDesc: "Ein Klassenzimmer-Reservierungssystem zur effizienten Verwaltung und Buchung von Räumen.",
        scraperDesc: "Eine Webanwendung, die Web-Scraping-Funktionen mit einem KI-gesteuerten Chatbot kombiniert.",
        viewProject: "Projekt Ansehen",
        // Education content
        educationItems: [
          {
            degree: "Bachelor of Science in Informatik",
            school: "Naga College Foundation"
          },
          {
            degree: "Oberschule (TVL & IKT)",
            school: "Camarines Sur National High School"
          },
          {
            degree: "Gymnasium (Grundbildungsprogramm)",
            school: "Camarines Sur National High School"
          },
          {
            degree: "Grundschule",
            school: "Caluag Elementary School"
          }
        ]
      }
    };
    
    this.init();
  }  init() {
    console.log('🌍 Initializing Translation Manager...');
    this.captureOriginalContent();
    this.setupTranslationUI();
    this.addTranslationStyles();
    console.log('✅ Translation Manager initialized');
  }

  captureOriginalContent() {
    this.originalContent = {
      title: document.title,
      heroTitle: document.querySelector('.hero__title')?.innerHTML,
      heroSubtitle: document.querySelector('.hero__subtitle')?.textContent,
      heroDesc: document.querySelector('.hero__desc')?.textContent,
      viewWork: document.querySelector('.hero__cta')?.textContent,
      navLinks: Array.from(document.querySelectorAll('.nav__link')).map(el => el.textContent),
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
      projectTitles: Array.from(document.querySelectorAll('.project__title')).map(el => el.textContent),
      projectDescs: Array.from(document.querySelectorAll('.project__desc')).map(el => {
        const clone = el.cloneNode(true);
        const githubLink = clone.querySelector('strong');
        if (githubLink) githubLink.remove();
        return clone.textContent.trim();
      }),
      projectLinks: Array.from(document.querySelectorAll('.project__link')).map(el => el.textContent),
      educationItems: Array.from(document.querySelectorAll('.education__item')).map(el => ({
        year: el.querySelector('.education__year')?.textContent,
        degree: el.querySelector('.education__degree')?.textContent,
        school: el.querySelector('.education__school')?.textContent
      }))
    };
  }  setupTranslationUI() {
    if (!this.translateButton || !this.translateDropdown) {
      console.error('❌ Translation elements not found!');
      return;
    }

    // Handle translate button click
    this.translateButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = this.translateButton.getAttribute('aria-expanded') === 'true';
      this.translateButton.setAttribute('aria-expanded', !isExpanded);
      this.translateDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.translateButton.contains(e.target) && !this.translateDropdown.contains(e.target)) {
        this.translateButton.setAttribute('aria-expanded', 'false');
        this.translateDropdown.classList.remove('active');
      }
    });

    // Handle translation option selection
    this.translateOptions.forEach(option => {
      option.addEventListener('click', async () => {
        const lang = option.getAttribute('data-lang');
        const langText = option.textContent;
        
        const translateText = this.translateButton.querySelector('.translate__text');
        if (lang === 'en') {
          translateText.textContent = 'Translate';
        } else {
          const languageName = langText.split(' ')[1];
          translateText.textContent = languageName;
        }
        
        await this.translateToLanguage(lang);
        
        this.translateButton.setAttribute('aria-expanded', 'false');
        this.translateDropdown.classList.remove('active');
      });
    });
  }

  async translateToLanguage(targetLang) {
    if (targetLang === 'en') {
      this.restoreOriginalContent();
      this.currentLang = 'en';
      return;
    }

    this.showTranslationLoading(true);
    
    try {
      if (this.translations[targetLang]) {
        this.translateWithLocal(targetLang);
        this.currentLang = targetLang;
      } else {
        console.error('No translation available for:', targetLang);
        alert(`Translation not available for ${targetLang}. Using English.`);
        this.restoreOriginalContent();
        this.currentLang = 'en';
      }
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      this.showTranslationLoading(false);
    }
  }

  translateWithLocal(targetLang) {
    const t = this.translations[targetLang];
    
    document.title = t.title;

    // Update navigation
    const navLinks = document.querySelectorAll('.nav__link');
    const navTranslations = [t.home, t.about, t.projects, t.contact, t.education];
    navLinks.forEach((link, index) => {
      if (navTranslations[index]) link.textContent = navTranslations[index];
    });

    // Update content sections
    this.updateElement('.hero__title', t.heroTitle.replace('Dev Vela', '<span class="hero__name">Dev Vela</span>'), true);
    this.updateElement('.hero__subtitle', t.heroSubtitle);
    this.updateElement('.hero__desc', t.heroDesc);
    this.updateElement('.hero__cta', t.viewWork);
    this.updateElement('.about__heading', t.aboutHeading);
    this.updateElement('.about__text p', t.aboutText);
    this.updateElement('.education__heading', t.educationHeading);
    this.updateElement('.projects__heading', t.projectsHeading);
    this.updateElement('.contact__heading', t.contactHeading);
    this.updateElement('label[for="name"]', t.nameLabel);
    this.updateElement('label[for="email"]', t.emailLabel);
    this.updateElement('label[for="message"]', t.messageLabel);
    this.updateElement('.contact__submit', t.sendButton);
    this.updateElement('.footer__text', t.footerText);    // Update projects
    this.updateProjectContent(t);
    
    // Update education items
    this.updateEducationContent(t);
  }

  updateProjectContent(t) {
    const projectTitles = document.querySelectorAll('.project__title');
    const projectDescs = document.querySelectorAll('.project__desc');
    const projectLinks = document.querySelectorAll('.project__link');

    if (projectTitles[0]) projectTitles[0].textContent = t.classroomTitle;
    if (projectTitles[1]) projectTitles[1].textContent = t.scraperTitle;

    if (projectDescs[0]) {
      const githubLink = projectDescs[0].querySelector('a');
      projectDescs[0].innerHTML = `${t.classroomDesc}${githubLink ? ' <br><strong>GitHub:</strong> ' + githubLink.outerHTML : ''}`;
    }

    if (projectDescs[1]) {
      const githubLink = projectDescs[1].querySelector('a');
      projectDescs[1].innerHTML = `${t.scraperDesc}${githubLink ? '<br><strong>GitHub:</strong> ' + githubLink.outerHTML : ''}`;
    }

    projectLinks.forEach(link => {
      if (link) link.textContent = t.viewProject;
    });
  }

  updateElement(selector, content, isHTML = false) {
    const element = document.querySelector(selector);
    if (element) {
      if (isHTML) {
        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    }
  }

  restoreOriginalContent() {
    if (!this.originalContent) return;

    document.title = this.originalContent.title;

    // Restore all elements
    this.updateElement('.hero__title', this.originalContent.heroTitle, true);
    this.updateElement('.hero__subtitle', this.originalContent.heroSubtitle);
    this.updateElement('.hero__desc', this.originalContent.heroDesc);
    this.updateElement('.hero__cta', this.originalContent.viewWork);
    
    // Restore navigation
    const navLinks = document.querySelectorAll('.nav__link');
    const originalNavLinks = this.originalContent.navLinks;
    navLinks.forEach((link, index) => {
      if (originalNavLinks[index]) link.textContent = originalNavLinks[index];
    });

    // Restore content sections
    this.updateElement('.about__heading', this.originalContent.aboutHeading);
    this.updateElement('.about__text p', this.originalContent.aboutText);
    this.updateElement('.education__heading', this.originalContent.educationHeading);
    this.updateElement('.projects__heading', this.originalContent.projectsHeading);
    this.updateElement('.contact__heading', this.originalContent.contactHeading);
    this.updateElement('label[for="name"]', this.originalContent.nameLabel);
    this.updateElement('label[for="email"]', this.originalContent.emailLabel);
    this.updateElement('label[for="message"]', this.originalContent.messageLabel);
    this.updateElement('.contact__submit', this.originalContent.sendButton);
    this.updateElement('.footer__text', this.originalContent.footerText);

    // Restore projects and education items
    this.updateProjectContent(this.originalContent);
    this.updateEducationContent(this.originalContent);
    
    console.log('✅ Original English content restored');
  }
  updateEducationContent(t) {
    const educationItems = document.querySelectorAll('.education__item');
    
    if (t.educationItems && educationItems.length > 0) {
      educationItems.forEach((item, index) => {
        if (t.educationItems[index]) {
          const yearElement = item.querySelector('.education__year');
          const degreeElement = item.querySelector('.education__degree');
          const schoolElement = item.querySelector('.education__school');
          
          if (yearElement && t.educationItems[index].year) {
            yearElement.textContent = t.educationItems[index].year;
          }
          
          if (degreeElement && t.educationItems[index].degree) {
            degreeElement.textContent = t.educationItems[index].degree;
          }
          
          if (schoolElement && t.educationItems[index].school) {
            schoolElement.textContent = t.educationItems[index].school;
          }
        }
      });
    }
  }

  showTranslationLoading(isLoading) {
    const translateText = this.translateButton.querySelector('.translate__text');
    if (isLoading) {
      translateText.textContent = 'Translating...';
      this.translateButton.style.opacity = '0.7';
      this.translateButton.disabled = true;
    } else {
      this.translateButton.style.opacity = '1';
      this.translateButton.disabled = false;
    }
  }

  addTranslationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .translate__dropdown.active {
        opacity: 1 !important; visibility: visible !important; transform: translateY(0) !important;
        display: block !important; z-index: 9999 !important;
      }
      .translate__dropdown {
        position: absolute !important; top: calc(100% + 0.5rem) !important; right: 0 !important;
        background: rgba(10,25,47,0.95) !important; border: 1px solid rgba(100,255,218,0.2) !important;
        border-radius: 12px !important; padding: 0.5rem !important; min-width: 160px !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3) !important;
      }
      .translate__option {
        display: block !important; width: 100% !important; background: none !important;
        border: none !important; color: #8892b0 !important; padding: 0.75rem 1rem !important;
        text-align: left !important; cursor: pointer !important; border-radius: 8px !important;
        font-size: 0.9rem !important;
      }
      .translate__option:hover {
        background: rgba(100,255,218,0.1) !important; color: #64ffda !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new TranslationManager());
} else {
  new TranslationManager();
}
