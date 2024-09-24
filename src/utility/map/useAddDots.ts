import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON.js';
import Point from 'ol/geom/Point';
import WebGLPointsLayer from 'ol/layer/WebGLPoints.js';
// import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { useEffect, useRef, useState } from 'react';

// import { PowerGridPointStatus } from '../../model/interface/mock/StatusEnum.ts';
import { UsagePointInfo } from '../../model/interface/usagePoint/UsagePointInfo.ts';
import { addFeaturesInChunks } from './addFeaturesInChunks.ts';

export const useAddCityDots = (
  points: UsagePointInfo[] = []
): [WebGLPointsLayer<VectorSource> | null, boolean] => {
  const vectorSourceRef = useRef<VectorSource<Feature<Point>> | null>(null);
  const [vectorLayer, setVectorLayer] =
    useState<WebGLPointsLayer<VectorSource> | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    // const statusColors: Record<PowerGridPointStatus, string> = {
    //   [PowerGridPointStatus.HIGH_LOSSES]: 'orange',
    //   [PowerGridPointStatus.NO_COMMUNICATION]: 'red',
    //   [PowerGridPointStatus.OK]: 'green',
    //   [PowerGridPointStatus.OVERCONSUMPTION]: 'yellow'
    // };

    const worker = new Worker(new URL('../worker/worker.js', import.meta.url), {
      type: 'module'
    });

    const existingFeatures = vectorSourceRef.current?.getFeatures();
    const existingFeaturesGeoJson = existingFeatures
      ? new GeoJSON().writeFeaturesObject(existingFeatures)
      : undefined;
    worker.postMessage({ existingFeaturesGeoJson, points });
    worker.onmessage = (e) => {
      if (e.data.gJson) {
        try {
          const featuresToAdd = new GeoJSON().readFeatures(
            e.data.gJson
          ) as Feature<Point>[];
          // const featuresToAdd = e.data.gJson.features as Feature<Point>[];
          if (featuresToAdd?.length) {
            addFeaturesInChunks(featuresToAdd, vectorSourceRef.current);
            // vectorSourceRef.current?.addFeatures(featuresToAdd);
          }
        } catch (e) {
          console.error('Error parsing GeoJSON ', e);
        }
      }
    };
    if (!vectorSourceRef.current) {
      vectorSourceRef.current = new VectorSource({
        format: new GeoJSON()
      });
    }
    // if (!existingFeatures?.length) {
    //   if (points.length) {
    //     const features = points.map((point) => {
    //       return new Feature({
    //         coordinates: [point.lon, point.lat],
    //         /**TBD put it as [lon, lat] when BE provides correct values */
    //         geometry: new Point(fromLonLat([point.lat, point.lon])),
    //         ...point
    //       });
    //     });
    //     if (!vectorSourceRef.current) {
    //       vectorSourceRef.current = new VectorSource({
    //         // features,
    //         format: new GeoJSON()
    //         // wrapX: true
    //       });
    //     } else {
    //       vectorSourceRef.current?.clear();
    //       vectorSourceRef.current.addFeatures(features);
    //     }
    //   }
    // } else {
    //   const existingFeaturesMap = new Map(
    //     existingFeatures.map((f) => [f.get('id'), f])
    //   );

    //   if (points.length) {
    //     const featuresToAdd: Feature<Point>[] = [];
    //     points.forEach((p) => {
    //       if (!existingFeaturesMap.has(p.id)) {
    //         featuresToAdd.push(
    //           new Feature({
    //             coordinates: [p.lon, p.lat],
    //             /**TBD put it as [lon, lat] when BE provides correct values */
    //             geometry: new Point(fromLonLat([p.lat, p.lon])),
    //             ...p
    //           })
    //         );
    //       }
    //     });
    //     vectorSourceRef.current?.addFeatures(featuresToAdd);
    //   }
    // }

    if (!vectorLayer && vectorSourceRef.current) {
      const newVectorLayer = new WebGLPointsLayer<VectorSource>({
        className: 'city-dots',

        source: vectorSourceRef.current,
        style: {
          'circle-displacement': [0, 0],
          'circle-fill-color': [
            'match',
            ['get', 'hover'],
            1,
            '#ff3f3f',
            '#006688'
          ],
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['get', 'ratedPower'],
            1,
            0.92,
            200,
            0.6
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'ratedPower'],
            1,
            1,
            200,
            5
          ]
          // 'circle-displacement': [0, 0],
          // 'circle-fill-color': [
          //   'match',
          //   ['get', 'hover'],
          //   1,
          //   '#ff3f3f',
          //   '#006688'
          // ],
          // 'circle-opacity': 0.95,
          // // 'circle-rotate-with-view': false
          // 'circle-radius': [
          //   'interpolate',
          //   ['exponential', 2],
          //   ['zoom'],
          //   5,
          //   1.5,
          //   15,
          //   1536
          // ]
        },
        zIndex: 9
      });
      setVectorLayer(newVectorLayer);
    }

    setIsReady(true);
  }, [points.length, isReady]);

  return [vectorLayer, isReady];
};
