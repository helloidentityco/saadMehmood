import { cookies, headers } from 'next/headers';
import {
  encrypt,
  decrypt,
  SESSION_COOKIE_NAME,
  SESSION_DURATION,
  type SessionPayload,
} from './jwt';

export * from './jwt';

/**
 * Determines whether the current request is served over HTTPS (e.g., Cloud Run / AI Studio iframe)
 * so cookies can use SameSite=None; Secure for cross-origin iframe compatibility.
 */
export async function getCookieSecurityOptions(): Promise<{
  secure: boolean;
  sameSite: 'none' | 'lax';
}> {
  try {
    const hdrs = await headers();
    const proto = hdrs.get('x-forwarded-proto') || '';
    const origin = hdrs.get('origin') || '';
    const referer = hdrs.get('referer') || '';
    const isHttps =
      proto.includes('https') ||
      origin.startsWith('https://') ||
      referer.startsWith('https://') ||
      process.env.NODE_ENV === 'production';

    if (isHttps) {
      return { secure: true, sameSite: 'none' };
    }
  } catch {
    if (process.env.NODE_ENV === 'production') {
      return { secure: true, sameSite: 'none' };
    }
  }
  return { secure: false, sameSite: 'lax' };
}

/**
 * Creates an HTTP-only session cookie for the authenticated user
 */
export async function createSession(user: {
  id: string | number;
  email: string;
  role: string;
  fullName?: string;
}): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const token = await encrypt({
    userId: user.id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
  });

  const cookieStore = await cookies();
  const { secure, sameSite } = await getCookieSecurityOptions();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite,
    path: '/',
    expires: expiresAt,
  });

  return token;
}

/**
 * Retrieves and validates the current active user session from cookies
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return decrypt(token);
}

/**
 * Destroys the active session by deleting the HTTP-only auth cookie
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
