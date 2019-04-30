import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroEntity } from './hero.entity';
import { HeroService } from './hero.service';
import { HeroesController } from './heroes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HeroEntity])],
  providers: [HeroService],
  controllers: [HeroesController],
  exports: [HeroService],
})
export class HeroModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
