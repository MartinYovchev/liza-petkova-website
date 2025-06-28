import Link from 'next/link';
import styles from '../About.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <div className={styles.heroImageContainer}>
            <Image
              src='/placeholder.svg?height=600&width=500'
              alt={t('aboutHeroImageAlt')}
              className={styles.heroImage}
              width={500}
              height={600}
            />
            <div className={styles.floatingQuote}>
              <Text as='p'>{t('aboutHeroQuote')}</Text>
            </div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <h1
            className={styles.heroTitle}
            dangerouslySetInnerHTML={{ __html: t('aboutHeroTitle') }}
          />
          <Text as='p' className={styles.heroSubtitle}>
            {t('aboutHeroSubtitle')}
          </Text>
          <div className={styles.heroDescription}>
            <Text as='p'>{t('aboutHeroDescription1')}</Text>
            <Text as='p'>{t('aboutHeroDescription2')}</Text>
          </div>
          <div className={styles.heroActions}>
            <Link href='/artistic/contact' className={styles.ctaPrimary}>
              {t('aboutHeroWorkWithMe')}
            </Link>
            <Link href='/artistic/progress' className={styles.ctaSecondary}>
              {t('aboutHeroViewWork')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
