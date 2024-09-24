export interface LosesInterface {
  avgMonthLastYearAe: number;
  avgMonthLastYearLosses: null | number;
  avgMonthLastYearLossesKwh: null | number;
  currentMonthAe: number;
  currentMonthLosses: number;
  currentMonthLossesKwh: number;
  lastMonthAe: number;
  lastMonthLosses: number;
  lastMonthLossesKwh: number;
  maxPeriodMonthAe: number;
  maxPeriodMonthLosses: number;
  ratedPower: number;
  startDt: string;
  stopDt: string;
  transformerStationExtUcode: null | string;
  transformerStationId: number;
  upExtUcode: string;
  upId: number;
  upName: string;
}
