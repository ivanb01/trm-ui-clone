import { debounce } from 'lodash';
import { MapBrowserEvent } from 'ol';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import { useEffect, useRef } from 'react';
import SuperCluster from 'supercluster';

// import { UsagePointInfo } from '../../model/interface/usagePoint/UsagePointInfo.ts';
import {
  calculateOverlayeOffset,
  // calculateOverlayeOffset,
  calculateOverlayePositioning
} from './calculateOverlayPositioning.ts';

interface UseOverlayProps {
  setTooltipProps: React.Dispatch<
    React.SetStateAction<SuperCluster.AnyProps | null>
  >;
  isOverlayHovered: React.MutableRefObject<boolean>;
  // isTsModeRef: React.MutableRefObject<boolean>;
  map: Map | null;
  overlayElRef: HTMLDivElement | null;
  target: string;
  tooltipProps: SuperCluster.AnyProps | null;
}

export const useTransformerStationOverlay = ({
  isOverlayHovered,
  // isTsModeRef,
  map,
  overlayElRef,
  setTooltipProps,
  target,
  tooltipProps
}: UseOverlayProps): Overlay | null => {
  const overlayRef = useRef<Overlay | null>(null);
  const initialSelectedFeatureRef = useRef<Feature<Point> | null>(null);
  const selectedFeatureRef = useRef<Feature<Point> | null>(null);
  const elementSet = useRef(false);

  const hideOverlay = debounce(() => {
    if (selectedFeatureRef.current || isOverlayHovered.current) return;
    overlayRef.current?.setPosition(undefined);
    overlayRef.current?.setOffset([0, 0]);
  }, 300);

  const showOverlay = debounce((feature: Feature<Point> | undefined) => {
    if (!feature) return;
    if (!map) return;
    if (!overlayRef.current) return;
    if (initialSelectedFeatureRef.current !== feature) return;
    const coordinates = feature.getGeometry()?.getCoordinates();
    const props = feature.getProperties();

    const propsId = Boolean(props.cluster)
      ? props.cluster_id
      : props.location?.id;

    const tooltipId = Boolean(tooltipProps?.cluster)
      ? tooltipProps?.cluster_id
      : tooltipProps?.location?.id;

    if (propsId !== tooltipId && !isOverlayHovered.current) {
      setTooltipProps(feature.getProperties() as SuperCluster.AnyProps);
    }

    const extent = map.getView().calculateExtent();
    if (coordinates) {
      const positioning = calculateOverlayePositioning(coordinates, extent);
      overlayRef.current.setPositioning(positioning);

      const offset = calculateOverlayeOffset(positioning);
      overlayRef.current.setOffset(offset);
    }

    const currentCoordinate = overlayRef.current.getPosition();
    if (
      !currentCoordinate ||
      currentCoordinate[0] !== coordinates?.[0] ||
      currentCoordinate[1] !== coordinates?.[1]
    )
      overlayRef.current.setPosition(coordinates);
  }, 300);

  useEffect(() => {
    if (!map || !target) {
      return;
    }
    // if (isTsModeRef.current) {
    //   return;
    // }
    // const el = document.getElementById('transformer-station-overlay-ref');
    const el = document.getElementById(target);

    const overlay = new Overlay({
      element: el ?? undefined,
      stopEvent: true
    });
    if (el) {
      elementSet.current = true;
    }

    map.addOverlay(overlay);
    overlayRef.current = overlay;

    const handleHover = (event: MapBrowserEvent<PointerEvent>) => {
      const pixel = map.getEventPixel(event.originalEvent);

      const feature: Feature<Point> | undefined = map.forEachFeatureAtPixel(
        pixel,
        (feat) => feat as Feature<Point> | undefined
      );
      if (feature) {
        initialSelectedFeatureRef.current = feature;
      } else {
        initialSelectedFeatureRef.current = null;
      }
      if (feature && !isOverlayHovered.current) {
        selectedFeatureRef.current = feature;
      }

      if (feature && overlayRef.current && !isOverlayHovered.current) {
        showOverlay(feature);
      } else if (!isOverlayHovered.current) {
        selectedFeatureRef.current = null;
        hideOverlay();
      }
    };

    // const handleClick = (event: MapBrowserEvent<MouseEvent>) => {
    //   const pixel = map.getEventPixel(event.originalEvent);
    //   const feature = map.forEachFeatureAtPixel(pixel, (feat) => feat);
    //   if (feature) {
    //     window.open(feature.get('wikiLink'), '_blank');
    //   }
    // };

    map.on('pointermove', handleHover);
    //map.on('click', handleClick);

    // Cleanup function
    return () => {
      if (overlayRef.current) {
        map.removeOverlay(overlayRef.current);
        map.un('pointermove', handleHover);
        // map.un('click', handleClick);
      }
    };
  }, [map, target, overlayElRef]);

  return overlayRef.current;
};

export default useTransformerStationOverlay;
