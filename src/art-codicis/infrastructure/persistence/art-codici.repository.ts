import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ArtCodici } from '../../domain/art-codici';

export abstract class ArtCodiciRepository {
  abstract create(
    data: ArtCodici,
  ): Promise<ArtCodici>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ArtCodici[]>;

  abstract findById(COD_SECONDARIO_ART: ArtCodici['COD_SECONDARIO_ART']): Promise<NullableType<ArtCodici>>;

  abstract findByIds(ids: ArtCodici['COD_SECONDARIO_ART'][]): Promise<ArtCodici[]>;

  abstract update(
    COD_SECONDARIO_ART: ArtCodici['COD_SECONDARIO_ART'],
    payload: DeepPartial<ArtCodici>,
  ): Promise<ArtCodici | null>;

  abstract remove(COD_SECONDARIO_ART: ArtCodici['COD_SECONDARIO_ART']): Promise<void>;
}
