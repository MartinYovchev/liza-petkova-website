'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '../../app/actions/auth';
import { useAuth } from '../../hooks/useAuth';
import styles from './LoginForm.module.scss';

type LoginFormProps = {
  onToggleMode: () => void;
};

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setSession } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result?.success && result.sessionId && result.user) {
      setSession(result.sessionId, result.user);
      router.push('/admin');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.description}>
            Enter your credentials to access the admin panel
          </p>
        </div>
        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={`${styles.alert} ${styles.alertError}`}>
                {error}
              </div>
            )}

            <div className={styles.fieldGroup}>
              <label htmlFor='email' className={styles.label}>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='admin@example.com'
                required
                disabled={isLoading}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor='password' className={styles.label}>
                Password
              </label>
              <div className={styles.passwordContainer}>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  required
                  disabled={isLoading}
                  className={styles.input}
                />
                <button
                  type='button'
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
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
                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                      />
                    </svg>
                  ) : (
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
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type='submit'
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <button
              className={styles.toggleButton}
              onClick={onToggleMode}
              disabled={isLoading}
            >
              Need an account? Sign up with invite code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
