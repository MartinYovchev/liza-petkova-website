import styles from '../ProfessionalAbout.module.scss';
import Text from '@/components/Typography/Text';
import Title from '@/components/Typography/Title';

export default function Mission() {
  return (
    <div className={styles.mission}>
      <div className={styles.missionContent}>
        <div className={styles.missionItem}>
          <div className={styles.missionIcon}>🎯</div>
          <Title level='h3'>Our Mission</Title>
          <Text as='p'>
            To provide unparalleled geodetic services that enable our clients to
            build with confidence, leveraging cutting-edge technology and
            decades of expertise.
          </Text>
        </div>
        <div className={styles.missionItem}>
          <div className={styles.missionIcon}>👁️</div>
          <Title level='h3'>Our Vision</Title>
          <Text as='p'>
            To be the leading geodetic services provider, setting industry
            standards for precision, innovation, and client satisfaction in the
            digital age.
          </Text>
        </div>
        <div className={styles.missionItem}>
          <div className={styles.missionIcon}>⚖️</div>
          <Title level='h3'>Our Values</Title>
          <Text as='p'>
            Integrity, precision, innovation, and client-centricity guide every
            project we undertake, ensuring exceptional results and lasting
            partnerships.
          </Text>
        </div>
      </div>
    </div>
  );
}
