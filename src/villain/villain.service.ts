import { Repository } from 'typeorm';
import { VillainEntity } from './villain.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVillainDto } from './create-villain.dto';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class VillainService {
  constructor(
    @InjectRepository(VillainEntity)
    private readonly villainRepository: Repository<VillainEntity>,
  ) {}

  async getAllFromDb(): Promise<VillainEntity[]> {
    return await this.villainRepository.find();
  }

  async getById(id: string): Promise<VillainEntity> {
    return await this.villainRepository.findOne({ id });
  }

  async add(villainDto: CreateVillainDto): Promise<VillainEntity> {
    return await this.villainRepository.save(villainDto);
  }

  async update(
    id: string,
    villainDto: CreateVillainDto,
  ): Promise<VillainEntity> {
    const villainToUpdate: VillainEntity = await this.villainRepository.findOne(
      { id },
    );
    let updated: VillainEntity = Object.assign(villainToUpdate, villainDto);
    // villainRepository.save not update, base on TypeORM's docs
    return await this.villainRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.villainRepository.delete({ id });
  }
}
