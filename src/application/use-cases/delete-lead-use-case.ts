import { ILeadRepository } from '@/domain/repositories/lead-repository';

export class DeleteLeadUseCase {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(id: string) {
    const lead = await this.leadRepository.findById(id);
    if (!lead) throw new Error('Lead não encontrado para exclusão.');

    return await this.leadRepository.delete(id);
  }
}
