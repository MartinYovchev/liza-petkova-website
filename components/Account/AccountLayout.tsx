'use client';

import type { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from '../Auth/AuthLayout';
import { AdminHeader } from './AdminHeader';
import { Loader } from '../Loader/Loader';
import styles from './AccountLayout.module.scss';

type AccountLayoutProps = {
  children: ReactNode;
};

export function AccountLayout({ children }: AccountLayoutProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader
          isLoading={true}
          variant='overlay'
          size='large'
          message='Loading...'
        />
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
