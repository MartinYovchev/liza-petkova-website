import Image from 'next/image';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import { GradientText } from '@/components/Animations/GradientText/GradientText';
import RevealText from '@/components/Animations/RevealText/RevealText';
import ParallaxSection from '@/components/Animations/ParallaxSection/ParallaxSection';
import styles from './TestimonialsSection.module.scss';
import { useTranslation } from '@/contexts/TranslationContext';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const { t } = useTranslation();

  return (
    <ParallaxSection speed={0.15}>
      <div className={styles.testimonials}>
        <div className={styles.testimonialsContent}>
          <RevealText className={styles.sectionHeader} direction='up'>
            <Title level='h2' className={styles.sectionTitle}>
              {t('testimonialsSectionTitle')}
            </Title>
          </RevealText>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={0.3 + index * 0.2} direction='up'>
                <div className={styles.testimonialCard}>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorImage}>
                      <Image
                        src={testimonial.image || '/placeholder.svg'}
                        alt={testimonial.author}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div>
                      <Title level='h4' className={styles.authorName}>
                        {testimonial.author}
                      </Title>
                      <Text as='p' className={styles.authorRole}>
                        {testimonial.role}
                      </Text>
                    </div>
                  </div>
                  <Text as='p' className={styles.testimonialText}>
                    "{testimonial.quote}"
                  </Text>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
}
