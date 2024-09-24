import { chunk } from 'lodash';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';

export function addFeaturesInChunks(
  featuresToAdd: Feature<Point>[],
  source: VectorSource<Feature<Point>> | null
) {
  const chunks = chunk(featuresToAdd, 50000);
  for (let i = 0; i < chunks.length; i++) {
    requestAnimationFrame(() => {
      source?.addFeatures(chunks[i]);
    });
  }
}
