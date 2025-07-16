import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './FadeIn.module.scss';

type FadeInProps = {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  // Performance optimization: disable animations on low-end devices
  respectMotionPreference?: boolean;
};

// Global observer instance for better performance
let globalObserver: IntersectionObserver | null = null;
const observedElements = new WeakMap<Element, () => void>();

const createGlobalObserver = (threshold: number = 0.1) => {
  if (typeof window === 'undefined') return null;

  if (globalObserver) {
    globalObserver.disconnect();
  }

  globalObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const callback = observedElements.get(entry.target);
          if (callback) {
            callback();
            globalObserver?.unobserve(entry.target);
            observedElements.delete(entry.target);
          }
        }
      });
    },
    {
      threshold,
      rootMargin: '50px', // Start animation slightly before element comes into view
    }
  );

  return globalObserver;
};

// Helper function to check if element is already in viewport
const isElementInViewport = (element: Element, threshold: number = 0.1) => {
  if (typeof window === 'undefined') return false;

  const rect = element.getBoundingClientRect();
  const elementHeight = rect.height;
  const elementWidth = rect.width;

  // Check if the required threshold of the element is visible
  const visibleHeight =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  const visibleWidth =
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);

  const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
  const totalArea = elementHeight * elementWidth;

  return totalArea > 0 && visibleArea / totalArea >= threshold;
};

export const FadeIn = React.memo<FadeInProps>(
  ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.5,
    threshold = 0.1,
    className,
    respectMotionPreference = true,
  }: FadeInProps) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    // Check for reduced motion preference
    const prefersReducedMotion = useMemo(() => {
      if (typeof window === 'undefined') return false;
      return (
        respectMotionPreference &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }, [respectMotionPreference]);

    // Memoize animation style to prevent recreating on every render
    const animationStyle = useMemo(
      () =>
        ({
          '--delay': `${delay}s`,
          '--duration': `${duration}s`,
        }) as React.CSSProperties,
      [delay, duration]
    );

    // Memoize classes to prevent recreating on every render
    const classes = useMemo(
      () =>
        [
          styles.fadeIn,
          styles[direction],
          isVisible || prefersReducedMotion ? styles.visible : '',
          className,
        ]
          .filter(Boolean)
          .join(' '),
      [direction, isVisible, prefersReducedMotion, className]
    );

    // Optimize callback with useCallback
    const handleIntersection = useCallback(() => {
      setIsVisible(true);
    }, []);

    // Handle client-side hydration
    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || prefersReducedMotion) {
        // If reduced motion is preferred, show immediately
        if (prefersReducedMotion) {
          setIsVisible(true);
        }
        return;
      }

      // Check if element is already visible on mount/hydration
      if (isMounted && isElementInViewport(element, threshold)) {
        setIsVisible(true);
        return;
      }

      const observer = createGlobalObserver(threshold);
      if (!observer) {
        // Fallback: if observer creation fails, show element after a short delay
        const fallbackTimer = setTimeout(() => {
          setIsVisible(true);
        }, 100);

        return () => clearTimeout(fallbackTimer);
      }

      observedElements.set(element, handleIntersection);
      observer.observe(element);

      // Fallback: ensure element becomes visible even if observer fails
      const fallbackTimer = setTimeout(() => {
        if (!isVisible) {
          setIsVisible(true);
        }
      }, 5000); // 5 second fallback

      return () => {
        clearTimeout(fallbackTimer);
        if (element && observer) {
          observer.unobserve(element);
          observedElements.delete(element);
        }
      };
    }, [
      threshold,
      handleIntersection,
      prefersReducedMotion,
      isMounted,
      isVisible,
    ]);

    // Performance: Add will-change only when needed
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (!isVisible && !prefersReducedMotion) {
        element.style.willChange = 'opacity, transform';
      } else {
        element.style.willChange = 'auto';
      }

      return () => {
        if (element) {
          element.style.willChange = 'auto';
        }
      };
    }, [isVisible, prefersReducedMotion]);

    // For SSR, render visible state on server to prevent layout shift
    const shouldBeVisible = !isMounted || isVisible || prefersReducedMotion;

    return (
      <div
        ref={elementRef}
        className={classes}
        style={animationStyle}
        aria-hidden={!shouldBeVisible}
      >
        {children}
      </div>
    );
  }
);

FadeIn.displayName = 'FadeIn';

// Cleanup function for SSR and testing
export const cleanupFadeInObserver = () => {
  if (globalObserver) {
    globalObserver.disconnect();
    globalObserver = null;
  }
};
