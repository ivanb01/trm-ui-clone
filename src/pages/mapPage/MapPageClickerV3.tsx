// import 'ol/ol.css';

// import { LoadingOutlined } from '@ant-design/icons';
// import { Card } from 'antd';
// import Feature from 'ol/Feature';
// import GeoJSON from 'ol/format/GeoJSON.js';
// import Point from 'ol/geom/Point';
// import TileLayer from 'ol/layer/Tile';
// import VectorLayer from 'ol/layer/Vector';
// import Map from 'ol/Map';
// import { fromLonLat, transformExtent } from 'ol/proj';
// import { OSM } from 'ol/source';
// import VectorSource from 'ol/source/Vector';
// // import XYZ from 'ol/source/XYZ';
// import View from 'ol/View';
// import { useEffect, useRef, useState } from 'react';
// import SuperCluster from 'supercluster';

// import {
//   CLUSTER_MAX_ZOOM,
//   //   CLUSTER_RADIUS,
//   CLUSTER_RADIUS_V3,
//   DEFAULT_CENTER_MERC,
//   DEFAULT_ZOOM,
//   WEB_MERCATOR_PROJECTION,
//   WGS84_PROJECTION,
//   WORLD_EXTENT
// } from '../../model/constants/mapConstants.ts';
// import { TrafoV3DTO } from '../../model/interface/usagePoint/TrafoV3DTO.ts';
// import { useGetTrafosV3 } from '../../services/usagePoints/useGetTrafosV3.ts';
// import { useGetUsagePointsByTrafo } from '../../services/usagePoints/useGetUsagePointsByTrafo.ts';
// import {
//   isTrafoV3,
//   removeLayerByClassName,
//   zoomCluster
// } from '../../utility/helpers/map/mapHelpers.ts';
// import { MapFilter } from './filter/MapFilter.tsx';
// import {
//   getClusterStylesTrafoV3,
//   getClusterStylesUpV3,
//   getStylesTrafoV3,
//   getStylesUpV3
// } from './icons.ts';
// import { Legend } from './legend/Legend.tsx';

// const targetId = 'main-clicker-map-v3';

// export const MapPageClickerV3 = () => {
//   const mapRef = useRef<Map | null>(null);
//   const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM);
//   const [selectedTrafo, setSelectedTrafo] = useState<TrafoV3DTO | null>(null);
//   const selectedTrafoRef = useRef<TrafoV3DTO | null>(null);
//   const { data: trafosData, isLoading: loadingLocations } = useGetTrafosV3();
//   const trafosSourceRef = useRef<VectorSource | null>(null);
//   const upSourceRef = useRef<VectorSource | null>(null);
//   const { data: upDataByTrafo, isLoading: isUpLoading } =
//     useGetUsagePointsByTrafo(selectedTrafo ? selectedTrafo.id : null);

//   const mapFilterRef = useRef<HTMLDivElement>(null);
//   const [filter, setFilter] = useState<Record<string, Array<number | string>>>(
//     {}
//   );
//   const [tpIdFilter, setTpIdFilter] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     /**If map initalized return */
//     if (mapRef.current) return;

//     const worldExtentWebMerc = transformExtent(
//       WORLD_EXTENT,
//       WGS84_PROJECTION,
//       WEB_MERCATOR_PROJECTION
//     );
//     const view = new View({
//       center: [DEFAULT_CENTER_MERC.lon, DEFAULT_CENTER_MERC.lat],
//       extent: worldExtentWebMerc,
//       smoothExtentConstraint: false,
//       zoom: DEFAULT_ZOOM
//     });

//     const osmLayer = new TileLayer({
//       preload: Infinity,
//       source: new OSM({
//         url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//       })
//     });
//     mapRef.current = new Map({
//       layers: [osmLayer],
//       target: targetId,
//       view
//     });
//     mapRef.current.on('moveend', (e) => {
//       const zoom = e.map.getView().getZoom();
//       setCurrentZoom(zoom || 0);
//     });

//     // mapRef.current.on('pointermove', (e) => {
//     //   if (!mapRef.current) return;
//     //   const pixel = mapRef.current.getEventPixel(e.originalEvent);

//     //   const feature: Feature<Point> | undefined =
//     //     mapRef.current.forEachFeatureAtPixel(
//     //       pixel,
//     //       (feat) => feat as Feature<Point> | undefined
//     //     );
//     //   if (feature) {
//     //     const hovered = feature.get('hover');
//     //     if (!hovered) {
//     //       hoveredFeatureRef.current = feature;
//     //     }
//     //   } else {
//     //     if (hoveredFeatureRef.current) {
//     //     }
//     //   }
//     // });

//     mapRef.current.on('click', (e) => {
//       if (!mapRef.current) return;
//       const pixel = mapRef.current.getEventPixel(e.originalEvent);

//       const feature: Feature<Point> | undefined =
//         mapRef.current.forEachFeatureAtPixel(
//           pixel,
//           (feat) => feat as Feature<Point> | undefined
//         );
//       if (feature) {
//         const isCluster = Boolean(feature.get('cluster'));

//         if (isCluster) {
//           const leaves = feature.get('leaves');
//           zoomCluster(leaves, mapRef.current);
//         } else {
//           const location = feature.get('location');
//           if (isTrafoV3(location)) {
//             const alreadySelected =
//               location.id === selectedTrafoRef.current?.id;

//             const selected = alreadySelected ? null : location;
//             setSelectedTrafo(selected);
//             selectedTrafoRef.current = selected;
//           }
//         }
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (!trafosData || !mapRef.current) return;

//     const clusterer = new SuperCluster({
//       maxZoom: CLUSTER_MAX_ZOOM,
//       radius: CLUSTER_RADIUS_V3
//     });
//     const points = trafosData.map((point) => {
//       const coordinates = [point.lon, point.lat];
//       return {
//         geometry: {
//           coordinates,
//           type: 'Point' as const
//         },
//         properties: { location: point },
//         type: 'Feature' as const
//       };
//     });
//     clusterer.load(points);

//     const clusters = clusterer.getClusters(
//       [-180, -85, 180, 85],
//       Math.round(mapRef.current.getView().getZoom()!)
//     );

//     clusters.forEach((clus) => {
//       if (clus.properties.cluster) {
//         const leaves = clusterer.getLeaves(
//           clus.properties.cluster_id,
//           Infinity
//         );

//         clus.properties.leaves = leaves.map((l) => l.properties.location);
//       }
//     });

//     clusteringDoneCB(clusters);
//   }, [trafosData, currentZoom, selectedTrafo]);

//   useEffect(() => {
//     if (!selectedTrafo) {
//       removeLayerByClassName(mapRef, 'up-layer');
//     }
//     if (!upDataByTrafo || !mapRef.current) return;

//     const clusterer = new SuperCluster({
//       maxZoom: CLUSTER_MAX_ZOOM,
//       radius: CLUSTER_RADIUS_V3
//     });
//     const points = upDataByTrafo
//       .filter((p) => Boolean(p.location))
//       .map((point) => {
//         const coordinates = [point.location.lon, point.location.lat];
//         return {
//           geometry: {
//             coordinates,
//             type: 'Point' as const
//           },
//           properties: { location: point },
//           type: 'Feature' as const
//         };
//       });
//     clusterer.load(points);

//     const clusters = clusterer.getClusters(
//       [-180, -85, 180, 85],
//       Math.round(mapRef.current.getView().getZoom()!)
//     );

//     clusters.forEach((clus) => {
//       if (clus.properties.cluster) {
//         const leaves = clusterer.getLeaves(
//           clus.properties.cluster_id,
//           Infinity
//         );

//         clus.properties.leaves = leaves.map((l) => l.properties.location);
//       }
//     });

//     clusteringDoneUpCB(clusters);
//   }, [upDataByTrafo, selectedTrafo, currentZoom]);
//   useEffect(() => {
//     if (!upDataByTrafo?.length || !mapRef.current) return;
//     const toZoom = upDataByTrafo.map((d) => ({
//       lat: d.location.lat,
//       lon: d.location.lon
//     }));
//     if (selectedTrafo)
//       toZoom.push({ lat: selectedTrafo.lat, lon: selectedTrafo.lon });
//     zoomCluster(toZoom, mapRef.current);
//   }, [upDataByTrafo]);
//   function clusteringDoneUpCB(
//     clusters: (
//       | SuperCluster.ClusterFeature<SuperCluster.AnyProps>
//       | SuperCluster.PointFeature<SuperCluster.AnyProps>
//     )[]
//   ) {
//     const features = clusters.map((c) => {
//       const isCluster = c.properties.cluster;
//       if (isCluster) {
//         return new Feature({
//           coordinates: c.geometry.coordinates,
//           geometry: new Point(fromLonLat(c.geometry.coordinates)),

//           ...c.properties
//         });
//       }

//       return new Feature({
//         coordinates: c.geometry.coordinates,
//         geometry: new Point(fromLonLat(c.geometry.coordinates)),
//         ...c.properties
//       });
//     });

//     if (!upSourceRef.current) {
//       upSourceRef.current = new VectorSource({
//         features: features,
//         format: new GeoJSON()
//       });
//     } else {
//       upSourceRef.current.clear();
//       upSourceRef.current.addFeatures(features);
//     }

//     const hasUpLayer = mapRef.current
//       ?.getAllLayers()
//       .some((l) => l.getClassName() === 'up-layer');
//     if (!hasUpLayer) {
//       const vectorLayer = new VectorLayer<VectorSource>({
//         className: 'up-layer',
//         source: upSourceRef.current,
//         style: (feature) => {
//           const props = feature.getProperties();
//           console.log('up ', props);
//           const isCluster = props.cluster;
//           if (isCluster) return getClusterStylesUpV3(feature as Feature<Point>);

//           return getStylesUpV3(feature as Feature<Point>);
//         },
//         zIndex: 9
//       });
//       //   locationLayerRef.current = vectorLayer;
//       mapRef.current && mapRef.current.addLayer(vectorLayer);
//     }
//   }
//   function clusteringDoneCB(
//     clusters: (
//       | SuperCluster.ClusterFeature<SuperCluster.AnyProps>
//       | SuperCluster.PointFeature<SuperCluster.AnyProps>
//     )[]
//   ) {
//     const features = selectedTrafo
//       ? [
//           new Feature({
//             coordinates: [selectedTrafo.lon, selectedTrafo.lat],
//             geometry: new Point(
//               fromLonLat([selectedTrafo.lon, selectedTrafo.lat])
//             ),
//             location: { ...selectedTrafo }
//           })
//         ]
//       : clusters.map((c) => {
//           const isCluster = c.properties.cluster;
//           if (isCluster) {
//             return new Feature({
//               coordinates: c.geometry.coordinates,
//               geometry: new Point(fromLonLat(c.geometry.coordinates)),

//               ...c.properties
//             });
//           }

//           return new Feature({
//             coordinates: c.geometry.coordinates,
//             geometry: new Point(fromLonLat(c.geometry.coordinates)),
//             ...c.properties
//           });
//         });

//     if (!trafosSourceRef.current) {
//       trafosSourceRef.current = new VectorSource({
//         features: features,
//         format: new GeoJSON()
//       });
//     } else {
//       trafosSourceRef.current.clear();
//       trafosSourceRef.current.addFeatures(features);
//     }
//     const hasTrafosLayer = mapRef.current
//       ?.getAllLayers()
//       .some((l) => l.getClassName() === 'trafos-layer');
//     if (!hasTrafosLayer) {
//       const vectorLayer = new VectorLayer<VectorSource>({
//         className: 'trafos-layer',
//         source: trafosSourceRef.current,
//         style: (feature) => {
//           const props = feature.getProperties();
//           const isCluster = props.cluster;
//           if (isCluster)
//             return getClusterStylesTrafoV3(feature as Feature<Point>);

//           return getStylesTrafoV3(feature as Feature<Point>);
//         },
//         zIndex: 9
//       });
//       //   locationLayerRef.current = vectorLayer;
//       mapRef.current && mapRef.current.addLayer(vectorLayer);
//     }
//   }

//   return (
//     <div className="relative">
//       <Legend />
//       <div
//         style={{
//           height:
//             window.innerHeight -
//             // Number(mapFilterRef.current?.clientHeight ?? 0) -
//             10,
//           width: '100%'
//         }}
//         className={'relative size-full min-h-40 min-w-40'}
//         data-cy="map"
//         id={targetId}
//       >
//         {/* <MapFilter
//           setFilter={(e) =>
//             setFilter((prev) => {
//               return { ...prev, tsTypes: e.tsTypes, upTypes: e.upTypes };
//             })
//           }
//           ref={mapFilterRef}
//           setTpIdFilter={setTpIdFilter}
//           transformer={tpIdFilter}
//         /> */}
//       </div>
//       {/* Outer div must exist when React tries to remove element on unmount
//        inner div is hijacked by map overlay */}
//       {/* <div>
//         <div id="location-overlay-ref">
//           <LocationTooltip props={tooltipProps} />
//         </div>
//       </div> */}
//       {(loadingLocations || isUpLoading) && (
//         <Card
//           className={
//             'absolute bottom-[16px] left-1/2 z-40 m-auto flex size-16 -translate-x-1/2 flex-wrap items-center justify-center bg-white/70'
//           }
//           bordered={false}
//         >
//           <LoadingOutlined className={'z-50 text-xl text-sky-700'} spin />
//         </Card>
//       )}
//     </div>
//   );
// };
