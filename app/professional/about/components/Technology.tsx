import { EQUIPMENT } from '../constants';
import styles from '../ProfessionalAbout.module.scss';
import Text from '@/components/Typography/Text';
import Title from '@/components/Typography/Title';
import Image from '@/components/Image/Image';

export default function Technology() {
  return (
    <div className={styles.technology}>
      <div className={styles.technologyContent}>
        <div className={styles.technologyLeft}>
          <Title level='h2' className={styles.sectionTitleTitle}>
            State-of-the-Art Equipment
          </Title>
          <div className={styles.equipmentList}>
            {EQUIPMENT.map((item, index) => (
              <div key={index} className={styles.equipmentItem}>
                <Text as='div' className={styles.equipmentIcon}>
                  {item.icon}
                </Text>
                <div className={styles.equipmentDetails}>
                  <Title level='h4'>{item.title}</Title>
                  <Text as='p'>{item.description}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.technologyRight}>
          <Image
            src='/placeholder.svg?height=500&width=600'
            alt='Advanced surveying equipment'
            className={styles.technologyImage}
            width={500}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}
