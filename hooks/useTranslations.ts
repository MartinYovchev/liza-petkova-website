'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import type { TranslationKey } from '@/app/locales';

// Custom hook for form validation messages
export const useValidationMessages = () => {
  const { t } = useTranslation();

  return {
    required: () => t('fieldRequired'),
    invalidEmail: () => t('invalidEmail'),
    passwordTooShort: () => t('passwordTooShort'),
    passwordsDoNotMatch: () => t('passwordsDoNotMatch'),
  };
};

// Custom hook for common UI messages
export const useUIMessages = () => {
  const { t } = useTranslation();

  return {
    loading: () => t('loading'),
    error: () => t('error'),
    success: () => t('success'),
    cancel: () => t('cancel'),
    save: () => t('save'),
    delete: () => t('delete'),
    edit: () => t('edit'),
    yes: () => t('yes'),
    no: () => t('no'),
    close: () => t('close'),
    open: () => t('open'),
  };
};

// Custom hook for status messages
export const useStatusMessages = () => {
  const { t } = useTranslation();

  return {
    savedSuccessfully: () => t('savedSuccessfully'),
    deletedSuccessfully: () => t('deletedSuccessfully'),
    errorOccurred: () => t('errorOccurred'),
    pleaseWait: () => t('pleaseWait'),
    processing: () => t('processing'),
  };
};

// Custom hook for interpolated translations
export const useInterpolatedTranslation = () => {
  const { t } = useTranslation();

  const interpolate = (
    key: TranslationKey,
    values: Record<string, string | number>
  ): string => {
    const template = t(key);
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return values[key]?.toString() || match;
    });
  };

  return { interpolate };
};
