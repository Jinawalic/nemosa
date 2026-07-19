import { NextResponse } from 'next/server';
import { getAdminDashboardData } from '@/lib/admin-dashboard';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getAdminDashboardData();
  return NextResponse.json(data);
}
