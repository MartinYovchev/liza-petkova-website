'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import RevealText from '@/components/Animations/RevealText/RevealText';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import styles from '../../ArtisticHome.module.scss';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string[];
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  stats: {
    number: string;
    label: string;
    icon: string;
  }[];
  image: {
    src: string;
    alt: string;
  };
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  stats,
  image,
}: HeroSectionProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <div className='mb-6'>
            <RevealText direction='up' delay={0.2}>
              <h1
                className={styles.heroTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </RevealText>
            <FadeIn delay={0.4} direction='up'>
              <Text as='p' className={styles.heroSubtitle}>
                {subtitle}
              </Text>
            </FadeIn>
          </div>

          <FadeIn delay={0.6} direction='up'>
            <div className={styles.heroDescription}>
              {description.map((paragraph, index) => (
                <Text as='p' key={index} className='mb-4 text-gray-700'>
                  {paragraph}
                </Text>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.8} direction='up'>
            <div className={styles.heroActions}>
              <Link href={primaryCTA.href} className={styles.ctaPrimary}>
                {primaryCTA.text}
              </Link>
              <Link href={secondaryCTA.href} className={styles.ctaSecondary}>
                {secondaryCTA.text}
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className={styles.heroRight}>
          <FadeIn
            delay={0.3}
            direction='left'
            className={styles.heroImageContainer}
          >
            <Image
              src={image.src || '/placeholder.svg'}
              alt={image.alt}
              className={styles.heroImage}
              width={500}
              height={600}
              priority
            />

            <div className={styles.floatingCard}>
              <div className={styles.cardIcon}>💝</div>
              <div>
                <Title level='h4' className={styles.cardTitle}>
                  Personalized Approach
                </Title>
                <Text as='p' className={styles.cardDesc}>
                  Every journey is unique
                </Text>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
