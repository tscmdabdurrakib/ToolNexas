import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
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

// Initialize i18next
i18n
  .use(Backend) // Loads translations from backend
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n to react-i18next
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Backend configuration
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    // Detection options
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
      caches: ['localStorage', 'cookie'],
      cookieMinutes: 525600, // 1 year in minutes
    },
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
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