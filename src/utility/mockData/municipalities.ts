import * as turf from '@turf/turf';

export const municipalities = [
  {
    name: 'Belgrade',
    polygon: turf.polygon([
      [
        [20.3, 44.7],
        [20.35, 44.71],
        [20.4, 44.72],
        [20.45, 44.73],
        [20.5, 44.74],
        [20.55, 44.75],
        [20.6, 44.76],
        [20.65, 44.77],
        [20.7, 44.78],
        [20.75, 44.79],
        [20.8, 44.8],
        [20.85, 44.81],
        [20.9, 44.82],
        [20.95, 44.83],
        [21.0, 44.84],
        [21.05, 44.85],
        [21.1, 44.86],
        [21.15, 44.87],
        [21.2, 44.88],
        [21.25, 44.89],
        [21.3, 44.9],
        [21.35, 44.91],
        [21.4, 44.92],
        [21.45, 44.93],
        [21.5, 44.94],
        [21.55, 44.95],
        [21.6, 44.96],
        [21.65, 44.97],
        [21.7, 44.98],
        [21.75, 44.99],
        [21.8, 45.0],
        [21.85, 45.01],
        [21.9, 45.02],
        [21.95, 45.03],
        [22.0, 45.04],
        [20.3, 45.04],
        [20.3, 44.7]
      ]
    ])
  },
  {
    name: 'Novi Sad',
    polygon: turf.polygon([
      [
        [19.7, 45.2],
        [19.75, 45.21],
        [19.8, 45.22],
        [19.85, 45.23],
        [19.9, 45.24],
        [19.95, 45.25],
        [20.0, 45.26],
        [20.05, 45.27],
        [20.1, 45.28],
        [20.15, 45.29],
        [20.2, 45.3],
        [20.25, 45.31],
        [20.3, 45.32],
        [20.35, 45.33],
        [20.4, 45.34],
        [20.45, 45.35],
        [20.5, 45.36],
        [20.55, 45.37],
        [20.6, 45.38],
        [20.65, 45.39],
        [20.7, 45.4],
        [20.75, 45.41],
        [20.8, 45.42],
        [20.85, 45.43],
        [20.9, 45.44],
        [20.95, 45.45],
        [21.0, 45.46],
        [21.05, 45.47],
        [21.1, 45.48],
        [21.15, 45.49],
        [21.2, 45.5],
        [21.25, 45.51],
        [21.3, 45.52],
        [21.35, 45.53],
        [21.4, 45.54],
        [19.7, 45.54],
        [19.7, 45.2]
      ]
    ])
  },
  {
    name: 'Niš',
    polygon: turf.polygon([
      [
        [21.8, 43.2],
        [21.85, 43.21],
        [21.9, 43.22],
        [21.95, 43.23],
        [22.0, 43.24],
        [22.05, 43.25],
        [22.1, 43.26],
        [22.15, 43.27],
        [22.2, 43.28],
        [22.25, 43.29],
        [22.3, 43.3],
        [22.35, 43.31],
        [22.4, 43.32],
        [22.45, 43.33],
        [22.5, 43.34],
        [22.55, 43.35],
        [22.6, 43.36],
        [22.65, 43.37],
        [22.7, 43.38],
        [22.75, 43.39],
        [22.8, 43.4],
        [22.85, 43.41],
        [22.9, 43.42],
        [22.95, 43.43],
        [23.0, 43.44],
        [23.05, 43.45],
        [23.1, 43.46],
        [23.15, 43.47],
        [23.2, 43.48],
        [23.25, 43.49],
        [23.3, 43.5],
        [23.35, 43.51],
        [23.4, 43.52],
        [23.45, 43.53],
        [23.5, 43.54],
        [21.8, 43.54],
        [21.8, 43.2]
      ]
    ])
  }
  // Add more municipalities with detailed boundaries as needed
];
export interface Dot {
  id: number;
  connection?: 'off' | 'on';
  lat: number;
  lon: number;
  parentId?: number;
  type: 'TS' | 'UP';
}
