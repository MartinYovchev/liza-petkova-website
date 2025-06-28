import Title from '@/components/Typography/Title';
import styles from '../About.module.scss';
import Text from '@/components/Typography/Text';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

export const PersonalTouch = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.personal}>
      <div className={styles.personalContent}>
        <div className={styles.personalLeft}>
          <Image
            src='/placeholder.svg?height=500&width=400'
            alt={t('aboutPersonalImageAlt')}
            className={styles.personalImage}
            width={500}
            height={400}
          />
        </div>
        <div className={styles.personalRight}>
          <Title level='h2' className={styles.sectionTitle}>
            {t('aboutPersonalTitle')}
          </Title>
          <div className={styles.personalText}>
            <Text as='p'>{t('aboutPersonalDesc1')}</Text>
            <Text as='p'>{t('aboutPersonalDesc2')}</Text>
            <Text as='p'>{t('aboutPersonalDesc3')}</Text>
          </div>
          <div className={styles.personalQualities}>
            <div className={styles.quality}>
              <Text as='span' className={styles.qualityIcon}>
                🌿
              </Text>
              <Text as='span'>{t('aboutPersonalQuality1')}</Text>
            </div>
            <div className={styles.quality}>
              <Text as='span' className={styles.qualityIcon}>
                📚
              </Text>
              <Text as='span'>{t('aboutPersonalQuality2')}</Text>
            </div>
            <div className={styles.quality}>
              <Text as='span' className={styles.qualityIcon}>
                🐱
              </Text>
              <Text as='span'>{t('aboutPersonalQuality3')}</Text>
            </div>
            <div className={styles.quality}>
              <Text as='span' className={styles.qualityIcon}>
                🎭
              </Text>
              <Text as='span'>{t('aboutPersonalQuality4')}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
