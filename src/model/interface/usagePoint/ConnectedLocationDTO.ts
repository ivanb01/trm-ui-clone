import { TransformerStationDTO } from './TransformerStationDTO';

export interface LocationDTO {
  id: string;
  lat: number;
  lon: number;
}

export interface ConnectedLocationDTO {
  id: string;
  address: string;
  customerKind: string;
  extCode: string;
  location: LocationDTO;
  name: string;
  notice: string;
  pricingStructure: string;
  referentId: number;
  referentName: string;
  transformerStation: TransformerStationDTO;
  transformerStationExtCode: number;
  ucode: string;
  usageGroup: string;
  usagePointType: string;
}
