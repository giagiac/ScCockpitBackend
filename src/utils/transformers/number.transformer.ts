import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class NumberToDecimalTransformer implements ValueTransformer {
  to(value: number): number {
    return value; // Nessuna trasformazione necessaria verso il database
  }

  from(value: number | string): number {
    return value !== null && value !== undefined
      ? new Decimal(value).toNumber()
      : value;
  }
}
