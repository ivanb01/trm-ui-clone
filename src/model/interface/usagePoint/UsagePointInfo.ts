import { EventDTO } from './EventDTO';

export type AddressFormat =
  `${string} > ${string} > ${number} > ${string} > ${string} > ${number}`;
export interface UsagePointInfo {
  id: number;
  address: AddressFormat;
  customerKind: string;
  events: EventDTO[];
  extUcode: string;
  fromDt: string;
  lat: number;
  lon: number;
  name: null | string;
  notice: null | string;
  pricingStructure: string;
  ratedPower: number;
  toDt: null | string;
  ucode: string;
  usageGroup: string;
  usagePointType: string;
}
