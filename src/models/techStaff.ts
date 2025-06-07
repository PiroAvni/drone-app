import dmaData from '../Mock/dmaData.json';
import centroid from '@turf/centroid';
import type { Feature, Geometry } from 'geojson';

// Tech staff types and mock data
export interface TechStaff {
  id: string;
  name: string;
  lng: number;
  lat: number;
  dma: string;
}

function parseGeo(geo: string): Geometry {
  return JSON.parse(geo);
}

// Compute centroids and DMA codes
const dmaCentroids = (
  dmaData as { geolocation: string; dmaCode?: string }[]
).map((dma, idx) => {
  const geo = parseGeo(dma.geolocation);
  const feature: Feature = { type: 'Feature', geometry: geo, properties: {} };
  const center = centroid(feature);
  return {
    lng: center.geometry.coordinates[0],
    lat: center.geometry.coordinates[1],
    dma: dma.dmaCode || `dma-${idx + 1}`,
  };
});

const techNames = [
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Eve',
  'Frank',
  'Grace',
  'Heidi',
  'Ivan',
  'Judy',
];

export const mockTechStaff: TechStaff[] = dmaCentroids.map((c, i) => ({
  id: `tech-${i + 1}`,
  name: techNames[i % techNames.length],
  lng: c.lng,
  lat: c.lat,
  dma: c.dma,
}));
