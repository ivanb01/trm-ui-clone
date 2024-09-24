import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { useMemo } from 'react';

import { LocationInterface } from '../../../model/interface/LocationInterface.ts';

export const useMapLayers = (locations?: LocationInterface[]) => {
  return useMemo(() => {
    const vectorSource = new VectorSource({
      features: locations?.map((location) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([location.lon, location.lat])),
          name: location.id,
          transformerStationCount: location.transformerStationCount,
          usagePointCount: location.usagePointCount
        });

        feature.setStyle(
          new Style({
            image: new CircleStyle({
              fill: new Fill({ color: 'red' }),
              radius: 7,
              stroke: new Stroke({
                color: [255, 0, 0],
                width: 2
              })
            }),
            text: new Text({
              fill: new Fill({ color: '#000' }),
              offsetY: -10,
              stroke: new Stroke({ color: '#fff', width: 2 }),
              text: `${location.transformerStationCount ?? ''}/${location.usagePointCount ?? ''}`
            })
          })
        );

        return feature;
      })
    });

    return new VectorLayer({
      source: vectorSource
    });
  }, [locations]);
};
