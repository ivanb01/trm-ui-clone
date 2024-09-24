import 'ol/ol.css';

import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON.js';
import { LineString } from 'ol/geom';
// import { LineString } from 'ol/geom';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/WebGLTile';
import Map from 'ol/Map';
import { fromLonLat, transformExtent } from 'ol/proj';
import { XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SuperCluster from 'supercluster';

import LocationTooltip from '../../components/mapComponent/LocationTooltip.tsx';
import {
  CLUSTER_MAX_ZOOM,
  CLUSTER_RADIUS,
  DEFAULT_CENTER_MERC,
  DEFAULT_ZOOM,
  // MAP_ICONS_RADIUS,
  WEB_MERCATOR_PROJECTION,
  WGS84_PROJECTION,
  WORLD_EXTENT
} from '../../model/constants/mapConstants.ts';
import { LocationDataDTOV2 } from '../../model/interface/usagePoint/LocationDataDTOV2.ts';
import { getConnectedLocationsV3 } from '../../services/usagePoints/getConnectedLocationsV3.ts';
import { useGetTrafosV3 } from '../../services/usagePoints/useGetTrafosV3.ts';
// import { useGetLocationsDataV2 } from '../../services/usagePoints/useGetLocationsV2.ts';
import { getSearchParamsAsObject } from '../../utility/helpers/filter.ts';
import {
  getAggregatedTsUp,
  getAggregateLeaves,
  // getVisibleFeatures,
  removeLayerByClassName,
  // getClusterRadius,
  zoomCluster
} from '../../utility/helpers/map/mapHelpers.ts';
import useTransformerStationOverlay from '../../utility/map/useTransformerStationOverlay.ts';
import { MapFilterV2 } from './filter/MapFilterV2.tsx';
// import { MapFilter } from './filter/MapFilter.tsx';
import {
  getArrowStylesV2,
  // getArrowStylesV2,
  // getClusterStylesUpV3,
  getClusterStylesV2,
  getPinStyles
  // getStylesUpV3
} from './icons.ts';
import { Legend } from './legend/Legend.tsx';

const targetId = 'main-clicker-map';
export interface UsagePointFilterInterface {
  upGroups: string[] | undefined;
  upId: string[] | undefined;
  upKind: string[] | undefined;
  upPricing: string[] | undefined;
  upType: string[] | undefined;
}
export const MapPageClickerV4 = () => {
  const mapRef = useRef<Map | null>(null);
  const location = useLocation();
  const locationLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const [connectionsFetching, setConnectionsFetching] = useState(false);

  const [filter, setFilter] = useState<Record<string, Array<string>>>({
    tsTypes: [],
    upTypes: []
  });
  const [tooltipProps, setTooltipProps] =
    useState<SuperCluster.AnyProps | null>(null);
  useEffect(() => {
    const f = getSearchParamsAsObject(location.search);
    setFilter(f);
  }, [location.search]);

  const currentClustersRef = useRef<
    (
      | SuperCluster.ClusterFeature<SuperCluster.AnyProps>
      | SuperCluster.PointFeature<SuperCluster.AnyProps>
    )[]
  >([]);
  const isOverlayHovered = useRef(false);
  const overlayElRef = useRef<HTMLDivElement | null>(null);

  const locationsSourceRef = useRef<VectorSource | null>(null);
  const arrowsSourceRef = useRef<VectorSource | null>(null);
  const connectedLocationsSourceRef = useRef<VectorSource | null>(null);
  const connectedLocationsZoomed = useRef(false);

  const [selectedConnection, setSelectedConnection] =
    useState<LocationDataDTOV2 | null>(null);
  const isTsContext = Boolean(selectedConnection);
  useState<SuperCluster.AnyProps | null>(null);

  const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM);

  const [tpIdFilter, setTpIdFilter] = useState<string | undefined>(undefined);

  const [upFilter, setUpFilter] = useState<UsagePointFilterInterface>({
    upGroups: undefined,
    upId: undefined,
    upKind: undefined,
    upPricing: undefined,
    upType: undefined
  });

  const {
    data: locationsData,
    isFetching,
    isLoading: loadingLocations
  } = useGetTrafosV3({ filter });

  useTransformerStationOverlay({
    isOverlayHovered,
    map: mapRef.current,
    overlayElRef: overlayElRef.current,
    setTooltipProps,
    target: 'location-overlay-ref',
    tooltipProps
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newParams: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });
    setUpFilter({ ...upFilter, ...newParams });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newParams: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });
    newParams.transformerStation && setTpIdFilter(newParams.transformerStation);
  }, [location.search]);

  useEffect(() => {
    /**If map initalized return */
    if (mapRef.current) return;

    const worldExtentWebMerc = transformExtent(
      WORLD_EXTENT,
      WGS84_PROJECTION,
      WEB_MERCATOR_PROJECTION
    );
    const view = new View({
      center: [DEFAULT_CENTER_MERC.lon, DEFAULT_CENTER_MERC.lat],
      extent: worldExtentWebMerc,
      smoothExtentConstraint: false,
      zoom: DEFAULT_ZOOM
    });

    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    });
    mapRef.current = new Map({
      layers: [osmLayer],
      target: targetId,
      view
    });
    mapRef.current.on('moveend', (e) => {
      const zoom = e.map.getView().getZoom();
      setCurrentZoom(zoom || 0);
    });

    mapRef.current.on('click', (e) => {
      if (!mapRef.current) return;
      const pixel = mapRef.current.getEventPixel(e.originalEvent);

      const feature: Feature<Point> | undefined =
        mapRef.current.forEachFeatureAtPixel(
          pixel,
          (feat) => feat as Feature<Point> | undefined
        );
      if (feature) {
        const isCluster = Boolean(feature.get('cluster'));
        if (isCluster) {
          const leaves = feature.get('leaves');
          zoomCluster(leaves, mapRef.current);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!locationsData || !mapRef.current) return;
    if (selectedConnection) return;

    const clusterer = new SuperCluster({
      maxZoom: CLUSTER_MAX_ZOOM,
      radius: CLUSTER_RADIUS
    });
    const points = locationsData.map((point) => {
      const coordinates = [point.lon, point.lat];
      return {
        geometry: {
          coordinates,
          type: 'Point' as const
        },
        properties: { location: point },
        type: 'Feature' as const
      };
    });
    clusterer.load(points);

    const clusters = clusterer.getClusters(
      [-180, -85, 180, 85],
      Math.round(mapRef.current.getView().getZoom()!)
    );

    clusters.forEach((clus) => {
      if (clus.properties.cluster) {
        const leaves = clusterer.getLeaves(
          clus.properties.cluster_id,
          Infinity
        );

        clus.properties.leaves = leaves.map((l) => l.properties.location);
      }
    });
    currentClustersRef.current = clusters;
    clusteringDoneCB(clusters);
  }, [locationsData, currentZoom, tpIdFilter, selectedConnection]);

  function clusteringDoneCB(
    clusters: (
      | SuperCluster.ClusterFeature<SuperCluster.AnyProps>
      | SuperCluster.PointFeature<SuperCluster.AnyProps>
    )[]
  ) {
    const featuresTS = clusters.map((c) => {
      const isCluster = c.properties.cluster;
      if (isCluster) {
        const aggregatedData = getAggregateLeaves(c.properties.leaves);

        const { totalTs, totalUp } = getAggregatedTsUp(
          aggregatedData as LocationDataDTOV2
        );

        return new Feature({
          coordinates: c.geometry.coordinates,
          geometry: new Point(fromLonLat(c.geometry.coordinates)),
          ...aggregatedData,
          ...c.properties,
          totalTs,
          totalUp
        });
      }
      const { totalTs, totalUp } = getAggregatedTsUp(c.properties.location);
      return new Feature({
        coordinates: c.geometry.coordinates,
        geometry: new Point(fromLonLat(c.geometry.coordinates)),
        ...c.properties,
        totalTs,
        totalUp
      });
    });

    if (!locationsSourceRef.current) {
      locationsSourceRef.current = new VectorSource({
        features: featuresTS,
        format: new GeoJSON()
      });
    } else {
      locationsSourceRef.current.clear();
      locationsSourceRef.current.addFeatures(featuresTS);
    }

    const hasLocationLayer = mapRef.current
      ?.getAllLayers()
      .some((l) => l.getClassName() === 'location-layer');
    if (!hasLocationLayer) {
      const vectorLayer = new VectorLayer<VectorSource>({
        className: 'location-layer',
        source: locationsSourceRef.current,
        style: (feature, resolution) => {
          const props = feature.getProperties();
          const isCluster = props.cluster;

          if (isCluster) {
            return getClusterStylesV2(
              feature as Feature<Point>,
              resolution,
              selectedConnection?.id ?? null
            );
          } else {
            return getPinStyles(
              props,
              resolution,
              selectedConnection?.id ?? null
            );
          }
        },
        zIndex: 9
      });
      locationLayerRef.current = vectorLayer;
      mapRef.current && mapRef.current.addLayer(vectorLayer);
    }
  }
  const mapFilterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedConnection) {
      tsClickedCB(selectedConnection);
    } else {
      removeLayerByClassName(mapRef, 'connected-location-layer');
      removeLayerByClassName(mapRef, 'arrows-layer');
      connectedLocationsSourceRef.current?.clear();
      arrowsSourceRef.current?.clear();
      connectedLocationsZoomed.current = false;
    }
  }, [selectedConnection, currentZoom, filter]);

  async function tsClickedCB(location: LocationDataDTOV2) {
    if (!mapRef.current) return;
    if (!locationsSourceRef.current) return;
    setConnectionsFetching(true);
    const connectedLocations = await getConnectedLocationsV3(
      location.trafos ? location.trafos.map((t) => t.id) : [],
      location,
      filter
    );

    setConnectionsFetching(false);

    locationsSourceRef.current.clear();

    if (!connectedLocationsZoomed.current) {
      const locationsToZoom = connectedLocations.map((l) => ({
        lat: l.lat,
        lon: l.lon
      }));

      zoomCluster(locationsToZoom, mapRef.current);
      connectedLocationsZoomed.current = true;
    }

    const clusterer = new SuperCluster({
      maxZoom: CLUSTER_MAX_ZOOM,
      radius: CLUSTER_RADIUS
    });

    const points = connectedLocations.map((point) => {
      const coordinates = [point.lon, point.lat];
      return {
        geometry: {
          coordinates,
          type: 'Point' as const
        },
        properties: { location: point },
        type: 'Feature' as const
      };
    });
    clusterer.load(points);

    const clusters = clusterer.getClusters(
      [-180, -85, 180, 85],
      Math.round(mapRef.current.getView().getZoom()!)
    );
    clusters.forEach((clus) => {
      if (clus.properties.cluster) {
        const leaves = clusterer.getLeaves(
          clus.properties.cluster_id,
          Infinity
        );

        clus.properties.leaves = leaves.map((l) => l.properties.location);
      }
    });
    const foundLocationInCluster = clusters.find((c) => {
      return c.properties.cluster
        ? c.properties?.leaves.find(
            (l: LocationDataDTOV2) => l.id === location.id
          )
        : false;
    });

    const startingPoint = foundLocationInCluster
      ? fromLonLat(foundLocationInCluster.geometry.coordinates)
      : fromLonLat([location.lon, location.lat]);
    const features = clusters.map((c) => {
      const isCluster = c.properties.cluster;

      if (isCluster) {
        const aggregatedData = getAggregateLeaves(c.properties.leaves);

        const { totalTs, totalUp } = getAggregatedTsUp(
          aggregatedData as LocationDataDTOV2
        );
        return new Feature({
          coordinates: c.geometry.coordinates,
          geometry: new Point(fromLonLat(c.geometry.coordinates)),
          ...c.properties,
          aggregatedData,
          totalTs,
          totalUp
        });
      }
      const { totalTs, totalUp } = getAggregatedTsUp(c.properties.location);

      return new Feature({
        coordinates: c.geometry.coordinates,
        geometry: new Point(fromLonLat(c.geometry.coordinates)),
        ...c.properties,
        totalTs,
        totalUp
      });
    });

    const arrowsFeatures = clusters.map((c) => {
      const { totalTs, totalUp } = getAggregatedTsUp(
        c.properties.cluster
          ? (c.properties as LocationDataDTOV2)
          : (c.properties.location as LocationDataDTOV2)
      );
      const endsInStandaloneCluster =
        c.properties.cluster && (totalTs === 0 || totalUp === 0);

      const endsInStandaloneLocation =
        !c.properties.cluster &&
        ((totalTs === 1 && totalUp === 0) || (totalUp === 1 && totalTs === 0));
      return new Feature({
        endsInStandaloneCluster,
        endsInStandaloneLocation,
        geometry: new LineString([
          startingPoint,
          fromLonLat(c.geometry.coordinates)
        ])
      });
    });
    if (!arrowsSourceRef.current) {
      arrowsSourceRef.current = new VectorSource({
        features: arrowsFeatures,
        format: new GeoJSON()
      });
    } else {
      arrowsSourceRef.current.clear();
      arrowsSourceRef.current.addFeatures(arrowsFeatures);
    }
    const hasArrowsLayer = mapRef.current
      ?.getAllLayers()
      .some((l) => l.getClassName() === 'arrows-layer');
    if (!hasArrowsLayer) {
      const layer = new VectorLayer({
        className: 'arrows-layer',
        source: arrowsSourceRef.current,
        style: (feature, resolution) => {
          return getArrowStylesV2(feature, resolution);
        },
        zIndex: 8
      });
      mapRef.current.addLayer(layer);
      locationLayerRef.current?.changed();
    }
    if (!connectedLocationsSourceRef.current) {
      connectedLocationsSourceRef.current = new VectorSource({
        features,
        format: new GeoJSON()
      });
    } else {
      connectedLocationsSourceRef.current.clear();
      connectedLocationsSourceRef.current.addFeatures(features);
    }

    const hasConnectedLocationLayer = mapRef.current
      ?.getAllLayers()
      .some((l) => l.getClassName() === 'connected-location-layer');
    if (!hasConnectedLocationLayer) {
      const vectorLayer = new VectorLayer<VectorSource>({
        className: 'connected-location-layer',
        source: connectedLocationsSourceRef.current,
        style: (feature, resolution) => {
          const props = feature.getProperties();
          const isCluster = props.cluster;

          if (isCluster) {
            return getClusterStylesV2(
              feature as Feature<Point>,
              resolution,
              selectedConnection?.id ?? null
            );
          } else {
            return getPinStyles(
              props,
              resolution,
              selectedConnection?.id ?? null
            );
          }
        },
        zIndex: 9
      });

      mapRef.current && mapRef.current.addLayer(vectorLayer);
    }
  }

  function onMouse(state: 'enter' | 'leave') {
    isOverlayHovered.current = state === 'enter' ? true : false;
  }

  return (
    <>
      <Legend />
      <div
        style={{
          height:
            window.innerHeight -
            Number(mapFilterRef.current?.clientHeight ?? 0) -
            10,
          width: '100%'
        }}
        className={'relative size-full min-h-40 min-w-40'}
        data-cy="map"
        id={targetId}
      >
        <MapFilterV2
          setFilter={(e) =>
            setFilter((prev) => {
              return { ...prev, tsTypes: e.tsTypes, upTypes: e.upTypes };
            })
          }
          isTsContext={isTsContext}
          ref={mapFilterRef}
          setTpIdFilter={setTpIdFilter}
          transformer={tpIdFilter}
        />
        {Boolean(selectedConnection) && (
          <div className={'absolute right-[40px] top-[40px] z-40'}>
            <Button
              icon={<RollbackOutlined />}
              shape="circle"
              type="primary"
              onClick={() => setSelectedConnection(null)}
            />
          </div>
        )}
      </div>
      {/* Outer div must exist when React tries to remove element on unmount
       inner div is hijacked by map overlay */}
      <div>
        <div
          id="location-overlay-ref"
          ref={overlayElRef}
          onMouseEnter={() => onMouse('enter')}
          onMouseLeave={() => onMouse('leave')}
        >
          <LocationTooltip
            isOverlayHovered={isOverlayHovered}
            props={tooltipProps}
            setSelectedConnection={setSelectedConnection}
            setTooltipProps={setTooltipProps}
          />
        </div>
      </div>

      {(loadingLocations || isFetching || connectionsFetching) && (
        <Card
          className={
            'z-40 m-auto flex size-16 flex-wrap items-center justify-center bg-white/70'
          }
          bordered={false}
        >
          <LoadingOutlined className={'z-50 text-xl text-sky-700'} spin />
        </Card>
      )}
    </>
  );
};
