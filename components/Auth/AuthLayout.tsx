'use client';

import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignUpForm';
import styles from './AuthLayout.module.scss';

export function AuthLayout() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {isLoginMode ? (
          <LoginForm onToggleMode={() => setIsLoginMode(false)} />
        ) : (
          <SignupForm onToggleMode={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );
}
