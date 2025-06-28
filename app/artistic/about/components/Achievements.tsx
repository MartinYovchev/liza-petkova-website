import styles from '../About.module.scss';
import Title from '@/components/Typography/Title';
import { useTranslation } from '@/contexts/TranslationContext';
import Text from '@/components/Typography/Text';

export const Achievements = () => {
  const { t } = useTranslation();
  const achievements = [
    {
      title: t('aboutAchievements1Title'),
      description: t('aboutAchievements1Desc'),
      icon: '👥',
    },
    {
      title: t('aboutAchievements2Title'),
      description: t('aboutAchievements2Desc'),
      icon: '🎓',
    },
    {
      title: t('aboutAchievements3Title'),
      description: t('aboutAchievements3Desc'),
      icon: '📰',
    },
    {
      title: t('aboutAchievements4Title'),
      description: t('aboutAchievements4Desc'),
      icon: '🎤',
    },
  ];

  return (
    <div className={styles.achievements}>
      <div className={styles.achievementsContent}>
        <Title level='h2' className={styles.sectionTitle}>
          {t('aboutAchievementsTitle')}
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
