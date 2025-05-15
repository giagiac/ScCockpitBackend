import { Module } from '@nestjs/common';
import { AppReq3HypServsService } from './app-req3-hyp-servs.service';
import { AppReq3HypServsController } from './app-req3-hyp-servs.controller';
import { RelationalAppReq3HypServPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalAppReq3HypServPersistenceModule
  : RelationalAppReq3HypServPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [AppReq3HypServsController],
  providers: [AppReq3HypServsService],
  exports: [AppReq3HypServsService, infrastructurePersistenceModule],
})
export class AppReq3HypServsModule {}
