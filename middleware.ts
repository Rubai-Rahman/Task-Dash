import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { COOKIE_NAME, JWT_SECRET } from '@/lib/session';

const PUBLIC_PATHS = [
  '/',
  '/login',
  '/signup',
  '/api/auth/login',
  '/api/auth/logout',
  '/_next',
  '/favicon.ico',
];

function isPublicPath(pathname: string): boolean {
  return (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    !!pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|json)$/)
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  const payload = await verifyJwt(token, JWT_SECRET);
  if (!payload) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // Optional role guard example: protect /admin* for admin only
  if (pathname.startsWith('/admin')) {
    if ((payload as { role?: string }).role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except public ones
     */
    '/((?!api/auth/login|api/auth/logout|login|signup|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
