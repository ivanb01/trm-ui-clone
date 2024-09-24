import { FilterTypeEnum } from '../enums/FilterTypeEnum.ts';

export interface FilterItem {
  active: boolean;
  type: FilterTypeEnum;
  values: Array<number>;
}

export type FilterDefinition = Array<FilterItem>;
