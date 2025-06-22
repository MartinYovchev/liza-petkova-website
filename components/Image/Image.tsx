import React, { useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Image.module.scss';
import Text from '../Typography/Text';

type ImageProps = Omit<NextImageProps, 'onLoadingComplete'> & {
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
};

const Image = ({
  className,
  wrapperClassName,
  priority = false,
  loading = 'lazy',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  alt,
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`${styles.imageWrapper} ${wrapperClassName || ''}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={styles.loadingPlaceholder}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.loadingSpinner} />
          </motion.div>
        )}
      </AnimatePresence>

      <NextImage
        className={`${styles.image} ${className || ''} ${
          isLoading ? styles.loading : ''
        } ${error ? styles.error : ''}`}
        priority={priority}
        loading={loading}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        alt={alt || ''}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />

      {error && (
        <div className={styles.errorMessage}>
          <Text as='span' noStyles={true}>
            Failed to load image
          </Text>
        </div>
      )}
    </div>
  );
};

export default Image;
