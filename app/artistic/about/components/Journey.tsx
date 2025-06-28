import styles from '../About.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

export const Journey = () => {
  const { t } = useTranslation();

  const journey = [
    {
      year: t('aboutJourneyEarlyYears'),
      title: t('aboutJourneyEarlyTitle'),
      description: t('aboutJourneyEarlyDesc'),
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      year: '2015',
      title: t('aboutJourney2015Title'),
      description: t('aboutJourney2015Desc'),
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      year: '2018',
      title: t('aboutJourney2018Title'),
      description: t('aboutJourney2018Desc'),
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      year: '2020',
      title: t('aboutJourney2020Title'),
      description: t('aboutJourney2020Desc'),
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      year: '2022',
      title: t('aboutJourney2022Title'),
      description: t('aboutJourney2022Desc'),
      image: '/placeholder.svg?height=200&width=300',
    },
    {
      year: t('aboutJourneyToday'),
      title: t('aboutJourneyTodayTitle'),
      description: t('aboutJourneyTodayDesc'),
      image: '/placeholder.svg?height=200&width=300',
    },
  ];

  return (
    <div className={styles.journey}>
      <div className={styles.journeyContent}>
        <div className={styles.sectionHeader}>
          <Title level='h2' className={styles.sectionTitle}>
            {t('aboutJourneyTitle')}
          </Title>
          <Text as='p' className={styles.sectionSubtitle}>
            {t('aboutJourneySubtitle')}
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
              <div className={styles.content}>
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
