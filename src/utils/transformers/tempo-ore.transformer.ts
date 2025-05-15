import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class TempoOperatoreToDecimalTransformer implements ValueTransformer {
  to(value: number): number {
    return value; // Nessuna trasformazione necessaria verso il database
  }

  from(value: string): number {
    if (value !== null && value !== undefined) {
      const timeParts = value.split(':');
      if (timeParts.length === 2) {
        const hours = new Decimal(timeParts[0]);
        const minutes = new Decimal(timeParts[1]).dividedBy(60);
        return hours.plus(minutes).toNumber();
      }
      throw new Error('Invalid time format. Expected hh:mm');
    }
    return new Decimal(0).toNumber();
  }
}
