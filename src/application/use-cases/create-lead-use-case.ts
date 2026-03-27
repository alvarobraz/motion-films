import {
  ILeadRepository,
  CreateLeadDTO,
} from '@/domain/repositories/lead-repository';

export class CreateLeadUseCase {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(data: CreateLeadDTO) {
    const emailExists = await this.leadRepository.findByEmail(data.email);
    if (emailExists) {
      throw new Error('Este e-mail já possui uma solicitação em andamento.');
    }

    const phoneExists = await this.leadRepository.findByPhone(data.phone);
    if (phoneExists) {
      throw new Error('Este telefone já está vinculado a um lead existente.');
    }

    return await this.leadRepository.create(data);
  }
}
