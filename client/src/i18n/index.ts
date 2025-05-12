import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import axios from 'axios';

// Country to language mapping
const countryToLanguage: Record<string, string> = {
  'US': 'en',
  'GB': 'en',
  'CA': 'en',
  'AU': 'en',
  'IN': 'hi',
  'BD': 'bn'
};

// Hard-coded translations for initial loading
const resources = {
  en: {
    translation: {
      common: {
        title: "Tools Website",
        language: "Language",
        home: "Home",
        about: "About Us",
        contact: "Contact",
        categories: "Categories",
        tools: "Tools"
      },
      header: {
        searchPlaceholder: "Search for tools..."
      },
      home: {
        featuredTools: "Featured Tools",
        popularCategories: "Popular Categories" 
      },
      languages: {
        en: "English",
        bn: "Bengali",
        hi: "Hindi"
      }
    }
  },
  bn: {
    translation: {
      common: {
        title: "টুলস ওয়েবসাইট",
        language: "ভাষা",
        home: "হোম",
        about: "আমাদের সম্পর্কে",
        contact: "যোগাযোগ",
        categories: "বিভাগসমূহ",
        tools: "টুলস"
      },
      header: {
        searchPlaceholder: "টুলস খুঁজুন..."
      },
      home: {
        featuredTools: "বৈশিষ্ট্যযুক্ত টুলস",
        popularCategories: "জনপ্রিয় বিভাগসমূহ"
      },
      languages: {
        en: "English",
        bn: "বাংলা",
        hi: "हिंदी"
      }
    }
  },
  hi: {
    translation: {
      common: {
        title: "टूल्स वेबसाइट",
        language: "भाषा",
        home: "होम",
        about: "हमारे बारे में",
        contact: "संपर्क करें",
        categories: "श्रेणियां",
        tools: "टूल्स"
      },
      header: {
        searchPlaceholder: "टूल्स खोजें..."
      },
      home: {
        featuredTools: "विशेष टूल्स",
        popularCategories: "लोकप्रिय श्रेणियां"
      },
      languages: {
        en: "English",
        bn: "বাংলা",
        hi: "हिंदी"
      }
    }
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Detection options
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
      caches: ['localStorage', 'cookie']
    },
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // React specific options
    react: {
      useSuspense: false
    }
  });

// Function to attempt to detect country from IP and set language
export const detectCountryAndSetLanguage = async () => {
  try {
    // Only try to detect if user hasn't explicitly set a language preference
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang && storedLang.length > 1 && storedLang !== 'en') {
      // User already has a language preference, respect it
      return;
    }
    
    // Get country from IP
    const response = await axios.get('https://ipapi.co/json/');
    const countryCode = response.data.country_code;
    
    if (countryCode && countryToLanguage[countryCode]) {
      // Set language based on country
      i18n.changeLanguage(countryToLanguage[countryCode]);
    }
  } catch (error) {
    console.error('Failed to detect country:', error);
    // Fallback to browser language if IP detection fails
  }
};

// Function to change language
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  // Save to localStorage
  localStorage.setItem('i18nextLng', language);
  // Save to cookie for server-side rendering (if used)
  document.cookie = `i18next=${language}; path=/; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toUTCString()}`;
};

// List of supported languages
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
];

export default i18n;