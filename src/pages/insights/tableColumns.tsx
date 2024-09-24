import { TableRowProps } from '../../model/app-model/types/DataTypeColumn.ts';

export const tableColumns: TableRowProps<Insight> = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'ID',
    width: 100
  },
  {
    dataIndex: 'usagePointId',
    key: 'usagePointId',
    title: 'Usage Point ID',
    width: 150
  },
  {
    dataIndex: 'usagePoint',
    key: 'usagePoint',
    title: 'Usage Point',
    width: 200
  },
  {
    dataIndex: 'meterId',
    key: 'meterId',
    title: 'Meter ID',
    width: 150
  },
  {
    dataIndex: 'meter',
    key: 'meter',
    title: 'Meter',
    width: 200
  },
  {
    dataIndex: 'insightType',
    key: 'insightType',
    title: 'Insight Type',
    width: 250
  },
  {
    dataIndex: 'insightTypeDescription',
    key: 'insightTypeDescription',
    title: 'Insight Type Description',
    width: 300
  },
  {
    dataIndex: 'criticalityId',
    key: 'criticalityId',
    title: 'Criticality ID',
    width: 150
  },
  {
    dataIndex: 'criticalityName',
    key: 'criticalityName',
    title: 'Criticality Name',
    width: 150
  },
  {
    dataIndex: 'startDt',
    key: 'startDt',
    title: 'Start Date',
    width: 200
  },
  {
    dataIndex: 'stopDt',
    key: 'stopDt',
    title: 'Stop Date',
    width: 200
  },
  {
    dataIndex: 'rlaName',
    key: 'rlaName',
    title: 'RLA Name',
    width: 250
  }
];
