import Title from '@/components/Typography/Title';
import styles from '../About.module.scss';
import Text from '@/components/Typography/Text';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

export const Philosophy = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.philosophy}>
      <div className={styles.philosophyContent}>
        <div className={styles.philosophyLeft}>
          <Title level='h2' className={styles.sectionTitle}>
            {t('aboutPhilosophyTitle')}
          </Title>
          <div className={styles.philosophyText}>
            <Text as='p'>{t('aboutPhilosophyDesc1')}</Text>
            <Text as='p'>{t('aboutPhilosophyDesc2')}</Text>
            <Text as='p'>{t('aboutPhilosophyDesc3')}</Text>
          </div>
          <blockquote className={styles.quote}>
            {t('aboutPhilosophyQuote')}
            <cite>{t('aboutPhilosophyQuoteAuthor')}</cite>
          </blockquote>
        </div>
        <div className={styles.philosophyRight}>
          <div className={styles.philosophyImageGrid}>
            <Image
              src='/placeholder.svg'
              alt='Creative process'
              className={styles.philosophyImage}
              width={250}
              height={300}
            />
            <Image
              src='/placeholder.svg?height=250&width=300'
              alt='Art workshop'
              className={styles.philosophyImage}
              width={250}
              height={300}
            />
            <Image
              src='/placeholder.svg?height=250&width=300'
              alt='Personal transformation'
              className={styles.philosophyImage}
              width={250}
              height={300}
            />
            <Image
              src='/placeholder.svg?height=250&width=300'
              alt='Creative community'
              className={styles.philosophyImage}
              width={250}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
