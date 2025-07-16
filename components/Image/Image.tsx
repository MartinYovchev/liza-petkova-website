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
  alt: string; // Made required for SEO
  caption?: string; // Added for better SEO
  figcaption?: string; // Added for semantic HTML
  author?: string; // Added for image attribution
  datePublished?: string; // Added for structured data
  schemaType?: 'ImageObject' | 'Photograph' | 'Artwork'; // Added for structured data
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
  caption,
  figcaption,
  author,
  datePublished,
  schemaType = 'ImageObject',
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Validate alt text for SEO
  if (!alt || alt.trim().length === 0) {
    console.warn(
      'Image component: Alt text is required for SEO and accessibility'
    );
  }

  // // Generate structured data for SEO
  // const generateStructuredData = () => {
  //   if (!props.src) return null;

  //   const structuredData = {
  //     '@context': 'https://schema.org',
  //     '@type': schemaType,
  //     url: typeof props.src === 'string' ? props.src : '',
  //     description: alt,
  //     name: caption || alt,
  //     ...(author && { author: { '@type': 'Person', name: author } }),
  //     ...(datePublished && { datePublished: datePublished }),
  //     ...(props.width && { width: props.width }),
  //     ...(props.height && { height: props.height }),
  //   };

  //   return (
  //     <script
  //       type='application/ld+json'
  //       dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  //     />
  //   );
  // };

  const imageElement = (
    <NextImage
      className={`${styles.image} ${className || ''} ${
        isLoading ? styles.loading : ''
      } ${error ? styles.error : ''}`}
      priority={priority}
      loading={loading}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      alt={alt}
      onLoad={() => setIsLoading(false)}
      onError={() => {
        setError(true);
        setIsLoading(false);
        console.error(`Failed to load image: ${props.src}`);
      }}
      // SEO optimization: add title attribute for better context
      title={caption || alt}
      {...props}
    />
  );

  // const content = (
  //   <>
  //     {generateStructuredData()}
  //     <div className={`${styles.imageWrapper} ${wrapperClassName || ''}`}>
  //       <AnimatePresence>
  //         {isLoading && (
  //           <motion.div
  //             className={styles.loadingPlaceholder}
  //             initial={{ opacity: 1 }}
  //             exit={{ opacity: 0 }}
  //             transition={{ duration: 0.3 }}
  //             aria-label='Loading image'
  //           >
  //             <div className={styles.loadingSpinner} />
  //             <span className='sr-only'>Loading image: {alt}</span>
  //           </motion.div>
  //         )}
  //       </AnimatePresence>

  //       {imageElement}

  //       {error && (
  //         <div className={styles.errorMessage} role='alert'>
  //           <Text as='span' noStyles={true}>
  //             Failed to load image: {alt}
  //           </Text>
  //         </div>
  //       )}
  //     </div>

  //     {(caption || figcaption) && (
  //       <figcaption className={styles.caption}>
  //         <Text as='span' size='sm' className={styles.captionText}>
  //           {figcaption || caption}
  //         </Text>
  //         {author && (
  //           <Text as='span' size='xs' className={styles.attribution}>
  //             Photo by {author}
  //           </Text>
  //         )}
  //       </figcaption>
  //     )}
  //   </>
  // );

  // Use semantic figure element when caption is provided
  if (caption || figcaption) {
    return <figure className={styles.figure}>{imageElement}</figure>;
  }

  return imageElement;
};

export default Image;
