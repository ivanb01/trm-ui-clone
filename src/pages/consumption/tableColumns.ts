import { ColumnFilterItem } from 'antd/es/table/interface';

import { TableDataTypes } from '../../model/app-model/enums/TableDataTypes.ts';
import { TableRowProps } from '../../model/app-model/types/DataTypeColumn.ts';
import { Reading } from '../../model/interface/usagePoint/Reading.ts';
import { getUniqueValues } from '../../utility/helpers/consumption';

export const tableColumns = (data: Reading[]): TableRowProps<Reading> => [
  {
    dataIndex: 'usagePointId',
    filtered: true,
    filters: getUniqueValues(data ?? [], 'usagePointId') as ColumnFilterItem[],
    key: 'usagePointId',
    title: 'ID',
    width: 50
  },
  {
    dataIndex: 'readingTypeName',
    defaultFilteredValue: ['15-minutes delta of total forward active energy'],
    filterMultiple: false,
    filters: getUniqueValues(
      data ?? [],
      'readingTypeName'
    ) as ColumnFilterItem[],

    key: 'readingTypeName',
    title: 'Reading Type Name',
    width: 200
  },
  {
    dataIndex: 'time',
    key: 'time',
    title: 'Time',
    type: TableDataTypes.DATE,
    width: 150
  },
  {
    dataIndex: 'value',
    key: 'value',
    title: 'Value',
    type: TableDataTypes.NUMBER,
    unit: 'kW',
    width: 100
  },
  {
    dataIndex: 'vfailCodes',
    key: 'vfailCodes',
    title: 'Vfail Codes',
    width: 150
  },
  {
    dataIndex: 'vfailCodesName',
    key: 'vfailCodesName',
    title: 'Vfail Codes Name',
    width: 200
  }
];
