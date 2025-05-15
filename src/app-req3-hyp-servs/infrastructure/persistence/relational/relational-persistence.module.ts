import { Module } from '@nestjs/common';
import { AppReq3HypServRepository } from '../app-req3-hyp-serv.repository';
import { AppReq3HypServRelationalRepository } from './repositories/app-req3-hyp-serv.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppReq3HypServEntity } from './entities/app-req3-hyp-serv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppReq3HypServEntity])],
  providers: [
    {
      provide: AppReq3HypServRepository,
      useClass: AppReq3HypServRelationalRepository,
    },
  ],
  exports: [AppReq3HypServRepository],
})
export class RelationalAppReq3HypServPersistenceModule {}
