import { CERTIFICATIONS } from '../constants';
import styles from '../ProfessionalAbout.module.scss';
import Text from '@/components/Typography/Text';
import Title from '@/components/Typography/Title';

export default function Certifications() {
  return (
    <div className={styles.certifications}>
      <div className={styles.certificationsContent}>
        <Title level='h2' className={styles.sectionTitle}>
          Certifications & Memberships
        </Title>
        <div className={styles.certificationsGrid}>
          {CERTIFICATIONS.map((cert, index) => (
            <div key={index} className={styles.certCard}>
              <div className={styles.certIcon}>{cert.icon}</div>
              <Title level='h4' className={styles.certName}>
                {cert.name}
              </Title>
              <Text as='p' className={styles.certDescription}>
                {cert.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
