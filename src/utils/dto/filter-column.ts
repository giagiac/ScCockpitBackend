import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';

export class FilterDto<T> {
  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  columnName: keyof T;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  value: string;
}

export class SortDto<T> {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof T;

  @ApiProperty()
  @IsString()
  order: string;
}

export function applicaWhereLike(
  columnName: string,
  queryBuilder: SelectQueryBuilder<any>,
  filtri: Array<FilterDto<any>> | null,
) {
  if (filtri && filtri.length > 0) {
    filtri.forEach((filtro) => {
      if (filtro.columnName && filtro.value) {
        queryBuilder.andWhere(
          `LOWER(${columnName}.${filtro.columnName.toString()}) like LOWER('${filtro.value}%')`,
        );
      }
    });
  }
}

export function applicaWhereFullLike(
  columnName: string,
  queryBuilder: SelectQueryBuilder<any>,
  filtri: Array<FilterDto<any>> | null,
) {
  if (filtri && filtri.length > 0) {
    filtri.forEach((filtro) => {
      if (filtro.columnName && filtro.value) {
        queryBuilder.andWhere(
          `LOWER(${columnName}.${filtro.columnName.toString()}) like LOWER('%${filtro.value}%')`,
        );
      }
    });
  }
}

export function applicaSort(
  columnName: string,
  queryBuilder: SelectQueryBuilder<any>,
  sort: Array<SortDto<any>> | null,
) {
  if (sort && sort.length > 0) {
    sort.forEach((sortItem) => {
      if (sortItem.orderBy && sortItem.order) {
        queryBuilder.addOrderBy(
          `LPAD(${columnName}.${String(sortItem.orderBy)},10)`,
          sortItem.order.toUpperCase() as any,
        );
      }
    });
  }
}
