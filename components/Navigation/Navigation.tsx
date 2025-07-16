'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTheme } from '@/app/context/ThemeContext';
import { IoMdContacts } from 'react-icons/io';
import { FaBriefcase, FaBars, FaTimes, FaBook } from 'react-icons/fa';
import { TbPencilExclamation } from 'react-icons/tb';
import { useTranslation } from '@/contexts/TranslationContext';

type NavigationProps = {
  style?: 'artistic' | 'professional' | 'default';
  navItems?: {
    label: string;
    href: string;
    style: 'artistic' | 'professional' | 'default';
  }[];
};

export const Navigation = ({ style = 'default' }: NavigationProps) => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

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
              {t('professionalPageNavigation')}
            </div>
          ),
          href: '/professional',
          style: 'professional',
        },
        {
          label: (
            <div className={styles.artisticLabel}>
              <TbPencilExclamation />
              {t('artisticPageNavigation')}
            </div>
          ),
          href: '/artistic',
          style: 'artistic',
        },
        {
          label: (
            <div className={styles.blogLabel}>
              <FaBook />
              {t('blogPageNavigation')}
            </div>
          ),
          href: '/blog',
          style: 'default',
        },
        {
          label: (
            <div className={styles.contactLabel}>
              <IoMdContacts />
              {t('contactPageNavigation')}
            </div>
          ),
          href: '/contact',
          style: 'default',
        },
      ];
    } else if (style === 'artistic') {
      return [
        {
          label: t('firstPageNavigation'),
          href: '/artistic',
          style: 'artistic',
        },
        {
          label: t('processPageNavigation'),
          href: '/artistic/progress',
          style: 'artistic',
        },
        {
          label: t('aboutPageNavigation'),
          href: '/artistic/about',
          style: 'artistic',
        },
        { label: t('blogPageNavigation'), href: '/blog', style: 'artistic' },
        {
          label: t('contactPageNavigation'),
          href: '/contact',
          style: 'artistic',
        },
      ];
    } else if (style === 'professional') {
      return [
        {
          label: t('firstPageNavigation'),
          href: '/professional',
          style: 'professional',
        },
        {
          label: t('servicesPageNavigation'),
          href: '/professional/services',
          style: 'professional',
        },
        {
          label: t('aboutPageNavigation'),
          href: '/professional/about',
          style: 'professional',
        },
        {
          label: t('blogPageNavigation'),
          href: '/blog',
          style: 'professional',
        },
        {
          label: t('contactPageNavigation'),
          href: '/contact',
          style: 'professional',
        },
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
      <header
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
            aria-label='Go to homepage'
          >
            {t('homePageNavigation')}
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`${styles.nav} ${styles.desktopNav}`}
            role='navigation'
            aria-label='Main navigation'
          >
            <ul className={styles.navList} role='menubar'>
              {navItems?.map((item, index) => (
                <li
                  key={item.href}
                  className={styles.navItem}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  role='none'
                >
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${getTextStyle()}`}
                    onClick={() =>
                      setTheme(
                        item.style as 'professional' | 'artistic' | 'default'
                      )
                    }
                    role='menuitem'
                    aria-label={`Navigate to ${typeof item.label === 'string' ? item.label : item.href}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Language Switcher */}
          <div
            className={`${styles.languageSwitcher} ${styles.desktopLanguageSwitcher}`}
          >
            <LanguageSwitcher
              currentLanguage='en'
              onLanguageChange={() => {}}
            />
          </div>

          {/* Burger Menu Button */}
          <button
            className={`${styles.burgerButton} ${getTextStyle()}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls='mobile-navigation'
            type='button'
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className={styles.mobileMenuOverlay}
            onClick={closeMobileMenu}
            aria-hidden='true'
          >
            {/* Close button on overlay */}
            <button
              className={styles.overlayCloseButton}
              onClick={closeMobileMenu}
              aria-label='Close menu'
              type='button'
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Mobile Navigation */}
        <nav
          id='mobile-navigation'
          className={`${styles.mobileNav} ${
            isMobileMenuOpen ? styles.mobileNavOpen : ''
          } ${getTextStyle()}`}
          role='navigation'
          aria-label='Mobile navigation'
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className={styles.mobileNavList} role='menu'>
            {navItems?.map((item, index) => (
              <li
                key={item.href}
                className={styles.mobileNavItem}
                style={{ animationDelay: `${index * 0.1}s` }}
                role='none'
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
                  role='menuitem'
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                  aria-label={`Navigate to ${typeof item.label === 'string' ? item.label : item.href}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Language Switcher */}
          <div className={styles.mobileLanguageSwitcher}>
            <LanguageSwitcher
              currentLanguage='en'
              onLanguageChange={() => {}}
            />
          </div>
        </nav>
      </header>
    </>
  );
};
