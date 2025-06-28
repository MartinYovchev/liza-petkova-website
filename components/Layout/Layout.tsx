'use client';

import { Footer } from '@/components/Footer/Footer';
import { NavigationWrapper } from '../Navigation/NavigationWrapper';
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBlog,
  FaShoppingCart,
  FaUser,
} from 'react-icons/fa';
import { useTranslation } from '@/contexts/TranslationContext';

type LayoutProps = {
  children: React.ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  footerSections?: any[];
  className?: string;
};

export const Layout = ({
  children,
  showNavigation = true,
  showFooter = true,
  footerSections,
  className = '',
}: LayoutProps) => {
  const { t } = useTranslation();
  const defaultFooterSections = [
    {
      title: t('navigation'),
      icon: <FaHome />,
      links: [
        { label: 'Home', href: '/', icon: <FaHome /> },
        {
          label: t('professionalPageNavigation'),
          href: '/professional/about',
          icon: <FaInfoCircle />,
        },
        {
          label: t('artisticPageNavigation'),
          href: '/artistic/about',
          icon: <FaInfoCircle />,
        },
        {
          label: t('contactPageNavigation'),
          href: '/contact',
          icon: <FaEnvelope />,
        },
        { label: t('blogPageNavigation'), href: '/blog', icon: <FaBlog /> },
      ],
    },
    {
      title: t('professionalPageNavigation'),
      icon: <FaShoppingCart />,
      links: [
        {
          label: t('firstPageNavigation'),
          href: '/professional',
          icon: <FaHome />,
        },
        {
          label: t('servicesPageNavigation'),
          href: '/professional/services',
          icon: <FaShoppingCart />,
        },
        {
          label: t('aboutPageNavigation'),
          href: '/professional/about',
          icon: <FaInfoCircle />,
        },
      ],
    },
    {
      title: t('artisticPageNavigation'),
      icon: <FaUser />,
      links: [
        {
          label: t('firstPageNavigation'),
          href: '/artistic',
          icon: <FaHome />,
        },
        {
          label: t('aboutPageNavigation'),
          href: '/artistic/about',
          icon: <FaInfoCircle />,
        },
        {
          label: t('processPageNavigation'),
          href: '/artistic/progress',
          icon: <FaUser />,
        },
      ],
    },
  ];

  const defaultContactInfo = {
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, Country',
    workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
  };
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showNavigation && <NavigationWrapper />}
      <main className='flex-1'>{children}</main>
      {showFooter && (
        <Footer sections={footerSections || defaultFooterSections} />
      )}
    </div>
  );
};
