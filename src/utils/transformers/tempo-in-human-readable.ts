import { format as formatDate } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { it } from 'date-fns/locale';

export class TempoOperatoreToSessantesimiTransformer {
  /**
   * Converte un numero decimale (dove la parte decimale rappresenta i minuti)
   * in un formato hh:mm.
   * @param oreDecimali Numero decimale che rappresenta ore e minuti.
   * @returns Stringa nel formato hh:mm.
   */
  convertiOreInFormatoHHMM(oreDecimali: number): string {
    const ore = Math.floor(oreDecimali); // Parte intera rappresenta le ore
    const minutiDecimali = oreDecimali - ore; // Parte decimale rappresenta i minuti
    const minuti = Math.round(minutiDecimali * 60); // Converti i minuti in base 60

    // Formatta il risultato in hh:mm
    return `${String(ore).padStart(2, '0')}:${String(minuti).padStart(2, '0')}`;
  }

  convertiInGiorno(date: Date): string {
    const now = new Date();
    const diffDays = differenceInDays(date, now);
    const formattedDate = formatDate(date, 'EEE dd MMM yy', { locale: it });

    if (diffDays > 0) {
      return `${formattedDate} (${diffDays} giorni)`;
    }

    return `${formattedDate}`;
  }

  convertiPerServizioHG(date: Date): string {
    const formattedDate = formatDate(date, 'yyyyMMdd', { locale: it });

    return `${formattedDate}`;
  }

  convertInMinuti(tempo: string): string {
    const tempoFloat = parseFloat(tempo);
    const ore = Math.floor(tempoFloat);
    const minutiDecimali = tempoFloat - ore;
    const minuti = Math.round(minutiDecimali * 60);
    return String(ore * 60 + minuti);
  }
}
