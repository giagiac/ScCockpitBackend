import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'ART_CODICI',
})
export class ArtCodiciEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  TIPO_CODICE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  COD_ART?: string | null;

  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  COD_SECONDARIO_ART: string;
}
