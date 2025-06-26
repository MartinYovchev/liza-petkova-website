'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signupAction } from '../../app/actions/auth';
import { useAuth } from '../../hooks/useAuth';
import styles from './SignUpForm.module.scss';

type SignupFormProps = {
  onToggleMode: () => void;
};

export function SignupForm({ onToggleMode }: SignupFormProps) {
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
    const result = await signupAction(formData);

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
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.description}>
            Sign up with a valid invite code to access the admin panel
          </p>
        </div>
        <div className={styles.content}>
          <div className={`${styles.alert} ${styles.alertInfo}`}>
            <svg
              className={styles.icon}
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
            You need a valid invite code to create an account. Contact your
            administrator if you don't have one.
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={`${styles.alert} ${styles.alertError}`}>
                {error}
              </div>
            )}

            <div className={styles.fieldGroup}>
              <label htmlFor='name' className={styles.label}>
                Full Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                placeholder='John Doe'
                required
                disabled={isLoading}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor='email' className={styles.label}>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='john@example.com'
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
                  placeholder='Create a strong password'
                  required
                  disabled={isLoading}
                  minLength={6}
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

            <div className={styles.fieldGroup}>
              <label htmlFor='inviteCode' className={styles.label}>
                Invite Code
              </label>
              <input
                id='inviteCode'
                name='inviteCode'
                type='text'
                placeholder='Enter your invite code'
                required
                disabled={isLoading}
                className={styles.input}
              />
            </div>

            <button
              type='submit'
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <button
              className={styles.toggleButton}
              onClick={onToggleMode}
              disabled={isLoading}
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
