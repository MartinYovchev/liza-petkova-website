import Link from 'next/link';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import styles from './CTA.module.scss';

export const CTA = () => {
  return (
    <div className={styles.cta}>
      <div className={styles.ctaContent}>
        <Title level='h2' className={styles.ctaTitle}>
          Ready to Get Started?
        </Title>
        <Text as='p' className={styles.ctaSubtitle}>
          Contact our team today for a free consultation about your project
        </Text>
        <div className={styles.ctaActions}>
          <Link href='/contact' className={styles.ctaButton}>
            Contact Us Today
          </Link>
          <Link href='tel:+1234567890' className={styles.ctaPhone}>
            📞 (123) 456-7890
          </Link>
        </div>
      </div>
    </div>
  );
};
