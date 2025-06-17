"use client";
import { FadeIn } from "@/components/Animations/FadeIn/FadeIn";
import { useRef, useEffect, useState } from "react";
import styles from "./StatsSection.module.scss";
import Title from "@/components/Typography/Title";
import Text from "@/components/Typography/Text";

type StatsSectionProps = {
  stats: {
    number: string;
    label: string;
  }[];
};

export default function StatsSection({ stats }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className={styles.stats}>
      <div className={styles.statsContainer}>
        <FadeIn delay={0.2} direction="up" className={styles.sectionHeader}>
          <Title className={styles.sectionTitle}>
            Trusted by Industry Leaders
          </Title>
          <Text as="p" className={styles.sectionSubtitle}>
            Our track record speaks for itself
          </Text>
        </FadeIn>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={0.4 + index * 0.1} direction="up">
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
