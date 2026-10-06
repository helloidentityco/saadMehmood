'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import {
  getUserByEmail,
  createUser,
  hashPassword,
  verifyPassword,
  createSession,
  destroySession,
  type AuthActionState,
} from '@/lib/auth';
import { getCookieSecurityOptions } from '@/lib/session';

/**
 * Validates, registers a new user with role 'user', sets session cookie, and returns redirectTo target
 */
export async function signupUser(
  prevState: AuthActionState | null | undefined,
  formData: FormData
): Promise<AuthActionState> {
  const fullName = (formData.get('fullName') as string)?.trim() || '';
  const email = (formData.get('email') as string)?.trim().toLowerCase() || '';
  const password = (formData.get('password') as string) || '';
  const redirectTarget = (formData.get('redirect') as string) || '/account';

  const fieldErrors: AuthActionState['fieldErrors'] = {};

  // 1. Validation
  if (!fullName || fullName.length < 2) {
    fieldErrors.fullName = 'Full Name must be at least 2 characters long.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    fieldErrors.email = 'Please provide a valid email address.';
  }

  if (!password || password.length < 8) {
    fieldErrors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    // 2. Check for existing user by email in Neon DB
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        error: 'An account with this email address is already registered. Please sign in.',
      };
    }

    // 3. Hash password and save new user record with role 'user'
    const passwordHash = await hashPassword(password);
    const newUser = await createUser({
      fullName,
      email,
      passwordHash,
      role: 'user',
    });

    // 4. Set session cookie
    await createSession({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      fullName: newUser.fullName,
    });

    const cookieStore = await cookies();
    const { secure, sameSite } = await getCookieSecurityOptions();

    cookieStore.delete('sm_clear_cart');
    cookieStore.set('sm_user_role', 'user', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      secure,
      sameSite,
    });
    cookieStore.set('sm_user_id', String(newUser.id), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      secure,
      sameSite,
    });

    const destination = redirectTarget.startsWith('/') ? redirectTarget : '/account';
    revalidatePath('/', 'layout');
    return {
      success: true,
      redirectTo: destination,
    };
  } catch (err: unknown) {
    console.error('Signup error:', err);
    return {
      error: 'An unexpected error occurred during registration. Please try again.',
    };
  }
}

/**
 * Verifies credentials against Neon DB, sets role-based session cookie, and returns role-based redirectTo target
 */
export async function loginUser(
  prevState: AuthActionState | null | undefined,
  formData: FormData
): Promise<AuthActionState> {
  const email = (formData.get('email') as string)?.trim().toLowerCase() || '';
  const password = (formData.get('password') as string) || '';
  const requestedRedirect = (formData.get('redirect') as string) || '';

  if (!email || !password) {
    return {
      error: 'Please enter both your email address and password.',
    };
  }

  let destination = '/account';

  try {
    // 1. Verify user exists in database
    const user = await getUserByEmail(email);
    if (!user) {
      return {
        error: 'Invalid credentials. Please verify your email and password.',
      };
    }

    // 2. Verify password against stored bcrypt hash
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return {
        error: 'Invalid credentials. Please verify your email and password.',
      };
    }

    // 3. Retrieve user's explicit role ('user' or 'admin') and set session cookie
    const explicitRole = user.role === 'admin' ? 'admin' : 'user';
    await createSession({
      id: user.id,
      email: user.email,
      role: explicitRole,
      fullName: user.fullName,
    });

    const cookieStore = await cookies();
    const { secure, sameSite } = await getCookieSecurityOptions();

    cookieStore.delete('sm_clear_cart');
    cookieStore.set('sm_user_role', explicitRole, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      secure,
      sameSite,
    });
    cookieStore.set('sm_user_id', String(user.id), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      secure,
      sameSite,
    });

    // 4. Determine role-based redirection:
    // If role === 'admin' -> redirect to /admin
    // If role === 'user' -> redirect to /account
    if (explicitRole === 'admin') {
      destination = requestedRedirect && requestedRedirect.startsWith('/admin')
        ? requestedRedirect
        : '/admin';
    } else {
      destination = requestedRedirect && !requestedRedirect.startsWith('/admin')
        ? requestedRedirect
        : '/account';
    }

    revalidatePath('/', 'layout');
    return {
      success: true,
      redirectTo: destination,
    };
  } catch (err: unknown) {
    console.error('Login error:', err);
    return {
      error: 'An unexpected error occurred during login. Please try again.',
    };
  }
}

/**
 * Clears auth cookies, flags client cart cleanup, and returns redirect target
 */
export async function logoutUser(): Promise<{ success: boolean; redirectTo: string }> {
  try {
    await destroySession();
    const cookieStore = await cookies();
    const { secure, sameSite } = await getCookieSecurityOptions();

    cookieStore.delete('sm_user_role');
    cookieStore.delete('sm_user_id');
    cookieStore.set('sm_clear_cart', 'true', {
      path: '/',
      maxAge: 30,
      httpOnly: false,
      secure,
      sameSite,
    });
    revalidatePath('/', 'layout');
  } catch (err) {
    console.error('Logout error:', err);
  }
  return { success: true, redirectTo: '/login' };
}
