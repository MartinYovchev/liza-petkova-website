import styles from '../ProfessionalAbout.module.scss';
import Text from '@/components/Typography/Text';
import Title from '@/components/Typography/Title';
import { Button } from '@/components/Button/Button';

export default function CTA() {
  return (
    <div className={styles.cta}>
      <div className={styles.ctaContent}>
        <Title level='h2' className={styles.ctaTitle}>
          Ready to Work with the Best?
        </Title>
        <Text as='p' className={styles.ctaSubtitle}>
          Partner with our experienced team for your next geodetic project
        </Text>
        <div className={styles.ctaActions}>
          <Button
            href='/professional/contact'
            variant='primary'
            className={styles.ctaButton}
          >
            Start Your Project
          </Button>
          <Button
            href='/professional/services'
            variant='secondary'
            className={styles.ctaSecondary}
          >
            View Our Services
          </Button>
        </div>
      </div>
    </div>
  );
}
