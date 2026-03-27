import bcrypt from 'bcryptjs';
import { IHashService } from '@/domain/services/auth-service';

export class BcryptService implements IHashService {
  private readonly SALT_ROUNDS = 10;

  /**
   * Gera um hash seguro a partir de uma senha em texto puro.
   * Útil para o Use Case de criação de usuário.
   */
  async hash(plain: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return await bcrypt.hash(plain, salt);
  }

  /**
   * Compara a senha enviada no login com o hash salvo no banco.
   */
  async compare(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
