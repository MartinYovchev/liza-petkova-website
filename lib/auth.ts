import type { User, Session } from './types';

// Simulated user database - replace with your actual database
const users: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    password: 'admin123', // In production, this should be hashed
    role: 'admin',
    createdAt: new Date(),
  },
];

// Simple in-memory session store - replace with Redis or database in production
const sessions: Map<string, Session> = new Map();

// Valid invite codes - in production, store these in a database
const validInviteCodes = ['ADMIN2024', 'INVITE123', 'SECURE456'];

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  console.log('Login attempt for:', email);
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    console.log('Login successful for:', email);
    return userWithoutPassword;
  }
  console.log('Login failed for:', email);
  return null;
}

export async function signup(
  name: string,
  email: string,
  password: string,
  inviteCode: string
): Promise<User | null> {
  console.log('Signup attempt for:', email, 'with invite code:', inviteCode);

  // Check if invite code is valid
  if (!validInviteCodes.includes(inviteCode)) {
    console.log('Invalid invite code:', inviteCode);
    throw new Error('Invalid invite code');
  }

  // Check if user already exists
  if (users.find(u => u.email === email)) {
    console.log('User already exists:', email);
    throw new Error('User already exists');
  }

  // Create new user
  const newUser: User & { password: string } = {
    id: Date.now().toString(),
    email,
    name,
    password, // In production, hash this password
    role: 'user',
    createdAt: new Date(),
  };

  users.push(newUser);
  console.log('New user created:', email, 'Total users:', users.length);

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function createSession(user: User): Promise<string> {
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const session: Session = {
    id: sessionId,
    userId: user.id,
    createdAt: new Date(),
    expiresAt,
  };

  sessions.set(sessionId, session);
  console.log('Session created:', sessionId, 'for user:', user.email);
  return sessionId;
}

export async function getSession(sessionId?: string): Promise<User | null> {
  if (!sessionId) {
    // Try to get session ID from headers (for server components)
    // const headersList = await headers()
    // sessionId = headersList.get("x-session-id") || undefined
    if (!sessionId) return null;
  }

  const session = sessions.get(sessionId);
  if (!session) {
    console.log('Session not found:', sessionId);
    return null;
  }

  // Check if session is expired
  if (session.expiresAt < new Date()) {
    console.log('Session expired:', sessionId);
    sessions.delete(sessionId);
    return null;
  }

  // Find user by session
  const user = users.find(u => u.id === session.userId);
  if (!user) {
    console.log('User not found for session:', sessionId);
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function deleteSession(sessionId: string): Promise<void> {
  console.log('Deleting session:', sessionId);
  sessions.delete(sessionId);
}

export function isValidSession(sessionId: string): boolean {
  const session = sessions.get(sessionId);
  if (!session) return false;
  return session.expiresAt > new Date();
}

// Debug function to see current state
export function getDebugInfo() {
  return {
    users: users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
    })),
    sessions: Array.from(sessions.entries()),
    validInviteCodes,
  };
}
