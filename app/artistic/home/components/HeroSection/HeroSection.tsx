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
          <FadeIn
            delay={0.3}
            direction='right'
            className={styles.heroImageContainer}
          >
            <div className={styles.heroImage}>
              <div className={styles.heroImage}>
                <Image
                  src={image.src || '/placeholder.svg'}
                  alt={image.alt}
                  className={styles.heroImage}
                  width={100}
                  height={100}
                />
              </div>

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
            </div>
          </FadeIn>

          <div className={styles.heroContent}>
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
                  <Text as='p' key={index}>
                    {paragraph}
                  </Text>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.8} direction='up'>
              <div className={styles.heroActions}>
                <div>
                  <Link href={primaryCTA.href} className={styles.ctaPrimary}>
                    {primaryCTA.text}
                  </Link>
                </div>

                <div>
                  <Link
                    href={secondaryCTA.href}
                    className={styles.ctaSecondary}
                  >
                    {secondaryCTA.text}
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={1} direction='up'>
              <div className={styles.heroStats}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.heroStat}>
                    <Text as='p' className={styles.statNumber}>
                      {stat.number}
                    </Text>
                    <Text as='p' className={styles.statLabel}>
                      {stat.label}
                    </Text>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
