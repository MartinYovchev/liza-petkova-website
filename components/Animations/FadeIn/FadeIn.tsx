import React, { useEffect, useRef } from 'react';
import styles from './FadeIn.module.scss';

type FadeInProps = {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
};

export const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className,
}: FadeInProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const animationStyle = {
    '--delay': `${delay}s`,
    '--duration': `${duration}s`,
  } as React.CSSProperties;

  const classes = [
    styles.fadeIn,
    styles[direction],
    isVisible ? styles.visible : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={elementRef}
      className={classes}
      style={animationStyle}
      aria-hidden={!isVisible}
    >
      {children}
    </div>
  );
};
