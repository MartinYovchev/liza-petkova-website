import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import RevealText from '@/components/Animations/RevealText/RevealText';
import Text from '@/components/Typography/Text';
import styles from '../../ArtisticHome.module.scss';
import Title from '@/components/Typography/Title';
import Link from 'next/link';

export type Offering = {
  title: string;
  description: string;
  features: string[];
  price: string;
  link: string;
};

export default function OfferingSection({
  offeringsData,
}: {
  offeringsData: Offering[];
}) {
  return (
    <div className={styles.services}>
      <div className={styles.servicesContent}>
        <FadeIn direction='up' className={styles.sectionHeader}>
          <RevealText delay={0.2}>
            <Title level='h2' className={styles.sectionTitle}>
              Creative Offerings
            </Title>
          </RevealText>
          <Text as='p' className={styles.sectionSubtitle}>
            Transformative experiences tailored to different stages of your
            creative journey
          </Text>
        </FadeIn>

        <div className={styles.servicesGrid}>
          {offeringsData.map((offering, index) => (
            <FadeIn
              key={offering.title}
              delay={0.3 + index * 0.15}
              direction='up'
            >
              <div className={styles.serviceCard}>
                <Title level='h3' className={styles.serviceTitle}>
                  {offering.title}
                </Title>
                <Text as='p' className={styles.serviceDescription}>
                  {offering.description}
                </Text>
                <ul className={styles.serviceFeatures}>
                  {offering.features.map((feature, i) => (
                    <li key={i} className={styles.serviceFeature}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
