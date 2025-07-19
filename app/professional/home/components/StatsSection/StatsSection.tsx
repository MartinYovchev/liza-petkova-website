'use client';
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
        <Title className={styles.sectionTitle}>
          Trusted by Industry Leaders
        </Title>
        <Text as='p' className={styles.sectionSubtitle}>
          Our track record speaks for itself
        </Text>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div className={styles.statItem}>
              <Text as='div' className={styles.statNumber}>
                {stat.number}
              </Text>
              <Text as='div' className={styles.statLabel}>
                {stat.label}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
