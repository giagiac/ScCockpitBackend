import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';

@Entity({
  name: 'APP_REQ3_HYPSERV',
})
export class AppReq3HypServEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  COD_CHIAVE: number;

  @Column({
    nullable: true,
    type: Number,
  })
  NUM_AZIENDA?: number | null;

  @Column({
    nullable: false,
    type: String,
  })
  COD_REQ3_HYPSERV: string;

  @Column({
    nullable: true,
    type: Number,
  })
  PROGR?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  UTENTE_FROM?: string | null;

  // Nuove proprietà
  @Column({
    nullable: true,
    type: 'timestamp',
  })
  DATAORA_RICHIESTA?: Date;

  @Column({
    nullable: true,
    type: String,
  })
  CHIAVE_ESTERNA?: string;

  @Column({
    nullable: true,
    type: String,
  })
  CAMPO_PARAMETRI?: string;

  @Column({
    nullable: true,
    type: Number,
  })
  FLAG_STATUS?: number;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  DATAORA_INIZIO_ELAB?: Date;

  @Column({
    nullable: true,
    type: String,
  })
  UTENTE_ELAB?: string;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  DATAORA_FINE_ELAB?: Date;

  @Column({
    nullable: true,
    type: Number,
  })
  FLAG_ESITO_ELAB?: number;

  @Column({
    nullable: true,
    type: String,
  })
  STRINGA_ESITO_ELAB?: string;

  // riferimento inverso a eps-nestjs-orp-eff-cicli-esec
  @OneToOne(() => EpsNestjsOrpEffCicliEsecEntity, (epsNestjsOrpEffCicliEsec) => epsNestjsOrpEffCicliEsec.hypServReq2)
  @JoinColumn({
    name: 'COD_CHIAVE',
    referencedColumnName: 'APP_REQ3_HYPSERV_COD_CHIAVE',
  })
  epsNestjsOrpEffCicliEsec?: EpsNestjsOrpEffCicliEsecEntity | null;
}
