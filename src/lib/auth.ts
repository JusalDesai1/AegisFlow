import crypto from 'crypto';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: 'NDRF' | 'GOVERNMENT' | 'MEDICAL' | 'NGO' | 'ANALYST' | 'CIVILIAN';
  agency: string;
  permissions: string[];
};

export const SESSION_COOKIE_NAME = 'aegis_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const AUTH_SECRET = process.env.AUTH_SECRET || 'development-secret-change-me';

export function createSessionToken(user: SessionUser): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'session' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + SESSION_TTL_SECONDS * 1000 })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

export function verifySessionToken(token: string): SessionUser | null {
  try {
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) return null;

    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as SessionUser & { exp?: number };
    if (!decoded || typeof decoded.email !== 'string') return null;
    if (typeof decoded.exp === 'number' && decoded.exp < Date.now()) return null;

    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      agency: decoded.agency,
      permissions: decoded.permissions,
    };
  } catch {
    return null;
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  };
}
