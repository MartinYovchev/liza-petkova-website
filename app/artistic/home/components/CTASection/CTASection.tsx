import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import RevealText from '@/components/Animations/RevealText/RevealText';
import Title from '@/components/Typography/Title';
import styles from '../../ArtisticHome.module.scss';
import Text from '@/components/Typography/Text';
import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <FadeIn>
      <div className={styles.cta}>
        <div className={styles.ctaContent}>
          <RevealText direction='up'>
            <Title level='h2' className={styles.ctaTitle}>
              {t('ctaSectionTitle')}
            </Title>
          </RevealText>
          <Text as='p' className={styles.ctaSubtitle}>
            {t('ctaSectionSubtitle')}
          </Text>
          <div className={styles.ctaActions}>
            <Link href='/artistic/contact' className={styles.ctaButton}>
              {t('ctaSectionButton')}
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
