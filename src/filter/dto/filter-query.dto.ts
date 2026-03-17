import { IsEnum } from 'class-validator';

export enum FilterType {
  long = 'long',
  short = 'short',
}

export class FilterQueryDTO {
  @IsEnum(FilterType)
  filter: FilterType;
}
