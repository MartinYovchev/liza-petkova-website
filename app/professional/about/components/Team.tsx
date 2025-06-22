import Image from 'next/image';
import { TEAM_MEMBERS } from '../constants';
import styles from '../ProfessionalAbout.module.scss';
import Text from '@/components/Typography/Text';
import Title from '@/components/Typography/Title';

export default function Team() {
  return (
    <div className={styles.team}>
      <div className={styles.teamContent}>
        <div className={styles.sectionHeader}>
          <Title level='h2' className={styles.sectionTitleTitle}>
            Meet Our Expert Team
          </Title>
          <div className={styles.sectionSubtitle}>
            <Text as='p'>
              Licensed professionals with decades of combined experience in
              geodetic sciences
            </Text>
          </div>
        </div>

        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <div className={styles.memberImage}>
                <Image
                  src={member.image || '/placeholder.svg'}
                  alt={member.name}
                  width={300}
                  height={300}
                />
              </div>
              <div className={styles.memberInfo}>
                <Title level='h3' className={styles.memberName}>
                  {member.name}
                </Title>
                <Text as='p' className={styles.memberRole}>
                  {member.role}
                </Text>
                <Text as='p' className={styles.memberCredentials}>
                  {member.credentials}
                </Text>
                <Text as='p' className={styles.memberExperience}>
                  {member.experience} experience
                </Text>
                <Text as='p' className={styles.memberBio}>
                  {member.bio}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
