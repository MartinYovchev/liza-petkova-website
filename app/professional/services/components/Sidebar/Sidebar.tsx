import Link from 'next/link';
import Title from '@/components/Typography/Title';
import Text from '@/components/Typography/Text';
import { Button } from '@/components/Button/Button';
import styles from './Sidebar.module.scss';
import { categories } from '../../constants';

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const Sidebar = ({
  selectedCategory,
  onCategorySelect,
}: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <Title level='h3' className={styles.sidebarTitle}>
          Service Categories
        </Title>
        <div className={styles.categories}>
          {categories.map(category => (
            <Button
              key={category.id}
              className={`${styles.categoryBtn} ${
                selectedCategory === category.id ? styles.active : ''
              }`}
              onClick={() => onCategorySelect(category.id)}
              variant='outline'
            >
              <Text as='span' className={styles.categoryName}>
                {category.name}
              </Text>
              <Text as='span' className={styles.categoryCount}>
                {category.count}
              </Text>
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <Title level='h3' className={styles.sidebarTitle}>
          Need Help?
        </Title>
        <div className={styles.helpCard}>
          <div className={styles.helpIcon}>💬</div>
          <Title level='h4'>Free Consultation</Title>
          <Text as='p'>
            Not sure which service you need? Get expert advice from our team.
          </Text>
          <Link href='/contact' className={styles.helpButton}>
            Contact Us
          </Link>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <Title level='h3' className={styles.sidebarTitle}>
          Quick Quote
        </Title>
        <div className={styles.quoteCard}>
          <div className={styles.quoteIcon}>📋</div>
          <Title level='h4'>Get Estimate</Title>
          <Text as='p'>
            Provide project details and receive information about our services.
          </Text>
          <Link href='/contact' className={styles.quoteButton}>
            Request Info
          </Link>
        </div>
      </div>
    </div>
  );
};
