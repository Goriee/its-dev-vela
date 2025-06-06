// Translation Service Class
// Handles API calls, caching, and text translation

class TranslationService {
  constructor() {
    this.cache = new Map();
    this.isTranslating = false;
    this.currentLanguage = 'en';
    
    // Initialize cache from localStorage
    this.loadCache();
  }

  // Main translation method
  async translateText(text, targetLang, sourceLang = 'en') {
    if (targetLang === sourceLang) return text;
    
    const cacheKey = `${sourceLang}-${targetLang}-${text}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Using MyMemory API (free alternative to Google Translate)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
      );
      
      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        const translatedText = data.responseData.translatedText;
        
        // Cache the result
        this.cache.set(cacheKey, translatedText);
        this.saveCache();
        
        return translatedText;
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  }

  // Translate multiple texts in batch
  async translateBatch(texts, targetLang, sourceLang = 'en') {
    const promises = texts.map(text => this.translateText(text, targetLang, sourceLang));
    return Promise.all(promises);
  }

  // Load cache from localStorage
  loadCache() {
    try {
      const cached = localStorage.getItem('translation_cache');
      if (cached) {
        const data = JSON.parse(cached);
        // Check if cache is not expired (24 hours)
        if (Date.now() - data.timestamp < CONFIG.CACHE_DURATION) {
          this.cache = new Map(data.translations);
        }
      }
    } catch (error) {
      console.error('Error loading translation cache:', error);
    }
  }

  // Save cache to localStorage
  saveCache() {
    try {
      const data = {
        timestamp: Date.now(),
        translations: Array.from(this.cache.entries())
      };
      localStorage.setItem('translation_cache', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving translation cache:', error);
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    localStorage.removeItem('translation_cache');
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Set current language
  setCurrentLanguage(lang) {
    this.currentLanguage = lang;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TranslationService;
} else if (typeof window !== 'undefined') {
  window.TranslationService = TranslationService;
}
