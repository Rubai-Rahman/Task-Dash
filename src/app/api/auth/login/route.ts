import { NextRequest, NextResponse } from 'next/server';
import { signJwt } from '@/lib/jwt';
import { COOKIE_NAME, JWT_SECRET } from '@/lib/session';

// For demo, mirror mock users in store
const users = [
  {
    id: '1',
    email: 'admin@gmail.com',
    name: 'Sarah Johnson',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'user@gmail.com',
    name: 'Mike Chen',
    role: 'user' as const,
  },
];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email);
  if (!user || password !== 'demo123') {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await signJwt(user, JWT_SECRET, 60 * 60 * 8);

  const res = NextResponse.json({ user });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return res;
}
