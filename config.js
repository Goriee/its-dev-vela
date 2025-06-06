// Configuration for translation API
// This file will be used for development only
// For production, we'll use environment variables or a serverless function

const CONFIG = {
  // Google Translate API endpoint (we'll use a proxy to avoid CORS)
  TRANSLATE_API_URL: 'https://api.mymemory.translated.net/get',
  
  // Supported languages
  SUPPORTED_LANGUAGES: {
    'en': 'English',
    'es': 'Spanish', 
    'zh': 'Chinese',
    'ja': 'Japanese',
    'fr': 'French',
    'de': 'German'
  },
  
  // Cache translations to reduce API calls
  CACHE_ENABLED: true,
  CACHE_DURATION: 24 * 60 * 60 * 1000 // 24 hours
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
