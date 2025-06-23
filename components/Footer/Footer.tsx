'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';
import Title from '../Typography/Title';
import Text from '../Typography/Text';
import { useTheme } from '@/app/context/ThemeContext';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
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
  copyright = `© ${new Date().getFullYear()} Liza's website. All rights reserved. Powered by Martin Yovchev`,
  socialLinks = defaultSocialLinks,
}: FooterProps) => {
  const { theme } = useTheme();

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

  return (
    <div className={`${styles.footer} ${getThemeClass()}`} role='contentinfo'>
      <div className={styles.container}>
        <div className={styles.sections}>
          {sections.map(section => (
            <div key={section.title} className={styles.section}>
              <Title level='h3' className={styles.sectionTitle}>
                {section.title}
              </Title>
              <ul className={styles.linkList}>
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
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
            {copyright}
          </Text>
        </div>
      </div>
    </div>
  );
};
