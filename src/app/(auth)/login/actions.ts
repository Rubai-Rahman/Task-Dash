'use server';

import { cookies } from 'next/headers';
import { loginSchema } from '@/lib/validations/validation';
import { signJwt } from '@/lib/jwt';
import { COOKIE_NAME, JWT_SECRET } from '@/lib/session';

type ActionState = {
  error?: string;
  success?: boolean;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loginAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');

  // Optional: validate on server as well
  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: parsed.error.issues?.[0]?.message || 'Invalid form data' };
  }

  // Artificial delay to demonstrate loading state
  await delay(1200);

  // Demo-only users, mirror API route
  const users = [
    {
      id: '1',
      email: 'admin@taskflow.com',
      name: 'Sarah Johnson',
      role: 'admin' as const,
    },
    {
      id: '2',
      email: 'user@taskflow.com',
      name: 'Mike Chen',
      role: 'user' as const,
    },
  ];

  const user = users.find((u) => u.email === email);
  if (!user || password !== 'demo123') {
    return { error: 'Invalid credentials' };
  }

  const token = await signJwt(user, JWT_SECRET, 60 * 60 * 8);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  // On success, return success flag; client will redirect
  return { success: true };
}

export type { ActionState };
