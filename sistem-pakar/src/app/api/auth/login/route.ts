import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json(
        { error: 'Username atau password salah!' },
        { status: 401 }
      );
    }

    // Set expiration: 24 hours
    const duration = 24 * 60 * 60 * 1000;
    const expiresAt = Date.now() + duration;

    // Sign the session token
    const token = await signToken(username, expiresAt);

    // Set the cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours in seconds
    });

    return NextResponse.json({ success: true, message: 'Login berhasil!' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}
