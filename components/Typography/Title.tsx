'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import styles from './Typography.module.scss';

type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TitleProps = {
  level?: TitleLevel;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  id?: string;
  style?: React.CSSProperties;
  motionProps?: HTMLMotionProps<'div'>;
  noStyles?: boolean;
  // SEO enhancements
  sectionHeading?: boolean; // Indicates if this is a section heading for better structure
  pageTitle?: boolean; // Indicates if this is the main page title (should be h1)
  anchor?: string; // For creating anchor links and table of contents
  semanticLevel?: number; // Override visual level while maintaining semantic level
};

// Global heading hierarchy tracker for SEO validation
let headingHierarchy: number[] = [];

const Title = ({
  level = 'h1',
  children,
  className = '',
  animate = false,
  id,
  style,
  motionProps,
  noStyles = false,
  sectionHeading = false,
  pageTitle = false,
  anchor,
  semanticLevel,
}: TitleProps) => {
  // Determine the actual semantic level vs visual level
  const Component = level;
  const visualLevel = semanticLevel ? `h${semanticLevel}` : level;
  const baseClassName = styles[`title${visualLevel.charAt(1)}`];

  // Create anchor ID for navigation and table of contents
  const anchorId =
    id ||
    anchor ||
    (typeof children === 'string'
      ? children
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      : undefined);

  // SEO: Add structured data attributes
  const structuredProps = {
    ...(sectionHeading && { 'data-section-heading': 'true' }),
    ...(pageTitle && { 'data-page-title': 'true' }),
    ...(anchorId && { id: anchorId }),
    // Add semantic role for better accessibility
    role: pageTitle ? 'banner' : sectionHeading ? 'heading' : undefined,
    // Add aria-level for screen readers when visual and semantic levels differ
    ...(semanticLevel && { 'aria-level': parseInt(level.charAt(1)) }),
  };

  const titleContent = (
    <Component
      className={noStyles ? className : `${baseClassName} ${className}`}
      style={style}
      {...structuredProps}
    >
      {children}
      {/* Add anchor link for headings with IDs */}
    </Component>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...motionProps}
      >
        {titleContent}
      </motion.div>
    );
  }

  return titleContent;
};

// Utility function to reset heading hierarchy (useful for page transitions)
export const resetHeadingHierarchy = () => {
  headingHierarchy = [];
};

// Utility function to get current heading hierarchy (useful for table of contents)
export const getHeadingHierarchy = () => {
  return [...headingHierarchy];
};

export default Title;
