import Link from 'next/link';
import styles from '../About.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { useTranslation } from '@/contexts/TranslationContext';

export const CTA = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.cta}>
      <div className={styles.ctaContent}>
        <Title level='h2' className={styles.ctaTitle}>
          {t('aboutCtaTitle')}
        </Title>
        <Text as='p' className={styles.ctaSubtitle}>
          {t('aboutCtaSubtitle')}
        </Text>
        <div className={styles.ctaActions}>
          <Link href='/contact' className={styles.ctaButton}>
            {t('aboutCtaButton')}
          </Link>
        </div>
      </div>
    </div>
  );
};
