import {
  // common
  Module,
} from '@nestjs/common';
import { ArtCodicisService } from './art-codicis.service';
import { ArtCodicisController } from './art-codicis.controller';
import { RelationalArtCodiciPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? RelationalArtCodiciPersistenceModule
  : RelationalArtCodiciPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [ArtCodicisController],
  providers: [ArtCodicisService],
  exports: [ArtCodicisService, infrastructurePersistenceModule],
})
export class ArtCodicisModule {}
