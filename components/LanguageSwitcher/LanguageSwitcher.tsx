import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '../Button/Button';
import Text from '../Typography/Text';
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
        <Button
          key={lang.code}
          variant='outline'
          size='small'
          className={`${styles.langOption} ${language === lang.code ? styles.active : ''}`}
          onClick={() => handleLanguageChange(lang.code)}
          aria-label={`Switch to ${lang.name}`}
        >
          <Text
            as='span'
            className={styles.flag}
            aria-label={`${lang.name} flag`}
          >
            {lang.flag}
          </Text>
          <Text as='span' className={styles.langText}>
            {lang.name}
          </Text>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
