'use client';
// import { useLanguage } from "../components/language-context";
import HeroSection from './components/HeroSection/HeroSection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import styles from './ArtisticHome.module.scss';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import ApproachSection from './components/ApproachSection/ApproachSection';
import OfferingSection from './components/OfferingsSection/OfferingSection';
import CTASection from './components/CTASection/CTASection';
import { Layout } from '@/components/Layout/Layout';
import { useTranslation } from '@/contexts/TranslationContext';

export default function ArtisticHome() {
  const { t } = useTranslation();
  const approachItems = [
    {
      icon: '🔍',
      title: t('approachDiscoveryTitle'),
      description: t('approachDiscoveryDescription'),
    },
    {
      icon: '🌱',
      title: t('approachNourishmentTitle'),
      description: t('approachNourishmentDescription'),
    },
    {
      icon: '✨',
      title: t('approachTransformationTitle'),
      description: t('approachTransformationDescription'),
    },
    {
      icon: '🚀',
      title: t('approachBloomingTitle'),
      description: t('approachBloomingDescription'),
    },
  ];

  const heroData = {
    title: t('artisticHeroTitle'),
    subtitle: t('artisticHeroSubtitle'),
    description: [t('artisticHeroDescription1'), t('artisticHeroDescription2')],
    primaryCTA: {
      text: t('artisticHeroPrimaryCTA'),
      href: '/contact',
    },
    secondaryCTA: {
      text: t('artisticHeroSecondaryCTA'),
      href: '/artistic/progress',
    },
    stats: [
      { number: '7+', label: t('artisticHeroStatsYears'), icon: '🎨' },
      { number: '200+', label: t('artisticHeroStatsLives'), icon: '✨' },
      { number: '50+', label: t('artisticHeroStatsWorkshops'), icon: '🚀' },
    ],
    image: {
      src: '/images/artistic-hero.jpg',
      alt: t('artisticHeroImageAlt'),
    },
  };
  const offeringsData = [
    {
      title: t('offeringIndividualTitle'),
      description: t('offeringIndividualDescription'),
      features: [
        t('offeringIndividualFeature1'),
        t('offeringIndividualFeature2'),
      ],
      price: t('offeringIndividualPrice'),
      link: '/artistic/contact',
    },
    {
      title: t('offeringGroupTitle'),
      description: t('offeringGroupDescription'),
      features: [
        t('offeringGroupFeature1'),
        t('offeringGroupFeature2'),
        t('offeringGroupFeature3'),
      ],
      price: t('offeringGroupPrice'),
      link: '/artistic/contact',
    },
    {
      title: t('offeringRetreatsTitle'),
      description: t('offeringRetreatsDescription'),
      features: [
        t('offeringRetreatsFeature1'),
        t('offeringRetreatsFeature2'),
        t('offeringRetreatsFeature3'),
      ],
      price: t('offeringRetreatsPrice'),
      link: '/artistic/contact',
    },
  ];
  const testimonialsData = [
    {
      quote: t('testimonial1Quote'),
      author: t('testimonial1Author'),
      role: t('testimonial1Role'),
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      quote: t('testimonial2Quote'),
      author: t('testimonial2Author'),
      role: t('testimonial2Role'),
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      quote: t('testimonial3Quote'),
      author: t('testimonial3Author'),
      role: t('testimonial3Role'),
      image: '/placeholder.svg?height=100&width=100',
    },
  ];

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
