import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, verifySessionToken } from '@/lib/auth';

const validEmails = new Set(['admin@aegis.gov', 'commander@aegis.gov', 'ops@aegis.gov']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '').trim();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const isValid = validEmails.has(email) && password === 'password';
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const user = {
      id: 'user-123',
      email,
      name: email.includes('ops') ? 'Operations Desk Lead' : 'Operations Commander',
      role: 'GOVERNMENT',
      agency: 'National Disaster Management Authority',
      permissions: ['view_dashboard', 'view_gis', 'dispatch_units', 'create_alerts', 'view_analytics'],
    };

    const token = createSessionToken(user);
    const response = NextResponse.json({ success: true, user });
    response.cookies.set('aegis_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('aegis_session')?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = verifySessionToken(token);
  return NextResponse.json({ user }, { status: 200 });
}
