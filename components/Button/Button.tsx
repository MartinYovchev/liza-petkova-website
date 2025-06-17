import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: React.ReactNode;
};

export const Button = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      {...props}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );
};
