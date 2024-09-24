import { fromLonLat } from 'ol/proj';
import SuperCluster from 'supercluster';

import { TransformerStationDTO } from '../../../model/interface/usagePoint/TransformerStationDTO';

export function createGeoJson(
  clusters: (
    | SuperCluster.ClusterFeature<SuperCluster.AnyProps>
    | SuperCluster.PointFeature<SuperCluster.AnyProps>
  )[],
  transformerStation: TransformerStationDTO
) {
  const stationCoords = fromLonLat([
    transformerStation.location.lon,
    transformerStation.location.lat
  ]);
  const gJson: any = {
    features: [],
    type: 'FeatureCollection'
  };
  const gJsonNotClustered: any = {
    features: [],
    type: 'FeatureCollection'
  };

  clusters.forEach((c) => {
    const isCluster = c.properties.cluster;
    gJson.features.push(
      {
        geometry: {
          coordinates: fromLonLat(c.geometry.coordinates),
          type: 'Point'
        },
        properties: {
          ...c.properties
        },
        type: 'Feature'
      },
      {
        geometry: {
          coordinates: [stationCoords, fromLonLat(c.geometry.coordinates)],
          type: 'LineString'
        },
        properties: {
          station: transformerStation,
          usagePoint: c.properties
        },
        type: 'Feature'
      }
    );
    if (isCluster) {
      c.properties.leaves.forEach((l: any) => {
        gJsonNotClustered.features.push({
          geometry: {
            coordinates: fromLonLat([l.location.lon, l.location.lat]),
            type: 'Point'
          },

          type: 'Feature'
        });
      });
    } else {
      gJsonNotClustered.features.push({
        geometry: {
          coordinates: fromLonLat(c.geometry.coordinates),
          type: 'Point'
        },

        type: 'Feature'
      });
    }
    gJson.features.push({
      geometry: {
        coordinates: [...stationCoords],
        type: 'Point'
      },
      properties: {
        ...transformerStation,
        isStation: true
      },
      type: 'Feature'
    });
    gJsonNotClustered.features.push({
      geometry: {
        coordinates: [...stationCoords],
        type: 'Point'
      },

      type: 'Feature'
    });
  });

  return { gJson, gJsonNotClustered };
}
