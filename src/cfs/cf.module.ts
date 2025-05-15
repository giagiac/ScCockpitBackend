import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { CfController } from './cf.controller';
import { CfService } from './cf.service';
import { RelationalCfPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalCfPersistenceModule
  : RelationalCfPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [CfController],
  providers: [CfService],
  exports: [CfService, infrastructurePersistenceModule],
})
export class CfModule {}
