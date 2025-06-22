'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  id?: string;
  staggerDelay?: number;
  animationDuration?: number;
}

export default function StaggerChildren({
  children,
  className = '',
  id,
  staggerDelay = 0.1,
  animationDuration = 0.5,
}: StaggerChildrenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationDuration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      id={id}
      className={className}
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={childVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}
