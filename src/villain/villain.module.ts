import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VillainEntity } from './villain.entity';
import { VillainService } from './villain.service';
import { VillainsController } from './villains.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VillainEntity])],
  providers: [VillainService],
  controllers: [VillainsController],
  exports: [VillainService],
})
export class VillainModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
