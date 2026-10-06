import bcrypt from 'bcryptjs';
import {
  createSession as createSessionHelper,
  getSession as getSessionHelper,
  destroySession as destroySessionHelper,
  decrypt,
  encrypt,
  SESSION_COOKIE_NAME,
  type SessionPayload,
} from './session';
import { getUserByEmail, createUser, getUserById } from './db';
import type { User } from './db/schema';

export interface AuthActionState {
  error?: string;
  success?: boolean;
  redirectTo?: string;
  fieldErrors?: {
    fullName?: string;
    email?: string;
    password?: string;
  };
}

const SALT_ROUNDS = 10;

/**
 * Hashes a plaintext password using bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verifies a plaintext password against a stored bcrypt hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
}

/**
 * Create a session for an authenticated user
 */
export async function createSession(user: {
  id: string | number;
  email: string;
  role: string;
  fullName?: string;
}): Promise<string> {
  return createSessionHelper(user);
}

/**
 * Get current session payload from cookies
 */
export async function getSession(): Promise<SessionPayload | null> {
  return getSessionHelper();
}

/**
 * Destroy the active session
 */
export async function destroySession(): Promise<void> {
  return destroySessionHelper();
}

/**
 * Helper to fetch the full database User object for the currently logged in user
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session || !session.userId) return null;
  const numId = typeof session.userId === 'string' ? parseInt(session.userId, 10) : session.userId;
  if (isNaN(numId)) return null;
  return getUserById(numId);
}

export {
  decrypt,
  encrypt,
  SESSION_COOKIE_NAME,
  type SessionPayload,
  getUserByEmail,
  createUser,
  getUserById,
};
