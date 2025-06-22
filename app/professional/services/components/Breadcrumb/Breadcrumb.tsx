import Link from 'next/link';
import Text from '@/components/Typography/Text';
import styles from './Breadcrumb.module.scss';

export const Breadcrumb = () => {
  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbContent}>
        <Link href='/professional'>Home</Link>
        <Text as='span' className={styles.breadcrumbSeparator}>
          →
        </Text>
        <Text as='span'>Services</Text>
      </div>
    </div>
  );
};
