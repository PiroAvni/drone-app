import type {
  Position,
  MultiPolygon,
  Polygon,
  Point,
  FeatureCollection,
  Feature,
} from 'geojson';

import bbox from '@turf/bbox';
import { randomPoint } from '@turf/random';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { featureCollection, point } from '@turf/helpers';

export const STATUSES = [
  'disconnected',
  'communicating',
  'failed',
  'awaiting installation',
  'installed',
  'CSL Reporting',
  'connected',
  'planned',
];

// Utility: Generate random integer in range
// const getRandomInt = (min: number, max: number) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

function getDateRange(start: Date, end: Date): string[] {
  const dateArray: string[] = [];
  const currentDate = new Date(start);
  while (currentDate <= end) {
    dateArray.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}

// Utility: Map status value to color using a threshold rule
const getStatusColor = (status: string, value: number): string => {
  if (status === 'disconnected') {
    if (value <= 20) return '#8B0000';
    if (value <= 40) return '#FF8C00';
    if (value <= 60) return '#FFFF00';
    if (value <= 80) return '#60BE80';
    return '#95E180';
  }
  if (status === 'connected') {
    if (value >= 80) return '#95E180';
    if (value >= 60) return '#60BE80';
    if (value >= 40) return '#FFFF00';
    if (value >= 20) return '#FF8C00';
    return '#8B0000';
  }
  if (status === 'CSL Reporting') {
    if (value >= 80) return '#95E180';
    if (value >= 60) return '#60BE80';
    if (value >= 40) return '#FFFF00';
    if (value >= 20) return '#FF8C00';
    return '#8B0000';
  }
  if (status === 'awaiting installation') {
    if (value >= 80) return '#95E180';
    if (value >= 60) return '#60BE80';
    if (value >= 40) return '#FFFF00';
    if (value >= 20) return '#FF8C00';
    return '#8B0000';
  }
  if (status === 'failed') {
    if (value >= 80) return '#95E180';
    if (value >= 60) return '#60BE80';
    if (value >= 40) return '#FFFF00';
    if (value >= 20) return '#FF8C00';
    return '#8B0000';
  }
  if (status === 'planned') {
    if (value >= 80) return '#95E180';
    if (value >= 60) return '#60BE80';
    if (value >= 40) return '#FFFF00';
    if (value >= 20) return '#FF8C00';
    return '#8B0000';
  }

  return '#808080';
};
// export function generateDmaStatusData(
//   dmaData: FeatureCollection<Polygon | MultiPolygon, { dmaCode: string }>
// ): FeatureCollection {
//   const start = new Date('2025-01-01');
//   const end = new Date();
//   const dates = getDateRange(start, end);
//   const features: Feature[] = [];

//   dmaData.features.forEach((dma) => {
//     dates.forEach((date) => {
//       const statusValues: Record<string, number> = {};
//       const fillColors: Record<string, string> = {};

//       STATUSES.forEach((status) => {
//         const value = getRandomInt(5, 100);
//         statusValues[status] = value;
//         fillColors[`fillColor-${status}`] = getStatusColor(status, value);
//       });

//       features.push({
//         type: 'Feature',
//         properties: {
//           dmaCode: dma.properties.dmaCode,
//           date,
//           statusValues,
//           ...fillColors,
//         },
//         geometry: dma.geometry,
//       });
//     });
//   });

//   return {
//     type: 'FeatureCollection',
//     features,
//   };
// }
export function generateDmaStatusData(
  dmaData: FeatureCollection<Polygon | MultiPolygon, { dmaCode: string }>,
  meters: {
    dmaCode: string;
    lat: number;
    lng: number;
    status: string;
    date: string;
  }[] = []
): FeatureCollection {
  const start = new Date('2025-01-01');
  const end = new Date();
  const dates = getDateRange(start, end);
  const features: Feature[] = [];

  dmaData.features.forEach((dma) => {
    const dmaCode = dma.properties.dmaCode;
    // console.log(`Processing DMA: ${dmaCode}`);
    dates.forEach((date) => {
      const statusValues: Record<string, number> = {};
      const fillColors: Record<string, string> = {};
      // console.log(`Processing dates: ${dates}`);
      STATUSES.forEach((status) => {
        const filtered = meters.filter(
          (m) => m.dmaCode === dmaCode && m.status === status && m.date === date
        );
        // console.log(`Processing STATUSES: ${STATUSES}`);
        const count = filtered.length;
        // console.log(`Count for ${status} on ${date}: ${count}`);
        statusValues[status] = count;
        fillColors[`fillColor-${status}`] = getStatusColor(status, count);
      });

      features.push({
        type: 'Feature',
        properties: {
          dmaCode,
          date,
          statusValues,
          ...fillColors,
        },
        geometry: dma.geometry,
      });
    });
  });

  return {
    type: 'FeatureCollection',
    features,
  };
}

export function generateMeterPointsByDma(
  dmaFeatures: FeatureCollection<Polygon | MultiPolygon, { dmaCode: string }>,
  countPerDma = 7
): FeatureCollection<Point, { dmaCode: string; status: string; date: string }> {
  const start = new Date('2025-01-01');
  const end = new Date();
  const dateList: string[] = [];

  while (start <= end) {
    dateList.push(start.toISOString().split('T')[0]);
    start.setDate(start.getDate() + 1);
  }

  const points: Feature<
    Point,
    { dmaCode: string; status: string; date: string }
  >[] = [];

  dmaFeatures.features.forEach((dma) => {
    const bounds = bbox(dma);

    let attempts = 0;
    let generated = 0;

    while (generated < countPerDma && attempts < countPerDma * 10) {
      const random = randomPoint(1, { bbox: bounds }).features[0];

      if (
        booleanPointInPolygon(random, dma as Feature<Polygon | MultiPolygon>)
      ) {
        const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
        const date = dateList[Math.floor(Math.random() * dateList.length)];

        points.push(
          point(random.geometry.coordinates as Position, {
            dmaCode: dma.properties.dmaCode,
            status: status,
            date,
          })
        );
        generated++;
      }

      attempts++;
    }
  });

  return featureCollection(points);
}
