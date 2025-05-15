import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ScheduleTasks } from '../../domain/schedule-tasks';

export abstract class ScheduleTasksRepository {
  abstract create(data: Omit<ScheduleTasks, 'id' | 'createdAt' | 'updatedAt'>): Promise<ScheduleTasks>;

  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<ScheduleTasks[]>;

  abstract findAllEsec(id: ScheduleTasks['id'] | null): Promise<any>;

  abstract findById(id: ScheduleTasks['id']): Promise<NullableType<ScheduleTasks>>;

  abstract findByIds(ids: ScheduleTasks['id'][]): Promise<ScheduleTasks[]>;

  abstract update(id: ScheduleTasks['id'], payload: DeepPartial<ScheduleTasks>): Promise<ScheduleTasks | null>;

  abstract remove(id: ScheduleTasks['id']): Promise<void>;
}
