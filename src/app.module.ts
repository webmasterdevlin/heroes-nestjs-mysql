import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroModule } from './hero/hero.module';
import { VillainModule } from './villain/villain.module';

@Module({
  imports: [TypeOrmModule.forRoot(), HeroModule, VillainModule],
})
export class AppModule {}
