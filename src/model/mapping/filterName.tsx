import { FilterTypeEnum } from '../app-model/enums/FilterTypeEnum.ts';

export const filterName = [
  { label: 'Usage Point Type', value: FilterTypeEnum.UP_TYPE },
  { label: 'Usage Group', value: FilterTypeEnum.UP_USAGE_GROUP },
  { label: 'Pricing Structure', value: FilterTypeEnum.UP_PRICING_STRUCTURE },
  { label: 'Reading Type', value: FilterTypeEnum.UP_RT },
  { label: 'Customer Kind', value: FilterTypeEnum.UP_CUSTOMER_KIND }
];
