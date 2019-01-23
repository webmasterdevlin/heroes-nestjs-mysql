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
import { VillainService } from './villain.service';
import { CreateVillainDto } from './create-Villain.dto';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('villains')
@Controller('villains')
export class VillainsController {
  constructor(private readonly villainService: VillainService) {}

  @ApiOperation({ title: 'Get all villains' })
  @ApiResponse({ status: 200, description: 'Return all villains.' })
  @Get()
  async retrieveVillains() {
    return await this.villainService.getAllFromDb();
  }

  @Get(':id')
  async retrieveVillain(@Param('id') id: string) {
    const villain = await this.villainService.getById(id);
    if (villain) {
      return villain;
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

  @ApiOperation({ title: 'Create villain' })
  @ApiResponse({
    status: 201,
    description: 'The villain has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  @UsePipes(new ValidationPipe())
  async saveVillain(@Body() villainDto: CreateVillainDto) {
    console.log('CNTRL_BODY:', villainDto);
    return await this.villainService.add(villainDto);
  }

  @ApiOperation({ title: 'Update villain' })
  @ApiResponse({
    status: 201,
    description: 'The villain has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async updateVillain(
    @Param('id') id: string,
    @Body() villainDto: CreateVillainDto,
  ) {
    return await this.villainService.update(id, villainDto);
  }

  @ApiOperation({ title: 'Delete villain' })
  @ApiResponse({
    status: 201,
    description: 'The villain has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async removeVillain(@Param('id') id: string) {
    return await this.villainService.remove(id);
  }
}
