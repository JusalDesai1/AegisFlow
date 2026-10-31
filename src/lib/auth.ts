import crypto from 'crypto';

const AUTH_SECRET = process.env.AUTH_SECRET;

if (process.env.NODE_ENV === 'production' && !AUTH_SECRET) {
  throw new Error('AUTH_SECRET must be set in production.');
}

export const SESSION_COOKIE_NAME = 'aegis_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const DEVELOPMENT_SECRET = 'development-secret-change-me';
const ACTIVE_SECRET = AUTH_SECRET || DEVELOPMENT_SECRET;

export function createSessionToken(user: {
  id: string;
  email: string;
  name: string;
  role: 'NDRF' | 'GOVERNMENT' | 'MEDICAL' | 'NGO' | 'ANALYST' | 'CIVILIAN';
  agency: string;
  permissions: string[];
}) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'session' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({ ...user, exp: Date.now() + SESSION_TTL_SECONDS * 1000 }),
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', ACTIVE_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

export function verifySessionToken(token: string) {
  try {
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) return null;

    const expectedSignature = crypto
      .createHmac('sha256', ACTIVE_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      id: string;
      email: string;
      name: string;
      role: 'NDRF' | 'GOVERNMENT' | 'MEDICAL' | 'NGO' | 'ANALYST' | 'CIVILIAN';
      agency: string;
      permissions: string[];
      exp?: number;
    };

    if (!decoded || typeof decoded.email !== 'string') return null;
    if (typeof decoded.exp === 'number' && decoded.exp < Date.now()) return null;

    return decoded;
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
