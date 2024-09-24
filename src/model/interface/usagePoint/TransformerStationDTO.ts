export interface TSLocationDTO {
  id: string;
  lat: number;
  lon: number;
}

export interface TransformerStationDTO {
  id: string;
  extCode: string;
  location: TSLocationDTO;
  name: string;
  nitesId: number;
  notice: string;
  referentId: string;
  referentName: string;
  ucode: string;
  usage_point_type: string;
}
