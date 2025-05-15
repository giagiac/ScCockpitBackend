import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ScheduleTasks } from './domain/schedule-tasks';
import { CreateScheduleTasksDto } from './dto/create-schedule-tasks.dto';
import { UpdateScheduleTasksDto } from './dto/update-schedule-tasks.dto';
import { ScheduleTasksRepository } from './infrastructure/persistence/schedule-tasks.repository';

@Injectable()
export class ScheduleTasksService implements OnApplicationBootstrap {
  constructor(
    // Dependencies here
    private readonly scheduleTasksRepository: ScheduleTasksRepository,
    private readonly logger: Logger,
    // private readonly appReq3HypServRepository : AppReq3HypServRepository
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createScheduleTasksDto: CreateScheduleTasksDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.scheduleTasksRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }) {
    return this.scheduleTasksRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findAllEsec() {
    return this.scheduleTasksRepository.findAllEsec(null);
  }

  findAllEsecById(id: ScheduleTasks['id']) {
    return this.scheduleTasksRepository.findAllEsec(id);
  }

  findById(id: ScheduleTasks['id']) {
    return this.scheduleTasksRepository.findById(id);
  }

  findByIds(ids: ScheduleTasks['id'][]) {
    return this.scheduleTasksRepository.findByIds(ids);
  }

  async update(
    id: ScheduleTasks['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateScheduleTasksDto: UpdateScheduleTasksDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.scheduleTasksRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ScheduleTasks['id']) {
    return this.scheduleTasksRepository.remove(id);
  }

  // -------------------------------------------------------------

  async onApplicationBootstrap() {
    // this.logger.log('1. Avvio dell\'attività asincrona all\'avvio dell\'applicazione...');
    // await this.myAsyncTask();
    // this.logger.log('4. Attività asincrona completata all\'avvio.');
  }

  // private readonly logger = new Logger(ScheduleTasksService.name);

  // async createEsec() {
  //   // Do not remove comment below.
  //   // <creating-property />

  //   // this.epsNestjsOrpEffCicliEsecRepository.findAllEsec()

  //   // return this.scheduleTasksRepository.create({
  //   //   // Do not remove comment below.
  //   //   // <creating-property-payload />
  //   // });

  //   // const allEsec = this.scheduleTasksRepository.findAllEsec();

  //   return [];
  // }

  // async myAsyncTask() {
  //   this.createEsec();
  //   this.logger.log('2. Esecuzione della funzione asincrona...');
  //   // Qui inserisci la logica della tua funzione
  //   await new Promise((resolve) => setTimeout(resolve, 2000)); // Esempio di operazione asincrona
  //   await this.myAsyncTask2();
  //   this.logger.log('3. Funzione asincrona completata.');
  // }

  // async myAsyncTask2() {
  //   this.logger.log('4. Esecuzione della funzione asincrona...');
  //   // Qui inserisci la logica della tua funzione
  //   // this.appReq3HypServRepository.create({
  //   //   COD_REQ3_HYPSERV: Math.floor(Math.random() * 1000000).toString(),
  //   // })
  //   this.logger.log('5. Funzione asincrona completata.');
  // }

  @Cron(process.env.SCCOCKPIT_LIVE_ORDERS_CRON || '59 59 23 * * *', {
    // Esegue la funzione ogni giorno a mezzanotte (00:00)
    name: 'LiveOrders',
    timeZone: 'Europe/Rome', // Specifica il fuso orario (opzionale, ma consigliato)
    waitForCompletion: true, // Aspetta il completamento della funzione prima di eseguire la prossima
    disabled: false, // Disabilita il task se non necessario
  })
  async handleCronLiveOrders() {
    this.logger.log("1. Avvio dell'attività pianificata...");
    // await this.myAsyncTask();
    return await this.scheduleTasksRepository.findAllEsec(null);
  }
}
