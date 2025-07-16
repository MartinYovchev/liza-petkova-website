import { PaginationProps } from '../../lib/types';
import Text from '../Typography/Text';
import { Button } from '../Button/Button';
import styles from './Pagination.module.scss';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  totalItems = 0,
  itemsPerPage = 10,
}: PaginationProps) {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={styles.container}>
      {showInfo && (
        <Text className={styles.info}>
          Showing {startItem}-{endItem} of {totalItems} items
        </Text>
      )}

      <div className={styles.pagination}>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant='outline'
          className={`${styles.button} ${styles.navButton}`}
        >
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
            <polyline points='15,18 9,12 15,6' />
          </svg>
          Previous
        </Button>

        {getPageNumbers().map((page, index) => (
          <Button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...' || page === currentPage}
            variant={page === currentPage ? 'primary' : 'outline'}
            className={`${styles.button} ${
              page === currentPage ? styles.active : ''
            } ${page === '...' ? styles.dots : ''}`}
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant='outline'
          className={`${styles.button} ${styles.navButton}`}
        >
          Next
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
            <polyline points='9,18 15,12 9,6' />
          </svg>
        </Button>
      </div>
    </div>
  );
}
