import React from 'react';
import { motion } from 'framer-motion';
import styles from './GradientText.module.scss';

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  duration?: number;
};

export const GradientText = ({
  children,
  className,
  gradient = 'linear-gradient(90deg, #9c51e0, #e985ad, #9c51e0)',
  duration = 10,
}: GradientTextProps) => {
  return (
    <motion.span
      className={`${styles.gradientText} ${className || ''}`}
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        background: gradient,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </motion.span>
  );
};
