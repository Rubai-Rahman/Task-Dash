import { cookies } from 'next/headers';
import { verifyJwt, JwtPayload } from './jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const COOKIE_NAME = 'taskdash_session';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
};

export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verifyJwt(token, JWT_SECRET);
  if (!payload) return null;
  const { id, email, name, role } = payload as JwtPayload as SessionUser;
  if (!id || !email || !role) return null;
  return { id, email, name: name as string, role };
}

export { COOKIE_NAME, JWT_SECRET };
