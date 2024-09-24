import { Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { containsCoordinate } from 'ol/extent';
import Feature, { FeatureLike } from 'ol/Feature';
import { LineString, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Circle, Fill, Icon, Stroke, Style, Text } from 'ol/style';
import { LocationDataDTOV2 } from 'src/model/interface/usagePoint/LocationDataDTOV2';

// import { LocationDataDTOV2 } from 'src/model/interface/usagePoint/LocationDataDTOV2';
import { MAP_ICONS_RADIUS } from '../../model/constants/mapConstants';
import {
  consumerUp,
  controlUp,
  exchangeUp,
  producerUp,
  prosumerUp,
  ts35,
  ts110,
  ts1004,
  tsUnspecified
} from './iconSet';

export type UpType =
  | 'consumer'
  | 'control'
  | 'exchange'
  | 'producer'
  | 'prosumer';

export type TsType = '35' | '110' | '1004' | 'unspecified';

export const iconTS = `data:image/svg+xml;utf8,<svg fill="white" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" xml:space="preserve">
<g>
	<g>
		<path d="M205.021,462.878h-0.137c-5.771,0-10.449,4.678-10.449,10.449c0,5.771,4.678,10.449,10.449,10.449h0.137
			c5.771,0,10.449-4.678,10.449-10.449C215.47,467.556,210.792,462.878,205.021,462.878z"/>
	</g>
</g>
<g>
	<g>
		<path d="M345.927,150.847h104.984c4.226,0,8.036-2.546,9.654-6.45s0.723-8.399-2.264-11.387L328.35,3.061
			C326.41,1.12,323.7-0.002,320.957,0H191.013c-2.881,0-5.679,1.233-7.639,3.336L53.7,133.008
			c-2.988,2.988-3.882,7.483-2.264,11.387s5.427,6.45,9.654,6.45h104.985L53.647,264.948c-2.957,3.001-3.822,7.483-2.196,11.367
			c1.627,3.886,5.426,6.415,9.639,6.415h115.6l-48.732,151.925H67.905c-5.771,0-10.449,4.678-10.449,10.449v56.446
			c0,5.771,4.678,10.449,10.449,10.449h376.163c5.771,0,10.449-4.678,10.449-10.449v-56.446c0-5.771-4.678-10.449-10.449-10.449
			h-60.051l-48.731-151.924h115.624c4.212,0,8.012-2.529,9.639-6.415c1.625-3.885,0.76-8.367-2.196-11.367L345.927,150.847z
			 M331.411,35.676l94.274,94.273h-94.274V35.676z M255.987,318.571l-38.443-35.837h76.886L255.987,318.571z M255.987,347.141
			l93.877,87.514H162.111L255.987,347.141z M216.264,261.836l39.723-39.723l39.723,39.723H216.264z M297.723,150.822l-41.736,41.736
			l-41.736-41.736H297.723z M216.264,129.924l39.723-39.723l39.724,39.723H216.264z M270.765,207.336l39.748-39.748v79.496
			L270.765,207.336z M270.765,75.424l39.748-39.748v79.496L270.765,75.424z M295.736,20.898l-39.749,39.748l-39.748-39.748H295.736z
			 M201.462,35.675l39.748,39.748l-39.748,39.748V35.675z M201.462,167.588l39.748,39.748l-39.748,39.748V167.588z M86.314,129.948
			l94.25-94.248v94.248H86.314z M86.053,261.835l94.511-95.92v95.92H86.053z M195.933,291.158l44.731,41.699l-82.894,77.276
			L195.933,291.158z M433.62,455.554v35.548H78.354v-7.325h92.725c5.771,0,10.449-4.678,10.449-10.449s-4.678-10.449-10.449-10.449
			H78.354v-7.326H433.62z M354.204,410.132l-82.894-77.275l44.731-41.7L354.204,410.132z M331.411,261.834v-95.945l94.535,95.945
			H331.411z"/>
	</g>
</g>
</svg>`;

export const iconUp = `data:image/svg+xml;utf8,<svg fill="yellow" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
<polygon points="439.6,0 204.9,0 55.4,256 204.9,256 76.9,512 418.2,192 247.5,192 "/>
</svg>
`;

export const iconArrow = `data:image/svg+xml;utf8,<svg fill="darkgreen" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512.003 512.003" xml:space="preserve">
<g>
	<g>
		<path d="M507.284,248.364L12.35,0.898C8.894-0.826,4.721-0.007,2.153,2.86c-2.56,2.884-2.867,7.125-0.759,10.351l159.07,242.79
			L1.393,498.792c-2.108,3.226-1.801,7.467,0.759,10.351c1.664,1.86,4.002,2.859,6.383,2.859c1.289,0,2.594-0.29,3.814-0.896
			l494.933-247.467c2.893-1.451,4.719-4.403,4.719-7.637S510.176,249.815,507.284,248.364z"/>
	</g>
</g>
</svg>`;

export const tsPin = `data:image/svg+xml;utf8,<svg fill="orange" width="40px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016q0 1.376-0.672 3.2t-1.696 3.68-2.336 3.776-2.56 3.584-2.336 2.944-1.728 2.080l-0.672 0.736q-0.256-0.256-0.672-0.768t-1.696-2.016-2.368-3.008-2.528-3.52-2.368-3.84-1.696-3.616-0.672-3.232zM8 12q0 3.328 2.336 5.664t5.664 2.336 5.664-2.336 2.336-5.664-2.336-5.632-5.664-2.368-5.664 2.368-2.336 5.632z" fill-rule="evenodd"></path>
 <circle cx="16" cy="12" r="8" fill="white"></circle>
</svg>`;
export const upPin = `data:image/svg+xml;utf8,<svg fill="skyblue" width="40px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016q0 1.376-0.672 3.2t-1.696 3.68-2.336 3.776-2.56 3.584-2.336 2.944-1.728 2.080l-0.672 0.736q-0.256-0.256-0.672-0.768t-1.696-2.016-2.368-3.008-2.528-3.52-2.368-3.84-1.696-3.616-0.672-3.232zM8 12q0 3.328 2.336 5.664t5.664 2.336 5.664-2.336 2.336-5.664-2.336-5.632-5.664-2.368-5.664 2.368-2.336 5.632z" fill-rule="evenodd"></path>
<circle cx="16" cy="12" r="8" fill="white"></circle>
</svg>`;
/**Calculate styles for TS view */
export function getArrowStyles(
  feature: FeatureLike,
  resolution: number,
  map: Map
) {
  const geometry = feature.getGeometry() as LineString;
  const end = geometry.getLastCoordinate();
  const lineLength = geometry.getLength();
  const isEndInView = coordinateIsInView(end, map);
  if (!isEndInView) return undefined;
  const lengthInPixels = lineLength / resolution;
  if (lengthInPixels < 2.5 * MAP_ICONS_RADIUS) return undefined;

  const circleMeters = MAP_ICONS_RADIUS * resolution;

  const fraction = (lineLength - circleMeters) / lineLength;
  const styles = [
    new Style({
      stroke: new Stroke({
        color: 'red',
        width: 1
      })
    })
  ];

  const start = geometry.getCoordinates()[geometry.getCoordinates().length - 2];

  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const rotation = Math.atan2(dy, dx);
  const middle = geometry.getCoordinateAt(0.5);
  const point = geometry.getCoordinateAt(fraction)!;

  styles.push(
    new Style({
      geometry: new Point(point ?? middle),
      image: new Icon({
        anchor: [0.8, 0.5],
        rotateWithView: true,
        rotation: -rotation,
        scale: 0.5,
        src: iconArrow
      })
    })
  );

  return styles;
}

export function getUpStyles(
  feature: FeatureLike,
  resolution: number,
  map: Map,
  tsCoord: Coordinate // in Merc proj
) {
  const point = feature.getGeometry() as Point;
  const coordinate = point.getCoordinates();
  const distToTsCenter =
    new LineString([coordinate, tsCoord]).getLength() / resolution;

  const isInView = coordinateIsInView(coordinate, map);
  if (!isInView) return undefined;
  /**TO BE DONE Reconsider this hidding of cluster */
  if (distToTsCenter < 1.5 * MAP_ICONS_RADIUS) return undefined;
  return [
    new Style({
      image: new Circle({
        fill: new Fill({
          color: '#6EACDA'
        }),
        radius: MAP_ICONS_RADIUS
      })
    }),
    new Style({
      image: new Icon({
        scale: 0.6,
        src: iconUp
      })
    })
  ];
}

export function getClusterStyles(
  feature: FeatureLike,
  resolution: number,
  map: Map,
  tsCoord: Coordinate,
  textValue: string
) {
  const point = feature.getGeometry() as Point;
  const coordinate = point.getCoordinates();
  const distToTsCenter =
    new LineString([coordinate, tsCoord]).getLength() / resolution;

  const isInView = coordinateIsInView(coordinate, map);
  if (!isInView) return undefined;
  /**TO BE DONE Reconsider this hidding of cluster */
  if (distToTsCenter < 1.5 * MAP_ICONS_RADIUS) return undefined;
  return new Style({
    image: new Circle({
      fill: new Fill({
        color: '#6EACDA'
      }),
      radius: MAP_ICONS_RADIUS
    }),
    text: new Text({
      fill: new Fill({
        color: 'white'
      }),
      font: '8px sans-serif',
      placement: 'line',
      text: textValue
    })
  });
}

function coordinateIsInView(coord: Coordinate, map: Map) {
  const mapExtent = map.getView().calculateExtent(map.getSize());
  return containsCoordinate(mapExtent, coord);
}

export function getPinStyles(
  props: any,
  resolution: number,
  selectedLocationId: null | string
) {
  const totalTs = props['totalTs'] as number;
  const totalUp = props['totalUp'] as number;
  if (totalTs === 0 && totalUp === 0) return;
  const isOrange = totalTs >= totalUp;
  const styles: Style[] = [];
  const totalTsText = `${props['totalTs']}` || '0';
  const totalUpText = `${props['totalUp']}` || '0';

  let isSelected = false;
  if (selectedLocationId) {
    isSelected = selectedLocationId === props.location.id;
  }
  if (totalTs && !totalUp) {
    const isStandalone = totalTs === 1;
    if (isStandalone) {
      const type = getTsType(props);
      return getStandaloneTsStyles(type, styles);
    }
    styles.push(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          rotation: 0,
          scale: 0.8,
          src: tsPin
        }),
        text: new Text({
          fill: new Fill({
            color: 'orange'
          }),
          font: 'bold 8px sans-serif',
          offsetY: -20,
          placement: 'line',
          text: totalTsText
        })
      })
    );
    return styles;
  }
  if (!totalTs && totalUp) {
    const isStandalone = totalUp === 1;
    if (isStandalone) {
      const type = getUpType(props);
      return getStandaloneUpStyles(type, styles);
    }
    styles.push(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          rotation: 0,
          scale: 0.8,
          src: upPin
        }),
        text: new Text({
          fill: new Fill({
            color: 'skyblue'
          }),
          font: 'bold 8px sans-serif',
          offsetY: -20,
          placement: 'line',
          text: totalUpText
        })
      })
    );
    return styles;
  }
  // has up and ts
  const twentyPxLen = 20 * resolution;
  const lrLen = 15 * resolution;
  const pointCoordinates = fromLonLat(props.coordinates);

  // Calculate left and right endpoints for the line
  const leftEnd = [pointCoordinates[0] - lrLen, pointCoordinates[1]];
  const rightEnd = [pointCoordinates[0] + lrLen, pointCoordinates[1]];

  const topLeftCoord = [leftEnd[0], leftEnd[1] + twentyPxLen];
  const topRightCoord = [rightEnd[0], rightEnd[1] + twentyPxLen];
  const topLeftPointGeom = new Point(topLeftCoord);
  const topRightPointGeom = new Point(topRightCoord);

  const lineAngleLeft = new LineString([pointCoordinates, topLeftCoord]);
  const lineAngleRight = new LineString([pointCoordinates, topRightCoord]);

  styles.push(
    new Style({
      image: new Circle({
        fill: new Fill({
          color: isSelected ? 'darkgreen' : isOrange ? 'orange' : 'skyblue'
        }),
        radius: 5
      })
    })
  );
  styles.push(
    new Style({
      geometry: lineAngleLeft,
      stroke: new Stroke({
        color: 'skyblue',
        width: 2
      })
    })
  );
  styles.push(
    new Style({
      geometry: lineAngleRight,
      stroke: new Stroke({
        color: 'orange',
        width: 2
      })
    })
  );

  styles.push(
    new Style({
      geometry: topRightPointGeom,
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.8,
        src: tsPin
      }),

      text: new Text({
        fill: new Fill({
          color: 'orange'
        }),
        font: 'bold 8px sans-serif',
        offsetY: -20,
        placement: 'line',
        text: totalTsText
      })
    })
  );

  styles.push(
    new Style({
      geometry: topLeftPointGeom,
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.8,
        src: upPin
      }),

      text: new Text({
        fill: new Fill({
          color: 'skyblue'
        }),
        font: 'bold 8px sans-serif',

        offsetY: -20,
        placement: 'line',

        text: totalUpText
      })
    })
  );

  return styles;
}

export function getClusterStylesV2(
  feature: Feature<Point>,
  resolution: number,
  selectedLocationId: null | string
) {
  const props = feature.getProperties();
  const totalTs = props['totalTs'] as number;
  const totalUp = props['totalUp'] as number;
  const styles: Style[] = [];
  const totalTsText = `${props['totalTs']}`;
  const totalUpText = `${props['totalUp']}`;
  const pointCoordinates = feature.getGeometry()!.getCoordinates();
  let isSelected = false;
  if (selectedLocationId) {
    isSelected = props.leaves?.some(
      (l: LocationDataDTOV2) => l.id === selectedLocationId
    );
  }

  const isOrange = totalTs >= totalUp;
  styles.push(
    new Style({
      image: new Circle({
        fill: new Fill({
          color: isSelected ? 'darkgreen' : isOrange ? 'orange' : 'skyblue'
        }),
        radius: isSelected ? 5 : 3
      })
    })
  );

  if (totalTs && totalUp) {
    const twentyPxLen = 20 * resolution;
    const lrLen = 20 * resolution;

    // Calculate left and right endpoints for the line
    const leftEnd = [pointCoordinates[0] - lrLen, pointCoordinates[1]];
    const rightEnd = [pointCoordinates[0] + lrLen, pointCoordinates[1]];

    const topLeftCoord = [leftEnd[0], leftEnd[1] + twentyPxLen];
    const topRightCoord = [rightEnd[0], rightEnd[1] + twentyPxLen];
    const topLeftPointGeom = new Point(topLeftCoord);
    const topRightPointGeom = new Point(topRightCoord);

    const leftAngleLineGeom = new LineString([pointCoordinates, topLeftCoord]);
    const rightAngleLineGeom = new LineString([
      pointCoordinates,
      topRightCoord
    ]);

    styles.push(
      new Style({
        geometry: leftAngleLineGeom,
        stroke: new Stroke({
          color: 'skyblue',
          width: 2
        })
      })
    );
    styles.push(
      new Style({
        geometry: rightAngleLineGeom,
        stroke: new Stroke({
          color: 'orange',
          width: 2
        })
      })
    );

    styles.push(
      new Style({
        geometry: topRightPointGeom,

        image: new Circle({
          fill: new Fill({
            color: 'white'
          }),
          radius: 15,
          stroke: new Stroke({
            color: 'orange',
            width: 5
          })
        }),
        text: new Text({
          fill: new Fill({
            color: 'orange'
          }),
          font: 'bold 8px sans-serif',

          placement: 'line',
          text: totalTsText
        })
      })
    );

    styles.push(
      new Style({
        geometry: topLeftPointGeom,

        image: new Circle({
          fill: new Fill({
            color: 'white'
          }),
          radius: 15,
          stroke: new Stroke({
            color: 'skyblue',
            width: 5
          })
        }),
        text: new Text({
          fill: new Fill({
            color: 'skyblue'
          }),
          font: 'bold 8px sans-serif',

          placement: 'line',

          text: totalUpText
        })
      })
    );
    return styles;
  }

  if (totalUp && !totalTs) {
    styles.push(
      new Style({
        image: new Circle({
          fill: new Fill({
            color: 'white'
          }),
          radius: 15,
          stroke: new Stroke({
            color: 'skyblue',
            width: 5
          })
        }),
        text: new Text({
          fill: new Fill({
            color: 'skyblue'
          }),
          font: 'bold 8px sans-serif',

          placement: 'line',

          text: totalUpText
        })
      })
    );
    return styles;
  }

  /**only ts */

  styles.push(
    new Style({
      image: new Circle({
        fill: new Fill({
          color: 'white'
        }),
        radius: 15,
        stroke: new Stroke({
          color: 'orange',
          width: 5
        })
      }),
      text: new Text({
        fill: new Fill({
          color: 'orange'
        }),
        font: 'bold 8px sans-serif',

        placement: 'line',

        text: totalTsText
      })
    })
  );

  return styles;
}
export function getStylesTrafoV3(feature: Feature<Point>) {
  const props = feature.getProperties();
  // const type = codesMap.get(props?.location?.type_id || 1);
  const type = props?.location?.type_id || 6;
  let icon = tsUnspecified;
  let color = 'rgb(255, 215, 0)';
  const styles: Style[] = [];
  switch (type) {
    case 6: {
      icon = tsUnspecified;
      color = 'rgb(255, 215, 0)';
      break;
    }
    case 7: {
      icon = ts110;
      color = 'rgb(255, 69, 0)';
      break;
    }
    case 8: {
      icon = ts1004;
      color = 'rgb(255, 140, 0)';
      break;
    }
    case 9: {
      icon = ts35;
      color = 'rgb(255, 215, 0)';
    }
  }
  styles.push(
    new Style({
      image: new Circle({
        fill: new Fill({
          color
        }),
        radius: 15
      })
    })
  );
  styles.push(
    new Style({
      image: new Icon({
        rotation: 0,
        scale: 0.7,
        src: icon
      })
    })
  );
  return styles;
}

export function getStylesUpV3(feature: Feature<Point>) {
  let icon = consumerUp;
  let color = '#ADD8E6';
  const props = feature.get('location');
  const styles: Style[] = [];
  switch (props.location?.usagePointType?.id) {
    case 2: {
      icon = consumerUp;
      color = '#ADD8E6';
      break;
    }
    case 3: {
      icon = prosumerUp;
      color = 'rgb(0, 206, 209)';
      break;
    }
    case 1: {
      icon = controlUp;
      color = 'rgb(123, 104, 238)';
      break;
    }
    case 4: {
      icon = producerUp;
      color = 'rgb(70, 130, 180)';
      break;
    }
    case 5: {
      icon = exchangeUp;
      color = 'rgb(0, 128, 128)';
    }
  }
  styles.push(
    new Style({
      image: new Circle({
        fill: new Fill({
          color
        }),
        radius: 15
      })
    })
  );
  styles.push(
    new Style({
      image: new Icon({
        rotation: 0,
        scale: 0.7,
        src: icon
      })
    })
  );
  return styles;
}
export function getClusterStylesTrafoV3(
  feature: Feature<Point>
  // resolution: number
) {
  const props = feature.getProperties();
  const totalPoints = `${props.point_count}`;
  // console.log('props ', props);
  return new Style({
    image: new Circle({
      fill: new Fill({
        color: 'white'
      }),
      radius: 15,
      stroke: new Stroke({
        color: 'orange',
        width: 5
      })
    }),
    text: new Text({
      fill: new Fill({
        color: 'orange'
      }),
      font: 'bold 8px sans-serif',

      placement: 'line',

      text: totalPoints
    })
  });
}

export function getClusterStylesUpV3(
  feature: Feature<Point>
  // resolution: number
) {
  const props = feature.getProperties();
  const totalPoints = `${props.point_count}`;
  // console.log('props ', props);
  return new Style({
    image: new Circle({
      fill: new Fill({
        color: 'white'
      }),
      radius: 15,
      stroke: new Stroke({
        color: 'skyblue',
        width: 5
      })
    }),
    text: new Text({
      fill: new Fill({
        color: 'skyblue'
      }),
      font: 'bold 8px sans-serif',

      placement: 'line',

      text: totalPoints
    })
  });
}

export function getArrowStylesV2(feature: FeatureLike, resolution: number) {
  const geometry = feature.getGeometry() as LineString;
  const end = geometry.getLastCoordinate();
  const lineLength = geometry.getLength();
  const props = feature.getProperties();
  const endsInStandaloneCluster = Boolean(props?.['endsInStandaloneCluster']);

  const endsInStandaloneLocation = Boolean(props?.['endsInStandaloneLocation']);

  const CIRCLE_RADIUS = endsInStandaloneLocation ? 15 : 20;

  const lengthInPixels = lineLength / resolution;
  if (endsInStandaloneCluster || endsInStandaloneLocation) {
    if (lengthInPixels < 2.5 * CIRCLE_RADIUS) return undefined;
  } else if (lengthInPixels < 2) {
    /**remove connection to itself when ts and connected ups in same cluster */
    return undefined;
  }

  const circleMeters = CIRCLE_RADIUS * resolution;

  const fraction =
    endsInStandaloneCluster || endsInStandaloneLocation
      ? (lineLength - circleMeters) / lineLength
      : 1;
  const styles = [
    new Style({
      stroke: new Stroke({
        color: 'darkgreen',
        width: 1
      })
    })
  ];

  const start = geometry.getCoordinates()[geometry.getCoordinates().length - 2];

  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const rotation = Math.atan2(dy, dx);

  const point = geometry.getCoordinateAt(fraction)!;

  styles.push(
    new Style({
      geometry: new Point(point),
      image: new Icon({
        anchor: [0.8, 0.5],
        rotateWithView: true,
        rotation: -rotation,
        scale: 0.5,
        src: iconArrow
      })
    })
  );

  return styles;
}

function getUpType(props: any) {
  const { upConsumer, upControl, upExchange, upProducer, upProsumer } = props;
  let type: UpType = 'consumer';
  if (upConsumer === 1) {
    type = 'consumer';
  }
  if (upControl === 1) {
    type = 'control';
  }
  if (upExchange === 1) {
    type = 'exchange';
  }
  if (upProducer === 1) {
    type = 'producer';
  }
  if (upProsumer === 1) {
    type = 'prosumer';
  }
  return type;
}

function getStandaloneUpStyles(type: UpType, styles: Style[]) {
  switch (type) {
    case 'consumer': {
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: '#ADD8E6'
            }),
            radius: 15
          })
        })
      );
      styles.push(
        new Style({
          image: new Icon({
            rotation: 0,
            scale: 0.7,
            src: consumerUp
          })
        })
      );

      return styles;
    }
    case 'control': {
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgb(123, 104, 238)'
            }),

            radius: 15
          })
        })
      );
      styles.push(
        new Style({
          image: new Icon({
            rotation: 0,
            scale: 0.7,
            src: controlUp
          })
        })
      );

      return styles;
    }
    case 'exchange': {
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgb(0, 128, 128)'
            }),

            radius: 15
          })
        })
      );
      styles.push(
        new Style({
          image: new Icon({
            rotation: 0,
            scale: 0.7,
            src: exchangeUp
          })
        })
      );

      return styles;
    }
    case 'producer': {
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgb(70, 130, 180)'
            }),

            radius: 15
          })
        })
      );
      styles.push(
        new Style({
          image: new Icon({
            rotation: 0,
            scale: 0.7,
            src: producerUp
          })
        })
      );

      return styles;
    }
    case 'prosumer': {
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgb(0, 206, 209)'
            }),

            radius: 15
          })
        })
      );
      styles.push(
        new Style({
          image: new Icon({
            rotation: 0,
            scale: 0.7,
            src: prosumerUp
          })
        })
      );

      return styles;
    }
    default: {
      console.error('Type not found');
      return styles;
    }
  }
}

function getTsType(props: any) {
  const { ts35, ts110, ts1004, tsUnspecified } = props;
  let type: TsType = 'unspecified';
  if (tsUnspecified === 1) {
    type = 'unspecified';
  }
  if (ts35 === 1) {
    type = '35';
  }
  if (ts110 === 1) {
    type = '110';
  }
  if (ts1004 === 1) {
    type = '1004';
  }

  return type;
}

function getStandaloneTsStyles(type: TsType, styles: Style[]) {
  switch (type) {
    case 'unspecified': {
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgb(255, 215, 0)'
            }),
            radius: 15
          })
        })
      );
      styles.push(
        new Style({
          image: new Icon({
            rotation: 0,
            scale: 0.7,
            src: tsUnspecified
          })
        })
      );

      return styles;
    }
    case '35': {
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgb(255, 215, 0)'
            }),
            radius: 15
          })
        })
      );
      styles.push(
        new Style({
          image: new Icon({
            rotation: 0,
            scale: 0.7,
            src: ts35
          })
        })
      );

      return styles;
    }
    case '110': {
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgb(255, 69, 0)'
            }),
            radius: 15
          })
        })
      );
      styles.push(
        new Style({
          image: new Icon({
            rotation: 0,
            scale: 0.7,
            src: ts110
          })
        })
      );

      return styles;
    }
    case '1004': {
      styles.push(
        new Style({
          image: new Circle({
            fill: new Fill({
              color: 'rgb(255, 140, 0)'
            }),
            radius: 15
          })
        })
      );
      styles.push(
        new Style({
          image: new Icon({
            rotation: 0,
            scale: 0.7,
            src: ts1004
          })
        })
      );

      return styles;
    }

    default: {
      console.error('Type not found');
      return styles;
    }
  }
}
