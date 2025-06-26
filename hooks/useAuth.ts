'use client';

import { useState, useEffect } from 'react';
import { validateSessionAction } from '../app/actions/auth';
import type { User } from '../lib/types';

const SESSION_KEY = 'admin_session_id';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const sessionId = localStorage.getItem(SESSION_KEY);
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      const result = await validateSessionAction(sessionId);
      if (result.user) {
        setUser(result.user);
      } else {
        // Invalid session, remove from storage
        localStorage.removeItem(SESSION_KEY);
      }
    } catch (error) {
      console.error('Session validation error:', error);
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  const setSession = (sessionId: string, userData: User) => {
    localStorage.setItem(SESSION_KEY, sessionId);
    setUser(userData);
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const getSessionId = () => {
    return localStorage.getItem(SESSION_KEY);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    setSession,
    clearSession,
    getSessionId,
    checkSession,
  };
}
