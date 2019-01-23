import { Repository } from 'typeorm';
import { HeroEntity } from './hero.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHeroDto } from './create-hero.dto';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(HeroEntity)
    private readonly heroRepository: Repository<HeroEntity>,
  ) {}

  async getAllFromDb(): Promise<HeroEntity[]> {
    try {
      return await this.heroRepository.find();
    } catch (e) {
      throw e.message;
    }
  }

  async getById(id: string): Promise<HeroEntity> {
    try {
      return await this.heroRepository.findOne({ id });
    } catch (e) {
      throw e.message;
    }
  }

  async add(heroDto: CreateHeroDto): Promise<HeroEntity> {
    try {
      return await this.heroRepository.save(heroDto);
    } catch (e) {
      throw e.message;
    }
  }

  async update(id: string, heroDto: CreateHeroDto): Promise<HeroEntity> {
    try {
      const heroToUpdate: HeroEntity = await this.heroRepository.findOne({
        id,
      });
      let updated: HeroEntity = Object.assign(heroToUpdate, heroDto);
      // heroRepository.save not update, base on TypeORM's docs
      return await this.heroRepository.save(updated);
    } catch (e) {
      throw e.message;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.heroRepository.delete({ id });
    } catch (e) {
      throw e.message;
    }
  }
}
