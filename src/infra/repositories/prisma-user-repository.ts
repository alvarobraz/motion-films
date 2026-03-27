import { prisma } from '@/lib/prisma';
import { IUserRepository } from '@/domain/repositories/user-repository';
import { User } from '@prisma/client';

export class PrismaUserRepository implements IUserRepository {
  /**
   * Busca um usuário pelo e-mail único.
   * Utilizado no fluxo de Login e Verificação de duplicidade.
   */
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
