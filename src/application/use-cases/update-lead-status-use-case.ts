import {
  ILeadRepository,
  LeadStatus,
} from '@/domain/repositories/lead-repository';

export class UpdateLeadStatusUseCase {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(id: string, status: LeadStatus) {
    const lead = await this.leadRepository.findById(id);
    if (!lead) throw new Error('Lead não encontrado para atualização.');

    return await this.leadRepository.updateStatus(id, status);
  }
}
