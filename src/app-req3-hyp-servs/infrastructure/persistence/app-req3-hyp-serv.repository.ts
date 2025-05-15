import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { AppReq3HypServ } from '../../domain/app-req3-hyp-serv';

export abstract class AppReq3HypServRepository {
  abstract create(data: Omit<AppReq3HypServ, 'COD_CHIAVE' | 'createdAt' | 'updatedAt'>): Promise<AppReq3HypServ>;

  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<AppReq3HypServ[]>;

  abstract findById(COD_CHIAVE: AppReq3HypServ['COD_CHIAVE']): Promise<NullableType<AppReq3HypServ>>;

  abstract findByIds(ids: AppReq3HypServ['COD_CHIAVE'][]): Promise<AppReq3HypServ[]>;

  abstract update(COD_CHIAVE: AppReq3HypServ['COD_CHIAVE'], payload: DeepPartial<AppReq3HypServ>): Promise<AppReq3HypServ | null>;

  abstract remove(COD_CHIAVE: AppReq3HypServ['COD_CHIAVE']): Promise<void>;
}
