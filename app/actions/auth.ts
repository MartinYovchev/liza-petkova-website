'use server';

import {
  login,
  signup,
  createSession,
  deleteSession,
  getSession,
} from '@/lib/auth';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const user = await login(email, password);

    if (!user) {
      return { error: 'Invalid email or password' };
    }

    const sessionId = await createSession(user);

    // Return session ID to be stored client-side
    return { success: true, sessionId, user };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login' };
  }
}

export async function signupAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const inviteCode = formData.get('inviteCode') as string;

  if (!name || !email || !password || !inviteCode) {
    return { error: 'All fields are required' };
  }

  try {
    const user = await signup(name, email, password, inviteCode);

    if (!user) {
      return { error: 'Failed to create account' };
    }

    const sessionId = await createSession(user);

    // Return session ID to be stored client-side
    return { success: true, sessionId, user };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { error: error.message || 'An error occurred during signup' };
  }
}

export async function logoutAction(sessionId: string) {
  if (sessionId) {
    await deleteSession(sessionId);
  }
  return { success: true };
}

export async function validateSessionAction(sessionId: string) {
  try {
    if (!sessionId) {
      return { user: null };
    }
    const user = await getSession(sessionId);
    return { user };
  } catch (error) {
    console.error('Session validation error:', error);
    return { user: null };
  }
}
