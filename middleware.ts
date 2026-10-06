import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt, SESSION_COOKIE_NAME } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  // Never intercept or redirect Server Action POST requests (Next-Action header),
  // as redirecting a Server Action POST returns text/html instead of text/x-component
  // and causes Next.js client to throw "An unexpected response was received from the server."
  if (
    request.method === 'POST' ||
    request.headers.has('next-action') ||
    request.headers.get('accept')?.includes('text/x-component')
  ) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(token);

  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  const isAccountRoute = pathname === '/account' || pathname.startsWith('/account/');
  const isAuthRoute = pathname === '/login' || pathname === '/signup';

  // 1. Strict Admin Routes: Restrict /admin/* solely to sessions where role === 'admin'.
  // Unauthenticated or non-admin requests must redirect to /login.
  if (isAdminRoute) {
    if (!session || session.role !== 'admin') {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname + search);
      if (session && session.role !== 'admin') {
        redirectUrl.searchParams.set('error', 'admin_access_required');
      }
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 2. User Account Routes: Protect /account/* for all authenticated users ('user' or 'admin').
  // Redirect unauthenticated users to /login?redirect=....
  if (isAccountRoute) {
    if (!session) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname + search);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. Prevent already authenticated users from accessing /login or /signup
  if (isAuthRoute && session) {
    const destination = session.role === 'admin' ? '/admin' : '/account';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // 4. Public Routes: Keep /, /collections, /product/*, /cart, /checkout, and /about accessible
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/account',
    '/account/:path*',
    '/checkout',
    '/checkout/:path*',
    '/login',
    '/signup',
  ],
};
