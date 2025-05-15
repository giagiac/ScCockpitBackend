import {
  // decorators here

  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateArtCodiciDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  COD_SECONDARIO_ART: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  TIPO_CODICE?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  COD_ART?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
