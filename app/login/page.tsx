'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from '../../components/Auth/AuthLayout';
import { Loader } from '../../components/Loader/Loader';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/admin');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <Loader
        isLoading={true}
        variant='overlay'
        size='large'
        message='Loading...'
      />
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return <AuthLayout />;
}
