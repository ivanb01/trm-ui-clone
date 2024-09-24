import { TransformerStationDTO, TSLocationDTO } from './TransformerStationDTO';

export interface UsagePointDTO {
  id: string;
  address: string;
  customerKind: string;
  extCode: string;
  location: TSLocationDTO;
  name: string;
  notice: string;
  pricingStructure: string;
  transformerStation: TransformerStationDTO;
  usageGroup: string;
  usagePointType: string;
}
