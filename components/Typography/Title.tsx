"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import styles from "./Typography.module.scss";

type TitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TitleProps = {
  level?: TitleLevel;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  id?: string;
  style?: React.CSSProperties;
  motionProps?: HTMLMotionProps<"div">;
  noStyles?: boolean;
};

const Title = ({
  level = "h1",
  children,
  className = "",
  animate = false,
  id,
  style,
  motionProps,
  noStyles = false,
}: TitleProps) => {
  const Component = level;
  const baseClassName = styles[`title${level.charAt(1)}`];

  const titleContent = (
    <Component
      id={id}
      className={noStyles ? className : `${baseClassName} ${className}`}
      style={style}
    >
      {children}
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

export default Title;
