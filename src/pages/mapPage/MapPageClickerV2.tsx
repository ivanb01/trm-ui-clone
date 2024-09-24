import 'ol/ol.css';

import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON.js';
import { LineString } from 'ol/geom';
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
import { getConnectedLocations } from '../../services/usagePoints/getConnectedLocations.ts';
import { useGetLocationsDataV2 } from '../../services/usagePoints/useGetLocationsV2.ts';
import { getSearchParamsAsObject } from '../../utility/helpers/filter.ts';
import {
  getAggregatedTsUp,
  getAggregateLeaves,
  getVisibleFeatures,
  removeLayerByClassName,
  // getClusterRadius,
  zoomCluster
} from '../../utility/helpers/map/mapHelpers.ts';
import { MapFilter } from './filter/MapFilter.tsx';
import { getArrowStylesV2, getClusterStylesV2, getPinStyles } from './icons.ts';
import { Legend } from './legend/Legend.tsx';

const targetId = 'main-clicker-map';
export interface UsagePointFilterInterface {
  upGroups: string[] | undefined;
  upId: string[] | undefined;
  upKind: string[] | undefined;
  upPricing: string[] | undefined;
  upType: string[] | undefined;
}
export const MapPageClickerV2 = () => {
  const mapRef = useRef<Map | null>(null);
  const location = useLocation();
  const locationLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const [connectionsFetching, setConnectionsFetching] = useState(false);
  // const overlayRef = useRef<Overlay | null>(null);
  const [filter, setFilter] = useState<Record<string, Array<number | string>>>(
    {}
  );
  useEffect(() => {
    const f = getSearchParamsAsObject(location.search);
    setFilter(f);
  }, [location.search]);
  const hoveredFeatureRef = useRef<Feature<Point> | null>(null);
  const currentClustersRef = useRef<
    (
      | SuperCluster.ClusterFeature<SuperCluster.AnyProps>
      | SuperCluster.PointFeature<SuperCluster.AnyProps>
    )[]
  >([]);

  const locationsRef = useRef<VectorSource | null>(null);
  const arrowsSourceRef = useRef<VectorSource | null>(null);

  const [selectedConnection, setSelectedConnection] =
    useState<LocationDataDTOV2 | null>(null);
  const selectedConnectionIdRef = useRef<null | string>(null);

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
  } = useGetLocationsDataV2({ filter });

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
    mapRef.current.on('pointermove', (e) => {
      if (!mapRef.current) return;
      const pixel = mapRef.current.getEventPixel(e.originalEvent);

      const feature: Feature<Point> | undefined =
        mapRef.current.forEachFeatureAtPixel(
          pixel,
          (feat) => feat as Feature<Point> | undefined
        );
      if (feature) {
        const hovered = feature.get('hover');
        if (!hovered) {
          hoveredFeatureRef.current = feature;
        }
      } else {
        if (hoveredFeatureRef.current) {
        }
      }
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
          setSelectedConnection(null);
          selectedConnectionIdRef.current = null;
        } else {
          /**check if has trafo */
          const properties = feature.getProperties();
          const { totalTs } = getAggregatedTsUp(properties.location);
          const hasTs = totalTs > 0;
          if (hasTs) {
            if (properties.location.id !== selectedConnection?.id) {
              setSelectedConnection(properties.location);
              selectedConnectionIdRef.current = properties.location.id;
            } else {
              setSelectedConnection(null);
              selectedConnectionIdRef.current = null;
            }
          }
        }
      } else {
        setSelectedConnection(null);
        selectedConnectionIdRef.current = null;
      }
    });
  }, []);

  useEffect(() => {
    if (!locationsData || !mapRef.current) return;

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
  }, [locationsData, currentZoom, tpIdFilter]);

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

    if (!locationsRef.current) {
      locationsRef.current = new VectorSource({
        features: featuresTS,
        format: new GeoJSON()
      });
    } else {
      locationsRef.current.clear();
      locationsRef.current.addFeatures(featuresTS);
    }

    const hasDotsLocationLayer = mapRef.current
      ?.getAllLayers()
      .some((l) => l.getClassName() === 'location-layer');
    if (!hasDotsLocationLayer) {
      const vectorLayer = new VectorLayer<VectorSource>({
        className: 'location-layer',
        source: locationsRef.current,
        style: (feature, resolution) => {
          const props = feature.getProperties();
          const isCluster = props.cluster;

          if (isCluster) {
            return getClusterStylesV2(
              feature as Feature<Point>,
              resolution,
              selectedConnectionIdRef.current
            );
          } else {
            return getPinStyles(
              props,
              resolution,
              selectedConnectionIdRef.current
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
      removeLayerByClassName(mapRef, 'arrows-layer');
      arrowsSourceRef.current?.clear();
    }
  }, [selectedConnection, currentZoom]);

  async function tsClickedCB(location: LocationDataDTOV2) {
    if (!mapRef.current) return;
    if (!locationsRef.current) return;
    setConnectionsFetching(true);
    const locationsHash = await getConnectedLocations(location.id);
    setConnectionsFetching(false);
    const foundLocationInCluster = currentClustersRef.current?.find((c) => {
      return c.properties.cluster
        ? c.properties?.leaves.find(
            (l: LocationDataDTOV2) => l.id === location.id
          )
        : false;
    });
    const startingPoint = foundLocationInCluster
      ? fromLonLat(foundLocationInCluster.geometry.coordinates)
      : fromLonLat([location.lon, location.lat]);

    const visibleFeatures = getVisibleFeatures(
      mapRef.current!,
      locationsRef.current!
    );
    const visibleFeaturesWithConnection = visibleFeatures.filter((f) => {
      const props = f.getProperties();
      if (!props.cluster) return Boolean(locationsHash[props.location.id]);
      return props.leaves.some((l: LocationDataDTOV2) =>
        Boolean(locationsHash[l.id])
      );
    });
    const features: Feature<LineString>[] = [];
    visibleFeaturesWithConnection.forEach((f) => {
      const props = f.getProperties();
      const geom = f.getGeometry() as Point;
      const isCluster = props.cluster;
      const { totalTs, totalUp } = getAggregatedTsUp(
        isCluster
          ? (props as LocationDataDTOV2)
          : (props.location as LocationDataDTOV2)
      );
      const endsInStandaloneCluster =
        props.cluster && (totalTs === 0 || totalUp === 0);

      const endsInStandaloneLocation =
        !props.cluster &&
        ((totalTs === 1 && totalUp === 0) || (totalUp === 1 && totalTs === 0));

      features.push(
        new Feature({
          endsInStandaloneCluster,
          endsInStandaloneLocation,
          geometry: new LineString([startingPoint, geom.getCoordinates()])
          // ...props
        })
      );
    });
    // const features = new GeoJSON().readFeatures(gJson);
    if (!arrowsSourceRef.current) {
      arrowsSourceRef.current = new VectorSource({
        features: features,
        format: new GeoJSON()
      });
    } else {
      arrowsSourceRef.current.clear();
      arrowsSourceRef.current.addFeatures(features);
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
        <MapFilter
          setFilter={(e) =>
            setFilter((prev) => {
              return { ...prev, tsTypes: e.tsTypes, upTypes: e.upTypes };
            })
          }
          ref={mapFilterRef}
          setTpIdFilter={setTpIdFilter}
          transformer={tpIdFilter}
        />
      </div>
      {/* Outer div must exist when React tries to remove element on unmount
       inner div is hijacked by map overlay */}
      {/* <div>
        <div id="location-overlay-ref">
          <LocationTooltip props={tooltipProps} />
        </div>
      </div> */}
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
