import React, { useMemo } from 'react';
import styles from './GradientText.module.scss';

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  duration?: number;
  // Performance optimization: pause animation when not visible
  paused?: boolean;
  // Performance optimization: respect motion preferences
  respectMotionPreference?: boolean;
};

export const GradientText = React.memo<GradientTextProps>(
  ({
    children,
    className,
    gradient = 'linear-gradient(90deg, #9c51e0, #e985ad, #9c51e0)',
    duration = 10,
    paused = false,
    respectMotionPreference = true,
  }: GradientTextProps) => {
    // Check for reduced motion preference
    const prefersReducedMotion = useMemo(() => {
      if (typeof window === 'undefined') return false;
      return (
        respectMotionPreference &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }, [respectMotionPreference]);

    // Memoize style to prevent recreation on every render
    const style = useMemo(
      () =>
        ({
          background: gradient,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          '--animation-duration': `${duration}s`,
          '--animation-play-state':
            paused || prefersReducedMotion ? 'paused' : 'running',
        }) as React.CSSProperties,
      [gradient, duration, paused, prefersReducedMotion]
    );

    // Memoize className to prevent recreation
    const combinedClassName = useMemo(() => {
      const classes = [
        styles.gradientText,
        prefersReducedMotion ? styles.noAnimation : '',
        className || '',
      ].filter(Boolean);
      return classes.join(' ');
    }, [className, prefersReducedMotion]);

    return (
      <span className={combinedClassName} style={style}>
        {children}
      </span>
    );
  }
);

GradientText.displayName = 'GradientText';
