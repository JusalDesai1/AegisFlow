import { NextResponse } from 'next/server';
import { getDashboardSnapshotFromDb } from '@/lib/data';

export async function GET() {
  const snapshot = await getDashboardSnapshotFromDb();
  return NextResponse.json(snapshot, { status: 200 });
}
