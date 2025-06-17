import { values } from "../constants/values";
import styles from "../About.module.scss";
import Title from "@/components/Typography/Title";
import Text from "@/components/Typography/Text";

export const Values = () => {
  return (
    <div className={styles.values}>
      <div className={styles.valuesContent}>
        <div className={styles.sectionHeader}>
          <Title level="h2" className={styles.sectionTitle}>
            My Core Values
          </Title>
          <Text as="p" className={styles.sectionSubtitle}>
            The principles that guide my approach to creativity and personal
            transformation
          </Text>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueIcon}>{value.icon}</div>
              <Title level="h3" className={styles.valueTitle}>
                {value.title}
              </Title>
              <Text as="p" className={styles.valueDescription}>
                {value.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
