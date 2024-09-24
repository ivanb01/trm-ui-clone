/**Cluster identical locations on UI by `${lon}-${lat}` */
import { groupBy } from 'lodash';

import {
  convertTsTypesToTypeId,
  convertUpTypesToObjectKey
} from '../../utility/helpers/filter';

onmessage = function (e) {
  let trafos = e.data.res;
  const filter = e.data.filter;
  const tsTypes = filter.tsTypes?.map((t) => convertTsTypesToTypeId(t)) || [];
  const upTypes =
    filter.upTypes?.map((t) => convertUpTypesToObjectKey(t)) || [];

  trafos.forEach((t) => {
    if (tsTypes.length) {
      if (!tsTypes.includes(t.type_id)) {
        t.type_id = -1;
      }
    }
    if (upTypes.length) {
      if (!upTypes.includes('customer_kind_1_count')) {
        t.customer_kind_1_count = 0;
      }
      if (!upTypes.includes('customer_kind_2_count')) {
        t.customer_kind_2_count = 0;
      }
      if (!upTypes.includes('customer_kind_3_count')) {
        t.customer_kind_3_count = 0;
      }
      if (!upTypes.includes('customer_kind_4_count')) {
        t.customer_kind_4_count = 0;
      }
      if (!upTypes.includes('customer_kind_5_count')) {
        t.customer_kind_5_count = 0;
      }
    }
  });
  const groupedTrafosByLocation = groupBy(trafos, (t) => `${t.lon}-${t.lat}`);
  const transformedRes = [];
  Object.keys(groupedTrafosByLocation).forEach((key) => {
    const group = groupedTrafosByLocation[key];
    const [lon, lat] = key.split('-');
    const transformed = {
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
      upProducer: 0,
      upProsumer: 0
    };
    group.forEach((g) => {
      transformed.upConsumer += g.customer_kind_2_count || 0;
      transformed.upControl += g.customer_kind_1_count || 0;
      transformed.upExchange += g.customer_kind_5_count || 0;
      transformed.upProducer += g.customer_kind_4_count || 0;
      transformed.upProsumer += g.customer_kind_3_count || 0;
      switch (g.type_id) {
        case 6: {
          transformed.tsUnspecified += 1;
          break;
        }
        case 7: {
          transformed.ts110 += 1;
          break;
        }
        case 8: {
          transformed.ts1004 += 1;
          break;
        }
        case 9: {
          transformed.ts35 += 1;
          break;
        }
        case -1: {
          /**-1 is flag that it's filtered out */
          break;
        }
        default: {
          console.error('Trafostation id not specified');
          transformed.tsUnspecified += 1;
        }
      }
      if (!tsTypes.length || tsTypes.includes(g.type_id))
        transformed.trafos.push(g);
    });
    transformedRes.push(transformed);
    // console.log('to return ', transformedRes);
  });
  postMessage({ transformedRes });
};
