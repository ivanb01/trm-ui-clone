export interface EventDTO {
  eventMetric: string;
  eventTypeName: string;
  fromDt: string;
  meterId: number;
  toDt: null | string;
  usagePointId: number;
  value: number;
}
