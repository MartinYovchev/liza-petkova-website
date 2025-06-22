'use client';

import { services } from '../constants';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import Image from '@/components/Image/Image';
import Link from 'next/link';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import { HoverScale } from '@/components/Animations/HoverScale/HoverScale';
import styles from './ServiceDetails.module.scss';

interface ServiceDetailsProps {
  id: string;
}

export default function ServiceDetails({ id }: ServiceDetailsProps) {
  const service = services.find(s => s.id.toString() === id);

  if (!service) {
    return (
      <div className={styles.notFound}>
        <FadeIn direction='up'>
          <Title level='h2'>Service Not Found</Title>
          <Text as='p'>The requested service could not be found.</Text>
          <Link href='/professional/services' className={styles.backButton}>
            Back to Services
          </Link>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className={styles.serviceDetails}>
      <FadeIn direction='up' className={styles.serviceHeader}>
        {service.popular && (
          <div className={styles.popularBadge}>Most Popular</div>
        )}
        <Title level='h1' className={styles.serviceTitle}>
          {service.title}
        </Title>
        <Text as='p' className={styles.serviceDescription}>
          {service.description}
        </Text>
      </FadeIn>

      <div className={styles.serviceContent}>
        <FadeIn direction='right' className={styles.serviceImage}>
          <HoverScale scale={1.02}>
            <Image
              src={service.image || '/placeholder.svg'}
              alt={service.title}
              width={800}
              height={400}
            />
          </HoverScale>
        </FadeIn>

        <div className={styles.serviceInfo}>
          <FadeIn direction='left' delay={0.2}>
            <div className={styles.infoSection}>
              <Title level='h3'>Key Features</Title>
              <ul className={styles.featuresList}>
                {service.features.map((feature, index) => (
                  <li key={index} className={styles.feature}>
                    <span className={styles.featureCheck}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction='left' delay={0.3}>
            <div className={styles.infoSection}>
              <Title level='h3'>Duration</Title>
              <div className={styles.duration}>
                <span className={styles.durationIcon}>⏱️</span>
                {service.duration}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction='left' delay={0.4}>
            <div className={styles.actions}>
              <Link
                href='/professional/contact'
                className={styles.primaryButton}
              >
                Get Information
              </Link>
              <Link href='/contact' className={styles.secondaryButton}>
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
