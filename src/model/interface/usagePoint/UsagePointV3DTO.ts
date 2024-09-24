interface PricingStructure {
  id: number;
  structureName: string;
}

interface CustomerKind {
  id: number;
  kindName: string;
}

interface UsagePointType {
  id: number;
  typeName: string;
}

interface UsageGroup {
  id: number;
  groupName: string;
}

interface Location {
  id: number;
  lat: number;
  lon: number;
}

export interface UsagePointV3DTO {
  id: number;
  countryId: number;
  customerKind: CustomerKind;
  distribAreaId: number;
  extUcode: string;
  fromDt: string;
  location: Location;
  name: string;
  pricingStructure: PricingStructure;
  ratedPower: number;
  regionId: number;
  segmentRouteId: number;
  subRegionId: number;
  toDt: null | string;
  trafostationId: number;
  ucode: string;
  usageGroup: UsageGroup;
  usagePointType: UsagePointType;
}
