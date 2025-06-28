import styles from '../About.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { useTranslation } from '@/contexts/TranslationContext';

export const Values = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: '🌱',
      title: t('aboutValuesAuthentic'),
      description: t('aboutValuesAuthenticDesc'),
    },
    {
      icon: '💫',
      title: t('aboutValuesTransformative'),
      description: t('aboutValuesTransformativeDesc'),
    },
    {
      icon: '🤝',
      title: t('aboutValuesCommunity'),
      description: t('aboutValuesCommunityDesc'),
    },
    {
      icon: '🎨',
      title: t('aboutValuesHolistic'),
      description: t('aboutValuesHolisticDesc'),
    },
  ];

  return (
    <div className={styles.values}>
      <div className={styles.valuesContent}>
        <div className={styles.sectionHeader}>
          <Title level='h2' className={styles.sectionTitle}>
            {t('aboutValuesTitle')}
          </Title>
          <Text as='p' className={styles.sectionSubtitle}>
            {t('aboutValuesSubtitle')}
          </Text>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueIcon}>{value.icon}</div>
              <Title level='h3' className={styles.valueTitle}>
                {value.title}
              </Title>
              <Text as='p' className={styles.valueDescription}>
                {value.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
