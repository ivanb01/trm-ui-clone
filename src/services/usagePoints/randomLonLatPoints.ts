import { UsagePointInfo } from '../../model/interface/usagePoint/UsagePointInfo';

function randomLongitude() {
  return Math.random() * 360 - 180;
}

function randomLatitude() {
  return Math.random() * 180 - 90;
}

export function generateCoordinates(numPoints: number) {
  let coordinates = [];
  for (let i = 0; i < numPoints; i++) {
    coordinates.push({
      latitude: randomLatitude(),
      longitude: randomLongitude()
    });
  }
  return coordinates;
}

export function createMockData(
  randomPoints: {
    latitude: number;
    longitude: number;
  }[]
): UsagePointInfo[] {
  return randomPoints.map(({ latitude, longitude }, idx) => {
    return {
      id: idx,
      address: 'SRBIJA > BATOČINA > 11000 > PRAHA > DUSANA VASILJEVA > 10',
      customerKind: 'High voltage consumption',
      events: [],
      extUcode: `${idx}`,
      fromDt: '2022-01-02T23:00:00Z',
      /**Mimic BE error invert lon lat */
      lat: longitude,
      lon: latitude,
      /**************** */
      name: null,
      notice: null,
      pricingStructure: 'High Voltage',
      ratedPower: Math.floor(Math.random() * (200 - 50 + 1) + 50), // 50-200
      toDt: null,
      ucode: 'PRE-UP-3918',
      usageGroup: 'High voltage consumption',
      usagePointType: 'Distribution, consumer'
    };
  });
}
