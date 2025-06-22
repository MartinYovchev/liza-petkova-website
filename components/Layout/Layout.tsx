import React from 'react';
import { Footer } from '@/components/Footer/Footer';
import { NavigationWrapper } from '../Navigation/NavigationWrapper';
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBlog,
  FaShoppingCart,
  FaUser,
  FaCog,
  FaQuestionCircle,
} from 'react-icons/fa';

type LayoutProps = {
  children: React.ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  footerSections?: any[];
  contactInfo?: any;
  className?: string;
};

const defaultFooterSections = [
  {
    title: 'Navigation',
    icon: <FaHome />,
    links: [
      { label: 'Home', href: '/', icon: <FaHome /> },
      {
        label: 'Professional About',
        href: '/professional/about',
        icon: <FaInfoCircle />,
      },
      {
        label: 'Artistic About',
        href: '/artistic/about',
        icon: <FaInfoCircle />,
      },
      { label: 'Contact', href: '/contact', icon: <FaEnvelope /> },
      { label: 'Blog', href: '/blog', icon: <FaBlog /> },
    ],
  },
  {
    title: 'Professional',
    icon: <FaShoppingCart />,
    links: [
      { label: 'Professional Home', href: '/professional', icon: <FaHome /> },
      {
        label: 'Services',
        href: '/professional/services',
        icon: <FaShoppingCart />,
      },
      { label: 'About', href: '/professional/about', icon: <FaInfoCircle /> },
    ],
  },
  {
    title: 'Artistic',
    icon: <FaUser />,
    links: [
      { label: 'Artistic Home', href: '/artistic', icon: <FaHome /> },
      { label: 'About', href: '/artistic/about', icon: <FaInfoCircle /> },
      { label: 'Progress', href: '/artistic/progress', icon: <FaUser /> },
    ],
  },
  {
    title: 'Admin',
    icon: <FaQuestionCircle />,
    links: [
      { label: 'Admin Panel', href: '/admin', icon: <FaCog /> },
      { label: 'Manage Posts', href: '/admin/posts', icon: <FaBlog /> },
    ],
  },
];

const defaultContactInfo = {
  email: 'contact@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main Street, City, Country',
  workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
};

export const Layout = ({
  children,
  showNavigation = true,
  showFooter = true,
  footerSections = defaultFooterSections,
  contactInfo = defaultContactInfo,
  className = '',
}: LayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showNavigation && <NavigationWrapper />}
      <main className='flex-1'>{children}</main>
      {showFooter && (
        <Footer
          sections={footerSections}
          copyright={`© ${new Date().getFullYear()} Liza's website. All rights reserved. Powered by Martin Yovchev`}
        />
      )}
    </div>
  );
};
