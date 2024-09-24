import { Feature, Map as OLMap, Overlay } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { useEffect, useRef } from 'react';

import { LocationInterface } from '../../../model/interface/LocationInterface.ts';

export const useClusteredLocations = (
  map: OLMap | null,
  locations?: LocationInterface[]
) => {
  const overlaysRef = useRef<Overlay[]>([]);

  useEffect(() => {
    if (map) {
      // Clear existing overlays
      overlaysRef.current.forEach((overlay) => map.removeOverlay(overlay));
      overlaysRef.current = [];

      // Create features for locations
      const features = locations?.map((location) => {
        return new Feature({
          geometry: new Point(fromLonLat([location.lon, location.lat])),
          name: location.id,
          transformerStationCount: location.transformerStationCount,
          usagePointCount: location.usagePointCount
        });
      });

      // Create vector source and cluster source
      const vectorSource = new VectorSource({ features: features || [] });
      const clusterSource = new Cluster({
        distance: 40,
        source: vectorSource
      });

      // Create a style cache to reuse styles
      const styleCache: { [key: number]: Style } = {};
      const clusters = new VectorLayer({
        source: clusterSource,
        style: function (feature) {
          const size = feature.get('features').length;
          let style = styleCache[size];
          if (!style) {
            style = new Style({
              image: new CircleStyle({
                fill: new Fill({
                  color: '#3399CC'
                }),
                radius: 10,
                stroke: new Stroke({
                  color: '#fff'
                })
              }),
              text: new Text({
                fill: new Fill({
                  color: '#fff'
                }),
                text: size.toString()
              })
            });
            styleCache[size] = style;
          }
          return style;
        }
      });

      map.addLayer(clusters);

      // Add overlays for individual points
      features?.forEach((feature) => {
        const element = document.createElement('div');
        element.innerHTML = `
          <div style="background: white; border: 1px solid black; padding: 2px; color: black;">
            ${feature.get('transformerStationCount') ?? ''}/${feature.get('usagePointCount') ?? ''}
          </div>
        `;
        const overlay = new Overlay({
          element: element,
          position: feature.getGeometry()?.getCoordinates(),
          positioning: 'bottom-center',
          stopEvent: false
        });
        map.addOverlay(overlay);
        overlaysRef.current.push(overlay);
      });

      // Handle map click events for popups
      map.on('singleclick', (evt) => {
        const features = map.getFeaturesAtPixel(evt.pixel);
        if (features && features.length === 1) {
          const coordinates = (
            features[0].getGeometry() as Point
          ).getCoordinates();
          const element = document.createElement('div');
          element.innerHTML = `
            <div style="color: black; background: white; border: 1px solid black; padding: 5px;">
              Transformer Station Count: ${features[0].get('transformerStationCount')}<br>
              Usage Point Count: ${features[0].get('usagePointCount')}
            </div>
          `;
          const overlay = new Overlay({
            autoPan: true,
            element: element,
            position: coordinates
          });
          map.addOverlay(overlay);
        }
      });
    }
  }, [map, locations]);

  return null;
};
