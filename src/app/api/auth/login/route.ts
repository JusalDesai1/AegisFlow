import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME, createSessionToken } from '@/lib/auth';
import { defaultPermissionsByRole } from '@/types';

export const demoUser = {
  id: 'user-123',
  email: 'admin@aegis.gov',
  name: 'Operations Commander',
  role: 'GOVERNMENT',
  agency: 'National Disaster Management Authority',
  permissions: defaultPermissionsByRole.GOVERNMENT,
};

export function authorizeRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function createAuthenticatedResponse(response: NextResponse, user = demoUser) {
  const token = createSessionToken(user);
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return response;
}
