import { SignJWT, jwtVerify } from 'jose';

export interface SessionPayload {
  userId: number | string;
  email: string;
  role: 'user' | 'admin' | string;
  fullName?: string;
  [key: string]: unknown;
}

export const SESSION_COOKIE_NAME = 'smf_session_token';
const DEFAULT_SECRET = 'saad_mehmood_fabrics_royal_darbar_jwt_secret_key_2026';
export const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

function getEncodedKey(): Uint8Array {
  const secretKey = process.env.JWT_SECRET || process.env.SESSION_SECRET || DEFAULT_SECRET;
  return new TextEncoder().encode(secretKey);
}

/**
 * Encrypt a session payload into a signed JWT token
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getEncodedKey());
}

/**
 * Decrypt and verify a signed JWT session token
 */
export async function decrypt(token: string | undefined = ''): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getEncodedKey(), {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
