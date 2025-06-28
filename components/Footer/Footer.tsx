'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';
import Title from '../Typography/Title';
import Text from '../Typography/Text';
import { useTheme } from '@/app/context/ThemeContext';
import { useTranslation } from '@/contexts/TranslationContext';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterProps = {
  sections: FooterSection[];
  copyright?: string;
  socialLinks?: {
    platform: string;
    url: string;
    icon: React.ReactNode;
  }[];
};

const defaultSocialLinks = [
  {
    platform: 'Facebook',
    url: 'https://facebook.com',
    icon: <FaFacebook />,
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com',
    icon: <FaTwitter />,
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com',
    icon: <FaInstagram />,
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: <FaLinkedin />,
  },
  {
    platform: 'GitHub',
    url: 'https://github.com',
    icon: <FaGithub />,
  },
  {
    platform: 'YouTube',
    url: 'https://youtube.com',
    icon: <FaYoutube />,
  },
];

export const Footer = ({
  sections,
  copyright,
  socialLinks = defaultSocialLinks,
}: FooterProps) => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'artistic':
        return styles.artistic;
      case 'professional':
        return styles.professional;
      default:
        return styles.default;
    }
  };

  const getThemeForRoute = (
    href: string
  ): 'professional' | 'artistic' | 'default' => {
    if (href.startsWith('/professional')) {
      return 'professional';
    } else if (href.startsWith('/artistic')) {
      return 'artistic';
    } else {
      return 'default';
    }
  };

  const handleLinkClick = (href: string) => {
    const newTheme = getThemeForRoute(href);
    setTheme(newTheme);
  };

  // Helper function to replace placeholders in translations
  const formatTranslation = (
    template: string,
    values: Record<string, string | number>
  ): string => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return values[key]?.toString() || match;
    });
  };

  const currentYear = new Date().getFullYear();

  // Generate translated copyright text
  const getTranslatedCopyright = () => {
    if (copyright) {
      return copyright;
    }

    const copyrightText = formatTranslation(t('footerCopyright'), {
      year: currentYear,
    });
    const poweredByText = t('poweredBy');
    const martinYovchevText = t('martinYovchev');

    return (
      <>
        {copyrightText} {poweredByText}{' '}
        <a
          href='https://www.linkedin.com/in/martin-yovchev-43643928a/'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.martinLink}
        >
          {martinYovchevText}
        </a>
      </>
    );
  };

  return (
    <div className={`${styles.footer} ${getThemeClass()}`} role='contentinfo'>
      <div className={styles.container}>
        <div className={styles.sections}>
          {sections.map(section => (
            <div key={section.title} className={styles.section}>
              <button
                className={styles.sectionHeader}
                onClick={() => toggleSection(section.title)}
                aria-expanded={openSections[section.title] || false}
                aria-controls={`section-${section.title.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <Title level='h3' className={styles.sectionTitle}>
                  {section.title}
                </Title>
                <span className={styles.toggleIcon}>
                  {openSections[section.title] ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              </button>
              <div
                id={`section-${section.title.replace(/\s+/g, '-').toLowerCase()}`}
                className={`${styles.linkListContainer} ${openSections[section.title] ? styles.open : ''}`}
              >
                <ul className={styles.linkList}>
                  {section.links.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={styles.link}
                        onClick={() => handleLinkClick(link.href)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.social}>
          {socialLinks.map(social => (
            <Link
              key={social.platform}
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label={`Follow us on ${social.platform}`}
            >
              {social.icon}
            </Link>
          ))}
        </div>

        <div className={styles.bottom}>
          <Text as='p' className={styles.copyright}>
            {getTranslatedCopyright()}
          </Text>
        </div>
      </div>
    </div>
  );
};
