import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON.js';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

onmessage = function (e) {
  const points = e.data.points || [];
  const geojsonData = e.data.existingFeaturesGeoJson;

  if (geojsonData) {
    const existingFeatures = geojsonData.features;

    const existingFeaturesMap = new Map(
      existingFeatures.map((f) => [f.properties.id, f])
    );
    const featuresToAdd = [];
    points.forEach((p) => {
      if (!existingFeaturesMap.has(p.id)) {
        featuresToAdd.push(
          new Feature({
            coordinates: [p.lon, p.lat],

            geometry: new Point(fromLonLat([p.lon, p.lat])),
            ...p
          })
        );
      }
    });
    const gJson = new GeoJSON().writeFeaturesObject(featuresToAdd);
    postMessage({ gJson });
  } else {
    const incomingFeatures = points.map((point) => {
      return new Feature({
        coordinates: [point.lon, point.lat],

        geometry: new Point(fromLonLat([point.lon, point.lat])),
        ...point
      });
    });
    const gJson = new GeoJSON().writeFeaturesObject(incomingFeatures);
    postMessage({ gJson });
  }
};
