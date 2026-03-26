'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { loginSchema, LoginInput } from '@/lib/schemas';

export async function loginAction(data: LoginInput) {
  try {
    const validated = loginSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      return { success: false, message: 'Credenciais inválidas' };
    }

    const isPasswordValid = await bcrypt.compare(
      validated.password,
      user.password
    );

    if (!isPasswordValid) {
      return { success: false, message: 'Credenciais inválidas' };
    }

    // Gerar JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);

    // Setar Cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return { success: true };
  } catch (error) {
    console.log('error ->', error);
    return { success: false, message: 'Erro ao processar login' };
  }
}
