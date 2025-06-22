import Link from 'next/link';
import styles from '../ProfessionalAbout.module.scss';
import Text from '@/components/Typography/Text';
import Title from '@/components/Typography/Title';

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
          <Link href='/professional/contact' className={styles.ctaButton}>
            Start Your Project
          </Link>
          <Link href='/professional/services' className={styles.ctaSecondary}>
            View Our Services
          </Link>
        </div>
      </div>
    </div>
  );
}
