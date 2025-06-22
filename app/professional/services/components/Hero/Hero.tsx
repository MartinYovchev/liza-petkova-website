import styles from './Hero.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import Image from '@/components/Image/Image';

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroOverlay}>
        <div className={styles.heroContent}>
          <Title level='h1' className={styles.heroTitle}>
            Professional Surveying Services
          </Title>
          <Text as='p' className={styles.heroSubtitle}>
            Comprehensive geodetic solutions backed by cutting-edge technology
            and decades of experience
          </Text>
          <div className={styles.heroFeatures}>
            <div className={styles.heroFeature}>
              <Text as='span' className={styles.featureIcon}>
                🎯
              </Text>
              <Text as='span'>Millimeter Precision</Text>
            </div>
            <div className={styles.heroFeature}>
              <Text as='span' className={styles.featureIcon}>
                ⚡
              </Text>
              <Text as='span'>Fast Turnaround</Text>
            </div>
            <div className={styles.heroFeature}>
              <Text as='span' className={styles.featureIcon}>
                🛡️
              </Text>
              <Text as='span'>Fully Licensed & Insured</Text>
            </div>
          </div>
        </div>
      </div>
      <Image
        src='/placeholder.svg'
        alt='Professional surveying equipment'
        className={styles.heroImage}
        width={1000}
        height={1000}
      />
    </div>
  );
};
