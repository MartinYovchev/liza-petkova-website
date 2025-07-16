'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import styles from './Typography.module.scss';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

type TextProps = {
  children: React.ReactNode;
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
  animate?: boolean;
  as?: 'p' | 'span' | 'label' | 'div';
  id?: string;
  htmlFor?: string; // For when used as a label
  style?: React.CSSProperties;
  motionProps?: HTMLMotionProps<'div'>;
  noStyles?: boolean;
};

const Text = ({
  children,
  size = 'md',
  weight = 'normal',
  className = '',
  animate = false,
  as: Component = 'p',
  id,
  htmlFor,
  style,
  motionProps,
  noStyles = false,
}: TextProps) => {
  const textContent = (
    <Component
      id={id}
      htmlFor={htmlFor}
      className={
        noStyles
          ? className
          : `${styles.text} ${styles[`text${size}`]} ${
              styles[`weight${weight}`]
            } ${className}`
      }
      style={style}
    >
      {children}
    </Component>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...motionProps}
      >
        {textContent}
      </motion.div>
    );
  }

  return textContent;
};

export default Text;
