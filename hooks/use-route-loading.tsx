'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

export const useRouteLoading = () => {
  const { showLoader, hideLoader } = useLoading();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Hide loader when route changes (component mounts)
    hideLoader();
  }, [pathname, hideLoader]);

  const navigateWithLoader = (url: string, message?: string) => {
    showLoader(message || 'Loading page...');
    router.push(url);
  };

  const navigateReplaceWithLoader = (url: string, message?: string) => {
    showLoader(message || 'Loading page...');
    router.replace(url);
  };

  return {
    navigateWithLoader,
    navigateReplaceWithLoader,
    showLoader,
    hideLoader,
  };
};

// Hook for manual loading states (e.g., API calls, form submissions)
export const useAsyncLoading = () => {
  const { showLoader, hideLoader } = useLoading();

  const withLoading = async <T,>(
    asyncFn: () => Promise<T>,
    message?: string
  ): Promise<T> => {
    try {
      showLoader(message || 'Loading...');
      const result = await asyncFn();
      return result;
    } finally {
      hideLoader();
    }
  };

  return {
    withLoading,
    showLoader,
    hideLoader,
  };
};
