import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import RevealText from '@/components/Animations/RevealText/RevealText';
import Text from '@/components/Typography/Text';
import styles from '../../ArtisticHome.module.scss';
import Title from '@/components/Typography/Title';
import { useTranslation } from '@/contexts/TranslationContext';

export default function ApproachSection({
  approachItems,
}: {
  approachItems: any[];
}) {
  const { t } = useTranslation();

  return (
    <div className={styles.services}>
      <div className={styles.servicesContent}>
        <FadeIn direction='up' className={styles.sectionHeader}>
          <RevealText delay={0.2} className={styles.sectionTitle}>
            <Title level='h2'>{t('approachSectionTitle')}</Title>
          </RevealText>
          <Text as='p' className={styles.sectionSubtitle}>
            {t('approachSectionSubtitle')}
          </Text>
        </FadeIn>

        <div className={styles.servicesGrid}>
          {approachItems.map((item, index) => (
            <FadeIn key={item.title} delay={0.3 + index * 0.1} direction='up'>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{item.icon}</div>
                <Title level='h3' className={styles.serviceTitle}>
                  {item.title}
                </Title>
                <Text as='p' className={styles.serviceDescription}>
                  {item.description}
                </Text>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
