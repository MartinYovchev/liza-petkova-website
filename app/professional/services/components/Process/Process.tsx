import Title from "@/components/Typography/Title";
import Text from "@/components/Typography/Text";
import styles from "./Process.module.scss";
import { processSteps } from "../../constants";

export const Process = () => {
  return (
    <div className={styles.process}>
      <div className={styles.processContent}>
        <Title level="h2" className={styles.processTitle}>
          Our Service Process
        </Title>
        <div className={styles.processSteps}>
          {processSteps.map((step) => (
            <div key={step.number} className={styles.processStep}>
              <div className={styles.stepNumber}>{step.number}</div>
              <Title level="h4" className={styles.stepTitle}>
                {step.title}
              </Title>
              <Text as="p" className={styles.stepDescription}>
                {step.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
