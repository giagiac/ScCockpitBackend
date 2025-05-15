import { ApiProperty } from '@nestjs/swagger';

export class ArtCodici {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  COD_SECONDARIO_ART: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  TIPO_CODICE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_ART?: string | null;
}
