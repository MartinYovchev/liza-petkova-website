'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  id?: string;
}

export default function ParallaxSection({
  children,
  speed = 0.2,
  className = '',
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{ y }}
      className={`relative ${className}`}
      aria-hidden='true'
      role='presentation'
    >
      {children}
    </motion.div>
  );
}
