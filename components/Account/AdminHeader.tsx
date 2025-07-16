'use client';

import { useRouter } from 'next/navigation';
import { logoutAction } from '../../app/actions/auth';
import { useAuth } from '../../hooks/useAuth';
import type { User } from '../../lib/types';
import Title from '../Typography/Title';
import Text from '../Typography/Text';
import { Button } from '../Button/Button';
import styles from './AdminHeader.module.scss';

interface AdminHeaderProps {
  user: User;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const { getSessionId, clearSession } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const sessionId = getSessionId();
    if (sessionId) {
      await logoutAction(sessionId);
    }
    clearSession();
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <Title level='h1' className={styles.title}>
              Admin Panel
            </Title>
            <Text as='span' className={styles.roleBadge}>
              {user.role}
            </Text>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.userInfo}>
              <svg
                className={styles.icon}
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                />
              </svg>
              <Text as='span'>{user.name}</Text>
              <Text as='span' className={styles.userEmail}>
                ({user.email})
              </Text>
            </div>

            <Button
              onClick={handleLogout}
              variant='outline'
              className={styles.logoutButton}
            >
              <svg
                className={styles.icon}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
