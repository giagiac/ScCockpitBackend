import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export enum DEFAULT {
  COD_CF = 'DEFAULT_CF',
}

@Entity({
  name: 'CF',
})
export class CfEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  COD_FISC_CF?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  P_IVA_CF?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  RAG_SOC_CF_INT?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  RAG_SOC_CF?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  @PrimaryColumn()
  COD_CF: string;

  @Column({
    nullable: true,
    type: String,
  })
  REGIONE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  STATO_CF?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  PROVINCIA_CF?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  COMUNE_CF?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  CAP_CF?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  INDI_CF?: string | null;
}
