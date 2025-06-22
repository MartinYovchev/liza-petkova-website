import { achievements } from '../constants/achievements';
import styles from '../About.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';

export const Achievements = () => {
  return (
    <div className={styles.achievements}>
      <div className={styles.achievementsContent}>
        <Title level='h2' className={styles.sectionTitle}>
          Impact & Recognition
        </Title>
        <div className={styles.achievementsGrid}>
          {achievements.map((achievement, index) => (
            <div key={index} className={styles.achievementCard}>
              <div className={styles.achievementIcon}>{achievement.icon}</div>
              <Title level='h3' className={styles.achievementTitle}>
                {achievement.title}
              </Title>
              <div className={styles.achievementDescription}>
                <Text as='p'>{achievement.description}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
