'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTheme } from '@/app/context/ThemeContext';
import { IoMdContacts } from 'react-icons/io';
import { FaBriefcase, FaBars, FaTimes, FaBook } from 'react-icons/fa';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setTheme('default');
    closeMobileMenu();
  };

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
        {
          label: (
            <div className={styles.contactLabel}>
              <IoMdContacts />
              Contact
            </div>
          ),
          href: '/contact',
          style: 'default',
        },
        {
          label: (
            <div className={styles.blogLabel}>
              <FaBook />
              Blog
            </div>
          ),
          href: '/blog',
          style: 'default',
        },
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

  const getThemeClass = () => {
    switch (theme) {
      case 'artistic':
        return styles.artisticTheme;
      case 'professional':
        return styles.professionalTheme;
      default:
        return '';
    }
  };

  return (
    <>
      <div
        className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ''
        } ${getThemeClass()}`}
        role='banner'
      >
        <div className={styles.container}>
          <Link
            href='/'
            onClick={handleLogoClick}
            className={`${styles.logo} ${getTextStyle()}`}
          >
            Liza's Website
          </Link>

          {/* Burger Menu Button */}
          <button
            className={`${styles.burgerButton} ${getTextStyle()}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation */}
          <div
            className={`${styles.nav} ${styles.desktopNav}`}
            role='navigation'
            aria-label='Main navigation'
          >
            <ul className={styles.navList}>
              {navItems?.map((item, index) => (
                <li
                  key={item.href}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${getTextStyle()}`}
                    onClick={() =>
                      setTheme(
                        item.style as 'professional' | 'artistic' | 'default'
                      )
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Language Switcher */}
          <LanguageSwitcher
            className={`${styles.languageSwitcher} ${styles.desktopLanguageSwitcher}`}
            value='en'
            onChange={() => {}}
          />
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
            {/* Close button on overlay */}
            <button
              className={styles.overlayCloseButton}
              onClick={closeMobileMenu}
              aria-label='Close menu'
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Mobile Navigation */}
        <div
          className={`${styles.mobileNav} ${
            isMobileMenuOpen ? styles.mobileNavOpen : ''
          } ${getTextStyle()}`}
          role='navigation'
          aria-label='Mobile navigation'
        >
          <ul className={styles.mobileNavList}>
            {navItems?.map((item, index) => (
              <li
                key={item.href}
                className={styles.mobileNavItem}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={item.href}
                  className={`${styles.mobileNavLink} ${getTextStyle()}`}
                  onClick={() => {
                    setTheme(
                      item.style as 'professional' | 'artistic' | 'default'
                    );
                    closeMobileMenu();
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Language Switcher */}
          <div className={styles.mobileLanguageSwitcher}>
            <LanguageSwitcher value='en' onChange={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};
