import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

type BaseButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
};

type ButtonElementProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkElementProps = BaseButtonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: never;
  disabled?: never;
};

type ButtonProps = ButtonElementProps | LinkElementProps;

export const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  className,
  href,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const ariaLabel = typeof children === 'string' ? children : undefined;

  if (href) {
    const { target, rel, onClick, ...restProps } = props as Omit<
      LinkElementProps,
      'href'
    >;
    return (
      <Link
        href={href}
        className={buttonClasses}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      {...(props as ButtonElementProps)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
