import Title from "@/components/Typography/Title";
import styles from "../About.module.scss";
import Text from "@/components/Typography/Text";
import Image from "next/image";

export const PersonalTouch = () => {
  return (
    <div className={styles.personal}>
      <div className={styles.personalContent}>
        <div className={styles.personalLeft}>
          <Image
            src="/placeholder.svg?height=500&width=400"
            alt="Natalia in her studio"
            className={styles.personalImage}
            width={500}
            height={400}
          />
        </div>
        <div className={styles.personalRight}>
          <Title level="h2" className={styles.sectionTitle}>
            Beyond the Canvas
          </Title>
          <div className={styles.personalText}>
            <Text as="p">
              When I'm not coaching or creating, you'll find me exploring
              nature, reading philosophy, or experimenting with new art
              techniques. I'm fascinated by the intersection of psychology and
              creativity, and I'm constantly learning about new ways to support
              human flourishing.
            </Text>
            <Text as="p">
              I live with my two cats, Luna and Cosmos, who are excellent
              creative companions and remind me daily about the importance of
              play and curiosity. My studio is my sanctuary—a space filled with
              natural light, plants, and the beautiful chaos of ongoing creative
              projects.
            </Text>
            <Text as="p">
              I believe in the power of community and regularly host creative
              gatherings where like-minded souls can connect, share, and inspire
              each other. These connections often become the foundation for
              lifelong creative partnerships.
            </Text>
          </div>
          <div className={styles.personalQualities}>
            <div className={styles.quality}>
              <Text as="span" className={styles.qualityIcon}>
                🌿
              </Text>
              <Text as="span">Nature Lover</Text>
            </div>
            <div className={styles.quality}>
              <Text as="span" className={styles.qualityIcon}>
                📚
              </Text>
              <Text as="span">Lifelong Learner</Text>
            </div>
            <div className={styles.quality}>
              <Text as="span" className={styles.qualityIcon}>
                🐱
              </Text>
              <Text as="span">Cat Parent</Text>
            </div>
            <div className={styles.quality}>
              <Text as="span" className={styles.qualityIcon}>
                🎭
              </Text>
              <Text as="span">Art Enthusiast</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
