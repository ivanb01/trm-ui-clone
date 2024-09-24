import { ColumnsType } from '../../model/app-model/types/DataTypeColumn.ts';
import { UsagePointDTO } from '../../model/interface/usagePoint/UsagePointDTO.ts';

export const tableColumns: ColumnsType<UsagePointDTO> = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Name'
  },
  {
    dataIndex: 'notice',
    key: 'notice',
    title: 'Notice'
  },
  {
    dataIndex: 'usagePointType',
    key: 'usagePointType',
    title: 'Usage Point Type'
  },
  {
    dataIndex: 'pricingStructure',
    key: 'pricingStructure',
    title: 'Pricing Structure'
  },
  {
    dataIndex: 'customerKind',
    key: 'customerKind',
    title: 'Customer Kind'
  },
  {
    dataIndex: 'usageGroup',
    key: 'usageGroup',
    title: 'Usage Group'
  },
  {
    dataIndex: 'address',
    key: 'address',
    title: 'Address'
  },
  {
    dataIndex: 'location',
    key: 'location',
    render: (location) => `${location?.lon}, ${location?.lat}`,
    title: 'Location (Lon, Lat)'
  }
];
