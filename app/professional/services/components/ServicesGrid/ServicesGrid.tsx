import Link from 'next/link';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import Image from '@/components/Image/Image';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import { HoverScale } from '@/components/Animations/HoverScale/HoverScale';
import styles from './ServicesGrid.module.scss';
import { Service } from '../../types';

interface ServicesGridProps {
  services: Service[];
  selectedCategory: string;
  categories: { id: string; name: string }[];
}

export const ServicesGrid = ({
  services,
  selectedCategory,
  categories,
}: ServicesGridProps) => {
  return (
    <div className={styles.servicesMain}>
      <div className={styles.servicesHeader}>
        <Title level='h2' className={styles.servicesTitle}>
          {selectedCategory === 'all'
            ? 'All Services'
            : categories.find(c => c.id === selectedCategory)?.name}
        </Title>
        <Text as='p' className={styles.servicesCount}>
          {services.length} service{services.length !== 1 ? 's' : ''} available
        </Text>
      </div>

      <div className={styles.servicesGrid}>
        {services.map(service => (
          <FadeIn key={service.id} direction='up'>
            <HoverScale scale={1.02}>
              <div className={styles.serviceCard}>
                {service.popular && (
                  <div className={styles.popularBadge}>Most Popular</div>
                )}

                <div className={styles.serviceImage}>
                  <Image
                    src={service.image || '/placeholder.svg'}
                    alt={service.title}
                    width={300}
                    height={200}
                  />
                </div>

                <div className={styles.serviceContent}>
                  <Title level='h3' className={styles.serviceTitle}>
                    {service.title}
                  </Title>
                  <Text as='p' className={styles.serviceDescription}>
                    {service.description}
                  </Text>

                  <ul className={styles.serviceFeatures}>
                    {service.features.map((feature: string, idx: number) => (
                      <li key={idx} className={styles.serviceFeature}>
                        <span className={styles.featureCheck}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.serviceDetails}>
                    <div className={styles.serviceDuration}>
                      ⏱️ {service.duration}
                    </div>
                  </div>

                  <div className={styles.serviceActions}>
                    <Link
                      href={`/professional/services/${service.id}`}
                      className={styles.serviceButton}
                    >
                      View Details
                    </Link>
                    <Link href='/contact' className={styles.learnMoreBtn}>
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </HoverScale>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
