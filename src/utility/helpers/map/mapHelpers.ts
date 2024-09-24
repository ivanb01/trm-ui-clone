// @ts-ignore
import { bbox } from '@turf/turf';
import { containsCoordinate } from 'ol/extent';
import { Point } from 'ol/geom';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { MutableRefObject } from 'react';
import { TrafoV3DTO } from 'src/model/interface/usagePoint/TrafoV3DTO';

import { LocationDataDTOV2 } from '../../../model/interface/usagePoint/LocationDataDTOV2';

export function removeLayerByClassName(
  mapRef: MutableRefObject<Map | null>,
  className: string
) {
  if (!mapRef.current) return;
  const layer = mapRef.current
    ?.getAllLayers()
    .find((l) => l.getClassName() === className);
  if (layer) {
    mapRef.current.removeLayer(layer);
    layer.dispose();
  }
}

export const upStyles = {
  LineString: new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1
    })
  }),
  Point: new Style({
    image: new Circle({
      fill: new Fill({
        color: 'red'
      }),
      radius: 5
      //   stroke: new Stroke({ color: 'red', width: 1 })
    })
  })
};

export const clusterUpStyles = {
  LineString: new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1
    })
  }),
  Point: new Style({
    image: new Circle({
      fill: new Fill({
        color: 'blue'
      }),
      radius: 5
      //   stroke: new Stroke({ color: 'red', width: 1 })
    })
  })
};

export const getAggregateLeaves = (leaves: LocationDataDTOV2[]) => {
  const calc = leaves.reduce(
    (acc, l) => {
      acc.ts1004 = acc.ts1004 + (l.ts1004 || 0);
      acc.ts35 = acc.ts35 + (l.ts35 || 0);
      acc.ts110 = acc.ts110 + (l.ts110 || 0);
      acc.tsUnspecified = acc.tsUnspecified + (l.tsUnspecified || 0);
      acc.upConsumer = acc.upConsumer + (l.upConsumer || 0);
      acc.upControl = acc.upControl + (l.upControl || 0);
      acc.upExchange = acc.upExchange + (l.upExchange || 0);
      acc.upProducer = acc.upProducer + (l.upProducer || 0);
      acc.upProsumer = acc.upProsumer + (l.upProsumer || 0);

      return acc;
    },
    {
      ts35: 0,
      ts110: 0,
      ts1004: 0,
      tsUnspecified: 0,
      upConsumer: 0,
      upControl: 0,
      upExchange: 0,
      upProducer: 0,
      upProsumer: 0
    }
  );
  return calc;
};

// export const getClusterRadius = (pointCount: number) => {
//   if (!pointCount) return 10;
//   let radius: number;
//   if (pointCount < 100) {
//     radius = 10;
//   } else if (pointCount < 200) {
//     radius = 11;
//   } else if (pointCount < 500) {
//     radius = 12;
//   } else if (pointCount < 1000) {
//     radius = 13;
//   } else if (pointCount < 2000) {
//     radius = 14;
//   } else {
//     radius = 15;
//   }
//   return radius;
// };

function hasDifferentLocations<T extends { lon: number; lat: number }[]>(
  locations: T
) {
  if (locations.length < 2) {
    return false;
  }

  const firstLocation = locations[0];

  for (let i = 1; i < locations.length; i++) {
    const currentLocation = locations[i];
    if (
      firstLocation.lon.toFixed(4) !== currentLocation.lon.toFixed(4) ||
      firstLocation.lat.toFixed(4) !== currentLocation.lat.toFixed(4)
    ) {
      return true;
    }
  }

  return false;
}

export const zoomCluster = <T extends { lon: number; lat: number }>(
  leaves: T[],
  map: Map | undefined
) => {
  if (!map) return;
  if (!hasDifferentLocations(leaves)) return;
  /**check if has more then one location */
  const gJson: any = {
    features: [],
    type: 'FeatureCollection'
  };
  leaves.forEach((l) => {
    gJson.features.push({
      geometry: {
        coordinates: fromLonLat([l.lon, l.lat]),
        type: 'Point'
      },
      type: 'Feature'
    });
  });
  const boundingBox = bbox(gJson);
  map.getView().fit(boundingBox, {
    padding: [50, 50, 50, 50],
    size: map.getSize()
  });
};

export const getAggregatedTsUp = (location: LocationDataDTOV2) => {
  const {
    ts35,
    ts110,
    ts1004,
    tsUnspecified,
    upConsumer,
    upControl,
    upExchange,
    upProducer,
    upProsumer
  } = location;
  const totalTs =
    (ts1004 || 0) + (ts110 || 0) + (ts35 || 0) + (tsUnspecified || 0);
  const totalUp =
    (upConsumer || 0) +
    (upExchange || 0) +
    (upControl || 0) +
    (upProducer || 0) +
    (upProsumer || 0);
  return { totalTs, totalUp };
};

export const getVisibleFeatures = (map: Map, source: VectorSource) => {
  const viewExtent = map.getView().calculateExtent(map.getSize());

  const allFeatures = source.getFeatures();

  const visibleFeatures = allFeatures.filter((feature) => {
    if (feature.getGeometry()?.getType() !== 'Point') return false;
    const geometry = feature.getGeometry();
    const coordinate = (geometry as Point).getCoordinates();
    if (geometry) {
      return containsCoordinate(viewExtent, coordinate);
    }
    return false;
  });
  return visibleFeatures;
};

export function isTrafoV3(entry: any): entry is TrafoV3DTO {
  return (
    entry &&
    'customer_kind_1_count' in entry &&
    'customer_kind_2_count' in entry &&
    'customer_kind_3_count' in entry &&
    'customer_kind_4_count' in entry &&
    'customer_kind_5_count' in entry &&
    'customer_kind_6_count' in entry &&
    'type_id' in entry &&
    'usage_point_count' in entry
  );
}
