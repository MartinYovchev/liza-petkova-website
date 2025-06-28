'use client';
import styles from './HomePage.module.scss';
import Link from 'next/link';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import { Scale } from '@/components/Animations/Scale/Scale';
import Image from '@/components/Image/Image';
import Text from '@/components/Typography/Text';
import { Button } from '@/components/Button/Button';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '@/contexts/TranslationContext';

export default function HomePage() {
  const { t } = useTranslation();
  const { setTheme } = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles.splitContainer}>
        <div className={`${styles.side} ${styles.professional}`}>
          <Link href='/professional' className={styles.link}>
            <div className={styles.overlay}>
              <FadeIn delay={0.4} className={styles.content}>
                <Scale className={styles.title}>
                  {t('homePageProfessionalTitle')}
                </Scale>
                <Text as='p' className={styles.subtitle}>
                  {t('homePageProfessionalSubtitle')}
                </Text>
                <Button
                  className={styles.cta}
                  variant='outline'
                  onClick={() => {
                    setTheme('professional');
                  }}
                >
                  {t('homePageProfessionalButton')}
                </Button>
              </FadeIn>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src='/placeholder.svg?height=800&width=600'
                alt='Professional workspace'
                className={styles.image}
                width={600}
                height={800}
              />
            </div>
          </Link>
        </div>

        <div className={`${styles.side} ${styles.artistic}`}>
          <Link href='/artistic' className={styles.link}>
            <div className={styles.overlay}>
              <FadeIn delay={0.6} className={styles.content}>
                <Scale className={styles.title}>
                  {t('homePageArtisticTitle')}
                </Scale>

                <Text as='p' className={styles.subtitle}>
                  {t('homePageArtisticSubtitle')}
                </Text>
                <Button
                  className={styles.cta}
                  variant='outline'
                  onClick={() => {
                    setTheme('artistic');
                  }}
                >
                  {t('homePageArtisticButton')}
                </Button>
              </FadeIn>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src='/placeholder.svg?height=800&width=600'
                alt='Artistic workspace'
                className={styles.image}
                width={600}
                height={800}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
