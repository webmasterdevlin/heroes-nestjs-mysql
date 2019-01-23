import { IsNotEmpty } from 'class-validator';

export class CreateVillainDto {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly house: string;
  @IsNotEmpty()
  readonly knownAs: string;
}
