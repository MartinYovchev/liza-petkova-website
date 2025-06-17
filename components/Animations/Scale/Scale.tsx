import React, { useEffect, useRef } from "react";
import styles from "./Scale.module.scss";

type ScaleProps = {
  children: React.ReactNode;
  scale?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
};

export const Scale = ({
  children,
  scale = 0.8,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className,
}: ScaleProps) => {
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
    "--delay": `${delay}s`,
    "--duration": `${duration}s`,
    "--scale": scale,
  } as React.CSSProperties;

  const classes = [styles.scale, isVisible ? styles.visible : "", className]
    .filter(Boolean)
    .join(" ");

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
