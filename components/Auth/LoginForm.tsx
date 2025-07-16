'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '../../app/actions/auth';
import { useAuth } from '../../hooks/useAuth';
import Title from '../Typography/Title';
import Text from '../Typography/Text';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import styles from './AuthForms.module.scss';

type LoginFormProps = {
  onToggleMode: () => void;
};

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const { setSession } = useAuth();
  const router = useRouter();
  const errorRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus management for accessibility
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // Announce errors to screen readers
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  // Security: Rate limiting indication
  const isRateLimited = attempts >= 3;
  const remainingAttempts = Math.max(0, 3 - attempts);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isRateLimited) {
      setError('Too many failed attempts. Please wait before trying again.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      // Security: Generic error message to prevent username enumeration
      setError('Invalid credentials. Please check your email and password.');
      setAttempts(prev => prev + 1);
      setIsLoading(false);
    } else if (result?.success && result.sessionId && result.user) {
      setSession(result.sessionId, result.user);
      router.push('/admin');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <Title level='h1' className={styles.title} pageTitle>
            Admin Login
          </Title>
          <Text className={styles.description}>
            Enter your credentials to access the admin panel
          </Text>
        </header>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Live region for screen reader announcements */}
            <div
              role='status'
              aria-live='polite'
              aria-atomic='true'
              className='sr-only'
            >
              {isLoading && 'Signing in...'}
              {error && `Error: ${error}`}
            </div>

            {error && (
              <div
                ref={errorRef}
                className={`${styles.alert} ${styles.alertError}`}
                role='alert'
                aria-live='assertive'
                tabIndex={-1}
              >
                <Text as='span'>{error}</Text>
                {remainingAttempts > 0 && (
                  <Text as='p' className={styles.attemptsRemaining}>
                    {remainingAttempts} attempt
                    {remainingAttempts !== 1 ? 's' : ''} remaining
                  </Text>
                )}
              </div>
            )}

            <fieldset className={styles.fieldset} disabled={isLoading}>
              <legend className='sr-only'>Login Credentials</legend>

              <div className={styles.fieldGroup}>
                <Text as='label' htmlFor='email' className={styles.label}>
                  Email Address *
                </Text>
                <input
                  ref={firstInputRef}
                  id='email'
                  name='email'
                  type='email'
                  placeholder='admin@example.com'
                  required
                  autoComplete='email'
                  autoCapitalize='off'
                  autoCorrect='off'
                  spellCheck='false'
                  disabled={isLoading || isRateLimited}
                  className={styles.input}
                  aria-describedby={error ? 'login-error' : undefined}
                  maxLength={254} // RFC 5321 limit
                />
              </div>

              <div className={styles.fieldGroup}>
                <Text as='label' htmlFor='password' className={styles.label}>
                  Password *
                </Text>
                <div className={styles.passwordContainer}>
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    required
                    autoComplete='current-password'
                    disabled={isLoading || isRateLimited}
                    className={styles.input}
                    aria-describedby='password-toggle-desc'
                    minLength={8}
                    maxLength={128}
                  />
                  <button
                    type='button'
                    className={styles.passwordToggle}
                    onClick={togglePasswordVisibility}
                    disabled={isLoading || isRateLimited}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    aria-describedby='password-toggle-desc'
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg
                        className={styles.icon}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        aria-hidden='true'
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
                        aria-hidden='true'
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
                  <div id='password-toggle-desc' className='sr-only'>
                    Toggle password visibility
                  </div>
                </div>
              </div>
            </fieldset>

            <Button
              type='submit'
              variant='primary'
              size='large'
              fullWidth
              disabled={isLoading || isRateLimited}
              aria-describedby={
                isRateLimited ? 'rate-limit-message' : undefined
              }
            >
              {isLoading ? (
                <>
                  <Loader
                    isLoading={true}
                    variant='inline'
                    size='small'
                    message=''
                  />
                  <Text as='span'>Signing in...</Text>
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            {isRateLimited && (
              <div
                id='rate-limit-message'
                className={`${styles.alert} ${styles.alertWarning}`}
                role='alert'
              >
                <Text>
                  Account temporarily locked due to multiple failed attempts.
                  Please wait before trying again.
                </Text>
              </div>
            )}
          </form>

          <div className={styles.footer}>
            <Button
              variant='outline'
              size='medium'
              onClick={onToggleMode}
              disabled={isLoading}
              type='button'
            >
              Need an account? Sign up with invite code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
