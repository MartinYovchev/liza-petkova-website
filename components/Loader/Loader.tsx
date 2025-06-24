'use client';

import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  isLoading: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'overlay' | 'inline';
}

export const Loader: React.FC<LoaderProps> = ({
  isLoading,
  message = 'Loading...',
  size = 'medium',
  variant = 'overlay',
}) => {
  if (!isLoading) return null;

  const loaderContent = (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );

  if (variant === 'overlay') {
    return <div className={styles.overlay}>{loaderContent}</div>;
  }

  return loaderContent;
};

// Global page loader for route transitions
export const GlobalPageLoader: React.FC<{
  isLoading: boolean;
  message?: string;
}> = ({ isLoading, message = 'Loading...' }) => {
  return (
    <Loader
      isLoading={isLoading}
      message={message}
      variant='overlay'
      size='large'
    />
  );
};

export default Loader;
