import React, { useState } from 'react';
import styles from './LanguageSwitcher.module.scss';

interface Language {
  code: 'bg' | 'en';
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'bg', name: 'БГ', flag: '🇧🇬' },
  { code: 'en', name: 'EN', flag: '🇺🇸' },
];

interface LanguageSwitcherProps {
  currentLanguage?: 'bg' | 'en';
  onLanguageChange?: (language: 'bg' | 'en') => void;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage = 'en',
  onLanguageChange,
  className = '',
}) => {
  const [selectedLang, setSelectedLang] = useState<'bg' | 'en'>(
    currentLanguage
  );

  const handleLanguageChange = (langCode: 'bg' | 'en') => {
    setSelectedLang(langCode);
    onLanguageChange?.(langCode);
  };

  return (
    <div className={`${styles.languageSwitcher} ${className}`}>
      <div
        className={`${styles.slider} ${selectedLang === 'bg' ? styles.sliderBg : styles.sliderEn}`}
      />
      {languages.map(lang => (
        <button
          key={lang.code}
          className={`${styles.langOption} ${
            selectedLang === lang.code ? styles.active : ''
          }`}
          onClick={() => handleLanguageChange(lang.code)}
          aria-label={`Switch to ${lang.name}`}
        >
          <span
            className={styles.flag}
            role='img'
            aria-label={`${lang.name} flag`}
          >
            {lang.flag}
          </span>
          <span className={styles.langText}>{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
