"use client";
import Link from "next/link";
import { FadeIn } from "@/components/Animations/FadeIn/FadeIn";
import RevealText from "@/components/Animations/RevealText/RevealText";
import { GradientText } from "@/components/Animations/GradientText/GradientText";
import styles from "./HeroSection.module.scss";
import Title from "@/components/Typography/Title";
import Text from "@/components/Typography/Text";
import Image from "@/components/Image/Image";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  features: string[];
  image: {
    src: string;
    alt: string;
  };
  stats: {
    number: string;
    label: string;
  };
};

export default function HeroSection({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  features,
  image,
  stats,
}: HeroSectionProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <div className="mb-6">
              <RevealText direction="right" delay={0.2}>
                <Title noStyles={true} className={styles.title}>
                  {title}
                </Title>
              </RevealText>
              <FadeIn delay={0.4} direction="up">
                <Text as="p" noStyles={true} className={styles.subtitle}>
                  {subtitle}
                </Text>
              </FadeIn>
            </div>

            <FadeIn delay={0.6} direction="up">
              <div className={styles.featuresContainer}>
                {features.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>
                    <Text
                      as="span"
                      noStyles={true}
                      className={styles.featureIcon}
                    >
                      ✓
                    </Text>
                    <Text
                      as="span"
                      noStyles={true}
                      className={styles.featureText}
                    >
                      {feature}
                    </Text>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.8} direction="up">
              <div className={styles.ctaContainer}>
                <Link href={primaryCTA.href} className={styles.primaryButton}>
                  {primaryCTA.text}
                </Link>
                <Link
                  href={secondaryCTA.href}
                  className={styles.secondaryButton}
                >
                  {secondaryCTA.text}
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.5} direction="left" className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <div className="rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className={styles.heroImage}
                  width={500}
                  height={500}
                />
              </div>

              <div className={styles.statsCard}>
                <div>
                  <GradientText className={styles.statsNumber}>
                    {stats.number}
                  </GradientText>
                  <div className={styles.statsLabel}>{stats.label}</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
