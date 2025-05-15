import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CfRepository } from '../cf.repository';
import { CfEntity } from './entities/cf.entity';
import { CfRelationalRepository } from './repositories/cf.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CfEntity])],
  providers: [
    {
      provide: CfRepository,
      useClass: CfRelationalRepository,
    },
  ],
  exports: [CfRepository],
})
export class RelationalCfPersistenceModule {}
