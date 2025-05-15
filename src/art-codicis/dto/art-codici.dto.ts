import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ArtCodiciDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
