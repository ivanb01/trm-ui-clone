import { ColumnsType } from '../../model/app-model/types/DataTypeColumn.ts';
import { LosesInterface } from '../../model/interface/loses/LosesInterface.ts';

export const tableColumns: ColumnsType<LosesInterface> = [
  {
    dataIndex: 'upExtUcode',
    key: 'upExtUcode',
    title: 'UP Ext Ucode',
    width: 150
  },
  {
    dataIndex: 'upName',
    key: 'upName',
    title: 'UP Name',
    width: 150
  },
  {
    dataIndex: 'transformerStationId',
    key: 'transformerStationId',
    title: 'Transformer Station ID',
    width: 200
  },
  {
    dataIndex: 'transformerStationExtUcode',
    key: 'transformerStationExtUcode',
    title: 'Transformer Station Ext Ucode',
    width: 250
  },
  {
    dataIndex: 'ratedPower',
    key: 'ratedPower',
    title: 'Rated Power',
    width: 150
  },
  {
    dataIndex: 'currentMonthAe',
    key: 'currentMonthAe',
    title: 'Current Month AE',
    width: 150
  },
  {
    dataIndex: 'lastMonthAe',
    key: 'lastMonthAe',
    title: 'Last Month AE',
    width: 150
  },
  {
    dataIndex: 'avgMonthLastYearAe',
    key: 'avgMonthLastYearAe',
    title: 'Avg Month Last Year AE',
    width: 200
  },
  {
    dataIndex: 'maxPeriodMonthAe',
    key: 'maxPeriodMonthAe',
    title: 'Max Period Month AE',
    width: 200
  },
  {
    dataIndex: 'currentMonthLossesKwh',
    key: 'currentMonthLossesKwh',
    title: 'Current Month Losses (kWh)',
    width: 200
  },
  {
    dataIndex: 'currentMonthLosses',
    key: 'currentMonthLosses',
    title: 'Current Month Losses',
    width: 200
  },
  {
    dataIndex: 'lastMonthLossesKwh',
    key: 'lastMonthLossesKwh',
    title: 'Last Month Losses (kWh)',
    width: 200
  },
  {
    dataIndex: 'lastMonthLosses',
    key: 'lastMonthLosses',
    title: 'Last Month Losses',
    width: 200
  },
  {
    dataIndex: 'avgMonthLastYearLossesKwh',
    key: 'avgMonthLastYearLossesKwh',
    title: 'Avg Month Last Year Losses (kWh)',
    width: 250
  },
  {
    dataIndex: 'avgMonthLastYearLosses',
    key: 'avgMonthLastYearLosses',
    title: 'Avg Month Last Year Losses',
    width: 250
  },
  {
    dataIndex: 'maxPeriodMonthLosses',
    key: 'maxPeriodMonthLosses',
    title: 'Max Period Month Losses',
    width: 200
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
  }
];
