import React from "react";
import styles from "./IconButton.module.scss";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "ghost";
  ariaLabel: string;
};

export const IconButton = ({
  icon,
  size = "medium",
  variant = "primary",
  ariaLabel,
  className,
  ...props
}: IconButtonProps) => {
  const buttonClasses = [
    styles.iconButton,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} aria-label={ariaLabel} {...props}>
      {icon}
    </button>
  );
};
