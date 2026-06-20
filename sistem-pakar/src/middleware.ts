// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin_session')?.value;

    if (!sessionCookie) {
      // Redirect to login page if no session cookie is found
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const isValid = await verifyToken(sessionCookie);

    if (!isValid) {
      // Redirect to login page if session token is invalid
      const loginUrl = new URL('/login', request.url);
      // Clean up the invalid cookie
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Prevent logged-in admins from accessing /login again
  if (pathname === '/login') {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    if (sessionCookie) {
      const isValid = await verifyToken(sessionCookie);
      if (isValid) {
        const adminDashboardUrl = new URL('/admin', request.url);
        return NextResponse.redirect(adminDashboardUrl);
      }
    }
  }

  return NextResponse.next();
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
