import { IsNotEmpty } from 'class-validator';

export class CreateHeroDto {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly house: string;
  @IsNotEmpty()
  readonly knownAs: string;
}
