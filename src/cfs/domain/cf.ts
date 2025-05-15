import { ApiProperty } from '@nestjs/swagger';
import { CfComm } from '../../cf-comms/domain/cf-comm';
import { ArticoliCostiCf } from '../../articoli-costi-cf/domain/articoli-costi-cf';

export class Cf {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COD_FISC_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  P_IVA_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  RAG_SOC_CF_INT?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  RAG_SOC_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  COD_CF: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  REGIONE?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  STATO_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  PROVINCIA_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  COMUNE_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  CAP_CF?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  INDI_CF?: string | null;

  @ApiProperty({
    type: () => Array<CfComm | null>,
  })
  cfComm?: CfComm[] | null;

  @ApiProperty({
    type: () => Array<ArticoliCostiCf | null>,
  })
  articoliCostiCf?: ArticoliCostiCf[] | null;
}
