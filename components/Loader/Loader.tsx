import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  isLoading: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Loader: React.FC<LoaderProps> = ({
  isLoading,
  message = 'Loading...',
  size = 'medium',
}) => {
  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={`${styles.spinner} ${styles[size]}`}>
          <div className={styles.spinnerInner} />
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Loader;
