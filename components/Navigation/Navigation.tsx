'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTheme } from '@/app/context/ThemeContext';
import { Button } from '../Button/Button';
import { FaBriefcase } from 'react-icons/fa';
import { TbPencilExclamation } from 'react-icons/tb';

type NavigationProps = {
  logo?: React.ReactNode;
  style?: 'artistic' | 'professional' | 'default';
  navItems?: {
    label: string;
    href: string;
    style: 'artistic' | 'professional' | 'default';
  }[];
};

export const Navigation = ({ logo, style = 'default' }: NavigationProps) => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = (() => {
    if (style === 'default') {
      return [
        {
          label: (
            <div className={styles.professionalLabel}>
              <FaBriefcase />
              Professional
            </div>
          ),
          href: '/professional',
          style: 'professional',
        },
        {
          label: (
            <div className={styles.artisticLabel}>
              <TbPencilExclamation />
              Artistic
            </div>
          ),
          href: '/artistic',
          style: 'artistic',
        },
        { label: 'Contact', href: '/contact', style: 'default' },
        { label: 'Blog', href: '/blog', style: 'default' },
      ];
    } else if (style === 'artistic') {
      return [
        { label: 'Home', href: '/artistic', style: 'artistic' },
        { label: 'Progress', href: '/artistic/progress', style: 'artistic' },
        { label: 'About', href: '/artistic/about', style: 'artistic' },
        { label: 'Contact', href: '/contact', style: 'artistic' },
        { label: 'Blog', href: '/blog', style: 'artistic' },
      ];
    } else if (style === 'professional') {
      return [
        { label: 'Home', href: '/professional', style: 'professional' },
        {
          label: 'Services',
          href: '/professional/services',
          style: 'professional',
        },
        { label: 'About', href: '/professional/about', style: 'professional' },
        { label: 'Contact', href: '/contact', style: 'professional' },
        { label: 'Blog', href: '/blog', style: 'professional' },
      ];
    }
  })();
  const getTextStyle = () => {
    switch (theme) {
      case 'artistic':
        return styles.artisticText;
      case 'professional':
        return styles.professionalText;
      default:
        return styles.defaultText;
    }
  };

  return (
    <div
      className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''}`}
      role='banner'
    >
      <div className={styles.container}>
        <div className={`${styles.logo} ${getTextStyle()}`}>
          {logo || (
            <Link href='/'>
              <Button onClick={() => setTheme('default')}>
                Liza's website
              </Button>
            </Link>
          )}
        </div>

        <div
          className={styles.nav}
          role='navigation'
          aria-label='Main navigation'
        >
          <ul className={styles.navList}>
            {navItems?.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${getTextStyle()}`}
                >
                  <Button
                    style={{
                      all: 'unset',
                    }}
                    onClick={() =>
                      setTheme(
                        item.style as 'professional' | 'artistic' | 'default'
                      )
                    }
                  >
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <LanguageSwitcher
          className={styles.languageSwitcher}
          value='en'
          onChange={() => {}}
        />
      </div>
    </div>
  );
};
