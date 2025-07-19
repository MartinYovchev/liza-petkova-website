'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signupAction } from '../../app/actions/auth';
import { useAuth } from '../../hooks/useAuth';
import Title from '../Typography/Title';
import Text from '../Typography/Text';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import styles from './AuthForms.module.scss';

type SignupFormProps = {
  onToggleMode: () => void;
};

export function SignupForm({ onToggleMode }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
      setIsLoading(false);
      // Small delay to ensure session is set before redirect
      setTimeout(() => {
        router.push('/admin');
      }, 100);
    } else {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
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
            Create Account
          </Title>
          <Text className={styles.description}>
            Sign up with a valid invite code to access the admin panel
          </Text>
        </header>

        <div className={styles.content}>
          {/* Live region for screen reader announcements */}
          <div
            role='status'
            aria-live='polite'
            aria-atomic='true'
            className='sr-only'
          >
            {isLoading && 'Creating account...'}
            {error && `Error: ${error}`}
          </div>

          <div className={`${styles.alert} ${styles.alertInfo}`}>
            <svg
              className={styles.icon}
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
            <Text>
              You need a valid invite code to create an account. Contact your
              administrator if you don't have one.
            </Text>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {error && (
              <div
                ref={errorRef}
                className={`${styles.alert} ${styles.alertError}`}
                role='alert'
                aria-live='assertive'
                tabIndex={-1}
              >
                <Text>{error}</Text>
              </div>
            )}

            <fieldset className={styles.fieldset} disabled={isLoading}>
              <legend className='sr-only'>Account Information</legend>

              <div className={styles.fieldGroup}>
                <Text as='label' htmlFor='name' className={styles.label}>
                  Full Name *
                </Text>
                <input
                  ref={firstInputRef}
                  id='name'
                  name='name'
                  type='text'
                  placeholder='John Doe'
                  required
                  autoComplete='name'
                  autoCapitalize='words'
                  autoCorrect='off'
                  disabled={isLoading}
                  className={styles.input}
                  maxLength={100}
                />
              </div>

              <div className={styles.fieldGroup}>
                <Text as='label' htmlFor='email' className={styles.label}>
                  Email Address *
                </Text>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='john@example.com'
                  required
                  autoComplete='email'
                  autoCapitalize='off'
                  autoCorrect='off'
                  spellCheck='false'
                  disabled={isLoading}
                  className={styles.input}
                  aria-describedby={error ? 'signup-error' : undefined}
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
                    placeholder='Create a strong password'
                    required
                    autoComplete='new-password'
                    disabled={isLoading}
                    minLength={8}
                    maxLength={128}
                    className={styles.input}
                    aria-describedby='password-requirements password-toggle-desc'
                  />
                  <button
                    type='button'
                    className={styles.passwordToggle}
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
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
                <div id='password-requirements' className='sr-only'>
                  Password must be at least 8 characters long
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <Text as='label' htmlFor='inviteCode' className={styles.label}>
                  Invite Code *
                </Text>
                <input
                  id='inviteCode'
                  name='inviteCode'
                  type='text'
                  placeholder='Enter your invite code'
                  required
                  autoComplete='off'
                  autoCapitalize='off'
                  autoCorrect='off'
                  spellCheck='false'
                  disabled={isLoading}
                  className={styles.input}
                  maxLength={50}
                />
              </div>
            </fieldset>

            <Button
              type='submit'
              variant='primary'
              size='large'
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader
                    isLoading={true}
                    variant='inline'
                    size='small'
                    message=''
                  />
                  <Text as='span'>Creating account...</Text>
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className={styles.footer}>
            <Button
              variant='outline'
              size='medium'
              onClick={onToggleMode}
              disabled={isLoading}
              type='button'
            >
              Already have an account? Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
