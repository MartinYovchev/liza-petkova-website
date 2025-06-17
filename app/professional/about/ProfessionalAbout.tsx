"use client";
import styles from "./ProfessionalAbout.module.scss";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Timeline from "./components/Timeline";
import Team from "./components/Team";
import Certifications from "./components/Certifications";
import Technology from "./components/Technology";
import CTA from "./components/CTA";
import { FadeIn } from "@/components/Animations/FadeIn/FadeIn";
import StaggerChildren from "@/components/Animations/StaggerChildren/StaggerChildren";
import ParallaxSection from "@/components/Animations/ParallaxSection/ParallaxSection";
import { HoverScale } from "@/components/Animations/HoverScale/HoverScale";

export default function ProfessionalAbout() {
  return (
    <div className={styles.container}>
      <FadeIn delay={0.2}>
        <Hero />
      </FadeIn>

      <ParallaxSection speed={0.2}>
        <Mission />
      </ParallaxSection>

      <StaggerChildren>
        <Timeline />
      </StaggerChildren>

      <FadeIn delay={0.4}>
        <Team />
      </FadeIn>

      <ParallaxSection speed={0.1}>
        <Certifications />
      </ParallaxSection>

      <StaggerChildren>
        <Technology />
      </StaggerChildren>

      <FadeIn delay={0.6}>
        <CTA />
      </FadeIn>
    </div>
  );
}
