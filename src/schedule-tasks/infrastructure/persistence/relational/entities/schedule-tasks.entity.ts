import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'schedule_tasks',
})
export class ScheduleTasksEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// ------------------------------

interface Distance {
  text: string;
  value: number;
}

interface Duration {
  text: string;
  value: number;
}

interface Element {
  distance: Distance;
  duration: Duration;
  status: 'OK';
}

interface Row {
  elements: Element[];
}

export interface ApiResponse {
  rows: Row[];
  originAddresses: string[];
  destinationAddresses: string[];
}

// ------------------------------
// -------- SERVIZIO HG ---------
// ------------------------------

export enum FLAG_ESITO_ELAB {
  _0_FALLITO = 0,
  _1_RIUSCITA = 1,
}

export enum FLAG_STATUS {
  _0_IN_FASE_DI_COMPOSIZIONE = 0,
  _1_DA_ELABORARE = 1,
  _2_IN_ELABORAZIONE = 2,
  _3_ELABORATA = 3,
}

export enum HYPSERV_REQ2_TIPO_RICHIESTA {
  ESECUZIONI = '1',
}

export enum APP_REQ3_HYPSERV_TIPO_RICHIESTA {
  DOCUMENTI = '1',
  COMPONENTI_ORP_EFF = '10',
}

export const separator = '\r\n';

// ------------------------------
// -------- TIPI ERRORI ---------
// ------------------------------

export enum TIPO_ERRORI_SYNC {
  DATI_SET_MINIMO = 'Dati set minimo non definito (DOC_RIGA_ID - COD_OP - DATA_INIZIO - DATA_FINE - TEMPO_OPERATORE)',
  LINK_ORP_ORD = 'Nessun ordine collegato (linkOrpOrd)', // NO ORDINE COLLEGATO
  ORD_CLI_RIGHE_DOC_RIGA_ID = 'Nessun ordine cliente righe doc riga id collegato', // NO ORDINE COLLEGATO
  ORD_CLI_RIGHE_COD_OP = 'Nessun ordine cliente righe codice operatore collegato', // NO ORDINE COLLEGATO
  ORD_CLI_RIGHE_DATA_INIZIO = 'Nessun ordine cliente righe data inizio collegato', // NO ORDINE COLLEGATO
  ORD_CLI_RIGHE_DATA_FINE = 'Nessun ordine cliente righe data fine collegato', // NO ORDINE COLLEGATO
  ORD_CLI_RIGHE_TEMPO_OPERATORE = 'Nessun ordine cliente righe tempo operatore collegato', // NO ORDINE COLLEGATO
  ORD_CLI_RIGHE_COD_CF = 'Nessun ordine collegato', // NO ORDINE COLLEGATO
  ORD_CLI_RIGHE_CF_COMM_ID = 'Nessun ordine cliente righe codice fiscale commessa ID collegato', // NO ORDINE COLLEGATO
  COD_ART_TARGA_MEZZO = 'Nessun codice articolo targa mezzo collegato',
  COD_ART_COMP = 'Nessun codice articolo componente collegato',
  COD_ART_COSTI_CF_DEFAULT = 'Nessun codice articolo costi codice fiscale default collegato',
  RUOLO_TIPO_AUTISTA = 'Nessun ruolo tipo autista collegato',

  LINK_ORP_EFF = 'Nessun link orp effettivo collegato',

  ORD_CLI = 'Nessun ordine cliente collegato',
  ORD_CLI_CF = 'Nessun ordine cliente codice fiscale collegato',
  ORD_CLI_CF_COMM = 'Nessun ordine cliente codice fiscale commessa collegato',
  ORD_CLI_RIGHE = 'Nessun ordine cliente righe collegato',

  DESTINAZIONE_INCOMPLETA = 'Destinazione indirizzo o comune incompleta',
}
