import { FilterTypeEnum } from '../../model/app-model/enums/FilterTypeEnum.ts';

const getSearchParamsAsObject = (
  search: string
): { [key: string]: string[] } => {
  const params = new URLSearchParams(search);
  const result: { [key: string]: string[] } = {};

  params.forEach((value, key) => {
    if (!result[key]) {
      result[key] = [];
    }
    // Split the value by commas and decode each part
    const valuesArray = value.split(',').map(decodeURIComponent);
    result[key].push(...valuesArray);
  });

  return result;
};
const getFilterProp = (
  value: FilterTypeEnum
): 'ckIds' | 'psIds' | 'rtIds' | 'ugIds' | undefined => {
  switch (value) {
    case FilterTypeEnum.UP_CUSTOMER_KIND:
      return 'ckIds';
    case FilterTypeEnum.UP_PRICING_STRUCTURE:
      return 'psIds';
    case FilterTypeEnum.UP_USAGE_GROUP:
      return 'ugIds';
    case FilterTypeEnum.UP_RT:
      return 'rtIds';
    default:
      return undefined;
  }
};

function convertTsTypesToTypeId(tsType: string) {
  switch (tsType) {
    case 'DISTRIBUTIVNA TRAFOSTANICA 10/0,4 KV':
      return 8;
    case 'Distributivna trafostanica 35kV':
      return 9;
    case 'Distributivna trafostanica 110kV':
      return 7;
    case 'Distributivna trafostanica':
      return 6;
    default: {
      console.warn('Type of TS Unknown');
      return 6;
    }
  }
}

function convertUpTypesToObjectKey(upType: string) {
  switch (upType) {
    case 'Distribucija, kontrolno':
      return 'customer_kind_1_count';
    case 'Distribucija, kupac - proizvodac':
      return 'customer_kind_3_count';
    case 'Distribucija, kupac':
      return 'customer_kind_2_count';
    case 'Distribucija, razmena': {
      return 'customer_kind_5_count';
    }
    case 'Distribucija, proizvođač':
      return 'customer_kind_4_count';

    default: {
      console.warn('Type of TS Unknown');
      return 'customer_kind_2_count';
    }
  }
}

export {
  convertTsTypesToTypeId,
  convertUpTypesToObjectKey,
  getFilterProp,
  getSearchParamsAsObject
};
