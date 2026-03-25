import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const JWT_SECRET = process.env.JWT_SECRET!;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { error: 'Credenciais inválidas' },
      { status: 401 }
    );
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

  const response = NextResponse.json({ success: true });

  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400, // 1 day
    path: '/',
  });

  return response;
}
