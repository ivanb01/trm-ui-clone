/* eslint-disable perfectionist/sort-interfaces */
import { TrafoV3DTO } from './TrafoV3DTO';
import { UsagePointV3DTO } from './UsagePointV3DTO';

export interface LocationDataDTOV2 {
  id: string;
  lat: number;
  lon: number;
  ts35: number;
  ts110: number;
  ts1004: number;
  tsUnspecified: number;
  upConsumer: number;
  upControl: number;
  upExchange: number;
  upProducer: number;
  upProsumer: number;
  /** */
  trafos: TrafoV3DTO[];
  upLocations: UsagePointV3DTO[];
}
