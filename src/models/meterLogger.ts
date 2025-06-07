// Smart meter and logger types and mock data
import dmaData from '../Mock/dmaData.json';
import centroid from '@turf/centroid';
import type { Feature, Geometry } from 'geojson';

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
  // If dmaCode is missing, fallback to 'dma-{idx+1}'
  return {
    lng: center.geometry.coordinates[0],
    lat: center.geometry.coordinates[1],
    dma: dma.dmaCode || `dma-${idx + 1}`,
  };
});

export type SmartMeter = { id: string; lng: number; lat: number; dma: string };
export type Logger = { id: string; lng: number; lat: number; dma: string };

export const mockSmartMeters: SmartMeter[] = dmaCentroids.map((c, i) => ({
  id: `meter-${i + 1}`,
  lng: c.lng,
  lat: c.lat,
  dma: c.dma,
}));

export const mockLoggers: Logger[] = dmaCentroids.map((c, i) => ({
  id: `logger-${i + 1}`,
  lng: c.lng,
  lat: c.lat,
  dma: c.dma,
}));
