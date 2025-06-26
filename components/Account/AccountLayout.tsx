'use client';

import type { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from '../Auth/AuthLayout';
import { AdminHeader } from './AdminHeader';
import styles from './AccountLayout.module.scss';

type AccountLayoutProps = {
  children: ReactNode;
};

export function AccountLayout({ children }: AccountLayoutProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <div
            className='spinner'
            style={{
              width: '2rem',
              height: '2rem',
              border: '2px solid #e5e7eb',
              borderTop: '2px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthLayout />;
  }

  return (
    <div className={styles.container}>
      <AdminHeader user={user} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
