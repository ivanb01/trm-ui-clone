import { groupBy } from 'lodash';

import { LocationDataDTOV2 } from '../../model/interface/usagePoint/LocationDataDTOV2';
import { UsagePointV3DTO } from '../../model/interface/usagePoint/UsagePointV3DTO';
import {
  // convertTsTypesToTypeId,
  convertUpTypesToObjectKey
} from '../../utility/helpers/filter';
import { axiosClickerV3Instance } from '../axios/axiosClickerApi';

const connectionsCache: Record<string, LocationDataDTOV2[]> = {};

export async function getConnectedLocationsV3(
  trafoIds: number[],
  trafoLocation: LocationDataDTOV2,
  filter: Record<string, Array<string>>
) {
  let cacheKey = trafoIds.join('-');

  const upTypes =
    filter.upTypes?.map((t) => convertUpTypesToObjectKey(t)) || [];

  if (upTypes.length) {
    cacheKey += `-${upTypes.join('-')}`;
  }
  if (connectionsCache[cacheKey]) return connectionsCache[cacheKey];

  const res = await axiosClickerV3Instance.get<UsagePointV3DTO[]>(
    `/usage-points/getByTrasostationList?trasostationIds=${trafoIds.join(',')}`
  );
  const data = res.data.filter(
    (l) =>
      Boolean(l.location) &&
      (!filter.upTypes?.length ||
        filter.upTypes.includes(l.usagePointType.typeName))
  );

  const groupedData = groupBy(
    data,
    (d) => `${d.location.lon}-${d.location.lat}`
  );
  const transformedRes: LocationDataDTOV2[] = [];
  let isTrafoLocationInResponse = false;
  Object.keys(groupedData).forEach((key) => {
    const group = groupedData[key];
    const [lon, lat] = key.split('-');
    const transformed: LocationDataDTOV2 = {
      id: key,
      lat: Number(lat),
      lon: Number(lon),
      trafos: [],
      ts35: 0,
      ts110: 0,
      ts1004: 0,
      tsUnspecified: 0,
      upConsumer: 0,
      upControl: 0,
      upExchange: 0,
      upLocations: [],
      upProducer: 0,
      upProsumer: 0
    };
    group.forEach((g) => {
      transformed.upLocations.push(g);
      switch (g.usagePointType.id) {
        case 1: {
          transformed.upControl += 1;
          break;
        }
        case 2: {
          transformed.upConsumer += 1;
          break;
        }
        case 3: {
          transformed.upProsumer += 1;
          break;
        }
        case 4: {
          transformed.upProducer += 1;
          break;
        }
        case 5: {
          transformed.upExchange += 1;
        }
      }
    });
    if (key === trafoLocation.id) {
      isTrafoLocationInResponse = true;
      transformed.tsUnspecified += trafoLocation.tsUnspecified;
      transformed.ts1004 += trafoLocation.ts1004;
      transformed.ts35 += trafoLocation.ts35;
      transformed.ts110 += trafoLocation.ts110;
    }
    transformedRes.push(transformed);
  });
  if (!isTrafoLocationInResponse) {
    transformedRes.push({
      ...trafoLocation,
      upConsumer: 0,
      upControl: 0,
      upExchange: 0,
      upProducer: 0,
      upProsumer: 0
    });
  }
  connectionsCache[cacheKey] = transformedRes;
  return transformedRes;
}
