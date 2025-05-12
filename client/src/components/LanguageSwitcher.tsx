import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supportedLanguages, changeLanguage } from '@/i18n';

/**
 * LanguageSwitcher Component
 * 
 * A dropdown menu that allows users to switch between supported languages
 * Shows language names in both English and their native script
 */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  // Update current language when i18n.language changes
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);
  
  // Change language handler
  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setCurrentLang(langCode);
  };
  
  // Get current language display name
  const getCurrentLanguageDisplay = () => {
    const lang = supportedLanguages.find(lang => lang.code === currentLang) || 
                supportedLanguages.find(lang => lang.code === 'en'); // Default to English
    
    return lang?.nativeName || 'English';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0 md:h-9 md:w-auto md:px-3 md:text-sm">
          <Globe className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline-block">{getCurrentLanguageDisplay()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{t('common.language')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`cursor-pointer ${currentLang === language.code ? 'bg-accent font-medium' : ''}`}
            onClick={() => handleLanguageChange(language.code)}
          >
            <span className="flex items-center justify-between w-full">
              {language.nativeName}
              {currentLang === language.code && (
                <span className="ml-2 text-primary">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;