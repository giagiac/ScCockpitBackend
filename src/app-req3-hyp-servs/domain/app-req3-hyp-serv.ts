import { ApiProperty } from '@nestjs/swagger';

export class AppReq3HypServ {
  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  COD_CHIAVE: number;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  NUM_AZIENDA?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  COD_REQ3_HYPSERV: string;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  PROGR?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  UTENTE_FROM?: string | null;

  // Nuove proprietà
  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  DATAORA_RICHIESTA?: Date;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  CHIAVE_ESTERNA?: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  CAMPO_PARAMETRI?: string;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  FLAG_STATUS?: number;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  DATAORA_INIZIO_ELAB?: Date;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  UTENTE_ELAB?: string;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  DATAORA_FINE_ELAB?: Date;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  FLAG_ESITO_ELAB?: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  STRINGA_ESITO_ELAB?: string;
}
