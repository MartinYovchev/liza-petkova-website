import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { Button } from '@/components/Button/Button';
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
          <Button
            href='/contact'
            variant='primary'
            className={styles.ctaButton}
          >
            Contact Us Today
          </Button>
          <Button
            href='tel:+1234567890'
            variant='outline'
            className={styles.ctaPhone}
          >
            📞 (123) 456-7890
          </Button>
        </div>
      </div>
    </div>
  );
};
