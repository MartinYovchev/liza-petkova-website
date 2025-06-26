'use client';

import { services } from '../constants';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import Image from '@/components/Image/Image';
import Link from 'next/link';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import { HoverScale } from '@/components/Animations/HoverScale/HoverScale';
import styles from './ServiceDetails.module.scss';
import { Layout } from '@/components/Layout/Layout';

interface ServiceDetailsProps {
  id: string;
}

export default function ServiceDetails({ id }: ServiceDetailsProps) {
  const service = services.find(s => s.id.toString() === id);

  if (!service) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <FadeIn direction='up'>
            <Title level='h2'>Service Not Found</Title>
            <Text as='p'>The requested service could not be found.</Text>
            <Link href='/professional/services' className={styles.backButton}>
              ← Back to Services
            </Link>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href='/professional/services' className={styles.breadcrumbLink}>
            ← Services
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{service.title}</span>
        </div>

        {/* Hero Section */}
        <FadeIn direction='up' className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              {service.popular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}
              <Title level='h1' className={styles.serviceTitle}>
                {service.title}
              </Title>
              <Text as='p' className={styles.serviceDescription}>
                {service.description}
              </Text>
              <div className={styles.serviceMeta}>
                <span className={styles.duration}>
                  Duration: {service.duration}
                </span>
              </div>
            </div>
            <div className={styles.heroImage}>
              <HoverScale scale={1.02}>
                <Image
                  src={service.image || '/placeholder.svg'}
                  alt={service.title}
                  width={600}
                  height={400}
                />
              </HoverScale>
            </div>
          </div>
        </FadeIn>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Features Section */}
          <FadeIn direction='up' delay={0.2} className={styles.section}>
            <Title level='h2' className={styles.sectionTitle}>
              What's Included
            </Title>
            <div className={styles.featuresGrid}>
              {service.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Contact CTA */}
          <FadeIn direction='up' delay={0.3} className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <Title level='h3' className={styles.ctaTitle}>
                Ready to Get Started?
              </Title>
              <Text as='p' className={styles.ctaDescription}>
                Contact us to discuss your project requirements and get a
                personalized quote.
              </Text>
              <div className={styles.ctaButtons}>
                <Link href='/contact' className={styles.secondaryButton}>
                  Contact Us
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Layout>
  );
}
