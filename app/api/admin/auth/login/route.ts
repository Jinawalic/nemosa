import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createAdminSessionToken, getAdminSessionCookieName } from '@/lib/admin-session';
import { verifyAdminPassword } from '@/lib/admin-password';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      remember?: boolean;
    };

    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? '';
    const remember = Boolean(body.remember);

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !admin.isActive) {
      return NextResponse.json({ error: 'Invalid admin credentials.' }, { status: 401 });
    }

    const isPasswordValid = verifyAdminPassword(password, admin.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid admin credentials.' }, { status: 401 });
    }

    const sessionToken = await createAdminSessionToken(admin.email, remember);
    const response = NextResponse.json({ success: true, message: 'Login successful.' });
    response.cookies.set(getAdminSessionCookieName(), sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error('Admin login failed:', error);
    return NextResponse.json({ error: 'Unable to log in. Please try again.' }, { status: 500 });
  }
}
