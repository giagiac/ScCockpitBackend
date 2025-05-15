import { Module } from '@nestjs/common';
import { ArtCodiciRepository } from '../art-codici.repository';
import { ArtCodiciRelationalRepository } from './repositories/art-codici.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtCodiciEntity } from './entities/art-codici.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtCodiciEntity])],
  providers: [
    {
      provide: ArtCodiciRepository,
      useClass: ArtCodiciRelationalRepository,
    },
  ],
  exports: [ArtCodiciRepository],
})
export class RelationalArtCodiciPersistenceModule {}
