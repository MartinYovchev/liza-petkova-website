'use client';

import HeroSection from './components/HeroSection/HeroSection';
import StatsSection from './components/StatsSection/StatsSection';
import ServiceSection from './components/ServiceSection/ServiceSection';
import StaggerChildren from '@/components/Animations/StaggerChildren/StaggerChildren';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import ParallaxSection from '@/components/Animations/ParallaxSection/ParallaxSection';
import styles from './ProfessionalHomePage.module.scss';
import { heroData } from './components/HeroSection/constant';
import { statsData } from './components/StatsSection/constants';
import { serviceSectionData } from './components/ServiceSection/constants';
import { Layout } from '@/components/Layout/Layout';

export default function ProfessionalHomePage() {
  //   const { t } = useLanguage();

  return (
    <Layout>
      <div className={styles.container}>
        <FadeIn delay={0.2}>
          <HeroSection {...heroData} />
        </FadeIn>

        <ParallaxSection speed={0.2}>
          <StatsSection stats={statsData} />
        </ParallaxSection>

        <StaggerChildren>
          <ServiceSection {...serviceSectionData} />
        </StaggerChildren>
      </div>
    </Layout>
  );
}
