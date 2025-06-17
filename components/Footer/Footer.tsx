"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Title from "../Typography/Title";
import Text from "../Typography/Text";
import { useTheme } from "@/app/context/ThemeContext";

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

export const Footer = ({
  sections,
  copyright = `© ${new Date().getFullYear()} Liza's website. All rights reserved. Powered by Martin Yovchev`,
  socialLinks = [],
}: FooterProps) => {
  const { theme } = useTheme();

  const getThemeClass = () => {
    switch (theme) {
      case "artistic":
        return styles.artistic;
      case "professional":
        return styles.professional;
      default:
        return styles.default;
    }
  };

  return (
    <div className={`${styles.footer} ${getThemeClass()}`} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.sections}>
          {sections.map((section) => (
            <div key={section.title} className={styles.section}>
              <Title level="h3" className={styles.sectionTitle}>
                {section.title}
              </Title>
              <ul className={styles.linkList}>
                {section.links.map((link) => (
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

        {socialLinks.length > 0 && (
          <div className={styles.social}>
            {socialLinks.map((social) => (
              <Link
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`Follow us on ${social.platform}`}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        )}

        <div className={styles.bottom}>
          <Text as="p" className={styles.copyright}>
            {copyright}
          </Text>
        </div>
      </div>
    </div>
  );
};
