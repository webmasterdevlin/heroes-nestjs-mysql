import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './create-hero.dto';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('heroes')
@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroService: HeroService) {}

  @ApiOperation({ title: 'Get all heroes' })
  @ApiResponse({ status: 200, description: 'Return all heroes.' })
  @Get()
  async retrieveHeroes() {
    return await this.heroService.getAllFromDb();
  }

  @ApiOperation({ title: 'Get a hero by id' })
  @ApiResponse({ status: 200, description: 'Return a hero by id.' })
  @Get(':id')
  async retrieveHero(@Param('id') id: string) {
    const hero = await this.heroService.getById(id);
    if (hero) {
      return hero;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Item Not Found',
        },
        404,
      );
    }
  }

  @ApiOperation({ title: 'Create hero' })
  @ApiResponse({
    status: 201,
    description: 'The hero has been successfully created.',
  })
  @Post()
  @UsePipes(new ValidationPipe())
  async saveHero(@Body() heroDto: CreateHeroDto) {
    return await this.heroService.add(heroDto);
  }

  @ApiOperation({ title: 'Update hero' })
  @ApiResponse({
    status: 200,
    description: 'The hero has been successfully updated.',
  })
  @Put(':id')
  async updateHero(@Param('id') id: string, @Body() heroDto: CreateHeroDto) {
    return await this.heroService.update(id, heroDto);
  }

  @ApiOperation({ title: 'Delete hero' })
  @ApiResponse({
    status: 200,
    description: 'The hero has been successfully deleted.',
  })
  @Delete(':id')
  async removeHero(@Param('id') id: string) {
    return await this.heroService.remove(id);
  }
}
