'use client';
import { ReactNode } from 'react';
import styles from './HoverScale.module.scss';

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export const HoverScale = ({
  children,
  scale = 1.05,
  duration = 0.2,
  className = '',
}: HoverScaleProps) => {
  return (
    <div
      className={`${styles.hoverScale} ${className}`}
      style={
        {
          '--scale': scale,
          '--duration': `${duration}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
