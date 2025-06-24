'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GlobalPageLoader } from '@/components/Loader/Loader';

interface LoadingContextType {
  isLoading: boolean;
  message: string;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Loading...');

  const showLoader = (loadingMessage?: string) => {
    setMessage(loadingMessage || 'Loading...');
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const value: LoadingContextType = {
    isLoading,
    message,
    showLoader,
    hideLoader,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <GlobalPageLoader isLoading={isLoading} message={message} />
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export default LoadingContext;
