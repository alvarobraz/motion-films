'use server';

import { cookies } from 'next/headers';
import { loginSchema, LoginInput } from '@/lib/schemas';
import { PrismaUserRepository } from '@/infra/repositories/prisma-user-repository';
import { BcryptService } from '@/infra/services/bcrypt-service';
import { JwtService } from '@/infra/services/jwt-service';
import { LoginUseCase } from '@/application/use-cases/login-use-case';
const loginUseCase = new LoginUseCase(
  new PrismaUserRepository(),
  new BcryptService(),
  new JwtService()
);

export async function loginAction(data: LoginInput) {
  try {
    const validated = loginSchema.parse(data);

    const { token } = await loginUseCase.execute(validated);

    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Erro ao processar login',
    };
  }
}
