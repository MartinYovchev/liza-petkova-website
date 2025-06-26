import Link from 'next/link';
import styles from '../About.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';

export const CTA = () => {
  return (
    <div className={styles.cta}>
      <div className={styles.ctaContent}>
        <Title level='h2' className={styles.ctaTitle}>
          Ready to Begin Your Creative Journey?
        </Title>
        <Text as='p' className={styles.ctaSubtitle}>
          Let's explore your unique creative potential together and unlock the
          artist within you
        </Text>
        <div className={styles.ctaActions}>
          <Link href='/contact' className={styles.ctaButton}>
            Book a Discovery Call
          </Link>
        </div>
      </div>
    </div>
  );
};
