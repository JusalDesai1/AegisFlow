import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('aegis_session')?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = verifySessionToken(token);
  return NextResponse.json({ user: user ?? null }, { status: 200 });
}
