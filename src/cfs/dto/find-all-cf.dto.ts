import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { FilterDto, SortDto } from '../../utils/dto/filter-column';
import { OthersFiltersDto } from '../../utils/dto/others-filters';
import { CfDto, JoinDto } from './cf.dto';
import { Cf } from '../domain/cf';

export class FindAllCfDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(Array<OthersFiltersDto<JoinDto>>, JSON.parse(value))
      : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => OthersFiltersDto)
  othersFilters?: OthersFiltersDto<JoinDto>[] | null;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(Array<FilterDto<CfDto>>, JSON.parse(value))
      : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters?: FilterDto<CfDto>[] | null;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(Array<SortDto<Cf>>, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortDto)
  sort?: SortDto<Cf>[] | null;
}
