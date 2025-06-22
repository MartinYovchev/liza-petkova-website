import { journey } from '../constants/journey';
import styles from '../About.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import Image from 'next/image';

export const Journey = () => {
  return (
    <div className={styles.journey}>
      <div className={styles.journeyContent}>
        <div className={styles.sectionHeader}>
          <Title level='h2' className={styles.sectionTitle}>
            My Creative Journey
          </Title>
          <Text as='p' className={styles.sectionSubtitle}>
            From discovering my own voice to helping others find theirs
          </Text>
        </div>

        <div className={styles.journeyTimeline}>
          {journey.map((item, index) => (
            <div key={index} className={styles.journeyItem}>
              <div className={styles.journeyImage}>
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  width={250}
                  height={300}
                />
              </div>
              <div className={styles.journeyContent}>
                <div className={styles.journeyYear}>{item.year}</div>
                <Title level='h3' className={styles.journeyTitle}>
                  {item.title}
                </Title>
                <div className={styles.journeyDescription}>
                  <Text as='p'>{item.description}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
