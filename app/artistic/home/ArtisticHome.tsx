'use client';
// import { useLanguage } from "../components/language-context";
import HeroSection from './components/HeroSection/HeroSection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import styles from './ArtisticHome.module.scss';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import {
  heroData,
  approachItems,
  testimonialsData,
  offeringsData,
} from './constants';
import ApproachSection from './components/ApproachSection/ApproachSection';
import OfferingSection from './components/OfferingsSection/OfferingSection';
import CTASection from './components/CTASection/CTASection';
import { Layout } from '@/components/Layout/Layout';

export default function ArtisticHome() {
  // const { t } = useLanguage();

  return (
    <Layout>
      <div className={styles.container}>
        <FadeIn delay={0.2}>
          <HeroSection {...heroData} />
        </FadeIn>

        <ApproachSection approachItems={approachItems} />

        <TestimonialsSection testimonials={testimonialsData} />

        <OfferingSection offeringsData={offeringsData} />

        <CTASection />
      </div>
    </Layout>
  );
}
