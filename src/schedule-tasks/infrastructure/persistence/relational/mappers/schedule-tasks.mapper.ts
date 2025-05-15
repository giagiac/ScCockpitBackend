import { ScheduleTasks } from '../../../../domain/schedule-tasks';
import { ScheduleTasksEntity } from '../entities/schedule-tasks.entity';

export class ScheduleTasksMapper {
  static toDomain(raw: ScheduleTasksEntity): ScheduleTasks {
    const domainEntity = new ScheduleTasks();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ScheduleTasks): ScheduleTasksEntity {
    const persistenceEntity = new ScheduleTasksEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
