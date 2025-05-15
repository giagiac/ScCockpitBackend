import { FilterDto, SortDto } from '../../../utils/dto/filter-column';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Cf } from '../../domain/cf';
import { CfDto } from '../../dto/cf.dto';

export abstract class CfRepository {
  abstract create(data: Omit<Cf, 'id' | 'createdAt' | 'updatedAt'>): Promise<Cf>;

  abstract findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    join,
  }: {
    filterOptions?: Array<FilterDto<CfDto>> | null;
    sortOptions?: Array<SortDto<CfDto>> | null;
    paginationOptions: IPaginationOptions;
    join: boolean;
  }): Promise<{ cf: Array<Cf>; count: number }>;

  abstract findById(id: Cf['COD_CF']): Promise<NullableType<Cf>>;

  abstract findByIds(ids: Cf['COD_CF'][]): Promise<Cf[]>;

  abstract update(id: Cf['COD_CF'], payload: DeepPartial<Cf>): Promise<Cf | null>;

  abstract remove(id: Cf['COD_CF']): Promise<void>;
}
