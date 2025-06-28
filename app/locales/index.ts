import { en } from './en';
import { bg } from './bg';

export const translations = {
  en,
  bg,
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

// Helper function to get all available languages
export const getAvailableLanguages = (): Language[] => {
  return Object.keys(translations) as Language[];
};

// Helper function to get language display names
export const getLanguageDisplayName = (lang: Language): string => {
  const displayNames: Record<Language, string> = {
    en: 'English',
    bg: 'Български',
  };
  return displayNames[lang];
};
