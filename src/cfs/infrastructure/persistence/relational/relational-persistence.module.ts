import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticoliCostiCfEntity } from '../../../../articoli-costi-cf/infrastructure/persistence/relational/entities/articoli-costi-cf.entity';
import { CfRepository } from '../cf.repository';
import { CfEntity } from './entities/cf.entity';
import { CfRelationalRepository } from './repositories/cf.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CfEntity, ArticoliCostiCfEntity])],
  providers: [
    {
      provide: CfRepository,
      useClass: CfRelationalRepository,
    },
  ],
  exports: [CfRepository],
})
export class RelationalCfPersistenceModule {}
