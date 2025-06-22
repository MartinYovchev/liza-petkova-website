import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import RevealText from '@/components/Animations/RevealText/RevealText';
import Title from '@/components/Typography/Title';
import styles from '../../ArtisticHome.module.scss';
import Text from '@/components/Typography/Text';
import Link from 'next/link';

export default function CTASection() {
  return (
    <FadeIn>
      <div className={styles.cta}>
        <div className={styles.ctaContent}>
          <RevealText direction='up'>
            <Title level='h2' className={styles.ctaTitle}>
              Ready to Begin Your Creative Journey?
            </Title>
          </RevealText>
          <Text as='p' className={styles.ctaSubtitle}>
            Let's explore your unique creative potential together and unlock the
            artist within you
          </Text>
          <div className={styles.ctaActions}>
            <Link href='/artistic/contact' className={styles.ctaButton}>
              Book Your Discovery Call
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
