import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class OthersFiltersDto<T> {
  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  key: keyof T;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  value: string;
}
