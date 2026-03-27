import { IUserRepository } from '@/domain/repositories/user-repository';
import { IHashService, ITokenService } from '@/domain/services/auth-service';
import { LoginInput } from '@/lib/schemas';

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private tokenService: ITokenService
  ) {}

  async execute({ email, password }: LoginInput) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await this.hashService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = await this.tokenService.generate({
      userId: user.id,
      email: user.email,
    });

    return { token };
  }
}
