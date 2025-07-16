'use client';
import { FadeIn } from '@/components/Animations/FadeIn/FadeIn';
import styles from './StatsSection.module.scss';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';

type StatsSectionProps = {
  stats: {
    number: string;
    label: string;
  }[];
};

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className={styles.stats}>
      <div className={styles.statsContainer}>
        <FadeIn delay={0.2} direction='up' className={styles.sectionHeader}>
          <Title className={styles.sectionTitle}>
            Trusted by Industry Leaders
          </Title>
          <Text as='p' className={styles.sectionSubtitle}>
            Our track record speaks for itself
          </Text>
        </FadeIn>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={0.4 + index * 0.15} direction='up'>
              <div className={styles.statItem}>
                <Text as='div' className={styles.statNumber}>
                  {stat.number}
                </Text>
                <Text as='div' className={styles.statLabel}>
                  {stat.label}
                </Text>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
