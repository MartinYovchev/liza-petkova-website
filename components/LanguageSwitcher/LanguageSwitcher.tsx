import { useTranslation } from '@/contexts/TranslationContext';
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

type LanguageSwitcherProps = {
  currentLanguage?: 'bg' | 'en';
  onLanguageChange?: (language: 'bg' | 'en') => void;
  className?: string;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
}) => {
  const { language, setLanguage } = useTranslation();

  const handleLanguageChange = (langCode: 'bg' | 'en') => {
    setLanguage(langCode);
  };

  return (
    <div className={`${styles.languageSwitcher} ${className}`}>
      <div
        className={`${styles.slider} ${language === 'bg' ? styles.sliderBg : styles.sliderEn}`}
      />
      {languages.map(lang => (
        <button
          key={lang.code}
          className={`${styles.langOption} ${language === lang.code ? styles.active : ''}`}
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
