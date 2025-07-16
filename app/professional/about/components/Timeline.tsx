import { TIMELINE } from '../constants';
import styles from '../ProfessionalAbout.module.scss';
import Text from '@/components/Typography/Text';
import Title from '@/components/Typography/Title';

export default function Timeline() {
  return (
    <div className={styles.timeline}>
      <div className={styles.timelineContent}>
        <Title level='h2' className={styles.sectionTitle}>
          Our Journey
        </Title>
        <div className={styles.timelineItems}>
          {TIMELINE.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <Text as='div' className={styles.timelineYear}>
                {item.year}
              </Text>
              <div className={styles.timelineDetails}>
                <Title level='h4' className={styles.timelineTitle}>
                  {item.title}
                </Title>
                <Text as='p' className={styles.timelineDescription}>
                  {item.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
