'use client';

import { useState, useEffect } from 'react';
import { validateSessionAction, logoutAction } from '../app/actions/auth';
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
        setUser(null);
        setIsLoading(false);
        return;
      }

      const result = await validateSessionAction(sessionId);
      if (result.user) {
        setUser(result.user);
      } else {
        // Invalid session, remove from storage and clear user
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      }
    } catch (error) {
      console.error('Session validation error:', error);
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const setSession = (sessionId: string, userData: User) => {
    localStorage.setItem(SESSION_KEY, sessionId);
    setUser(userData);
    // Force a session check to ensure everything is in sync
    setTimeout(() => {
      checkSession();
    }, 50);
  };

  const clearSession = async () => {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      try {
        // Call logout action to clean up server-side session
        await logoutAction(sessionId);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
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
