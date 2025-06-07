import dmaData from '../Mock/dmaData.json';
import centroid from '@turf/centroid';
import type { Feature, Geometry } from 'geojson';

// Work order types and mock data
export interface WorkOrder {
  id: string;
  lng: number;
  lat: number;
  type: string;
  color: string;
  dma: string;
  status: string;
}

export const WorkOrderType = [
  { type: 'Comm pipe', color: '#8e24aa' },
  { type: 'Meters', color: '#3949ab' },
  { type: 'CSL', color: '#00897b' },
  { type: 'Dry hole', color: '#fbc02d' },
  { type: 'Mains', color: '#d84315' },
  { type: 'Stop Tap', color: '#00acc1' },
  { type: 'Other', color: '#757575' },
];

function parseGeo(geo: string): Geometry {
  return JSON.parse(geo);
}

// Compute centroids for each DMA region
const dmaCentroids = (dmaData as { geolocation: string }[]).map((dma) => {
  const geo = parseGeo(dma.geolocation);
  const feature: Feature = { type: 'Feature', geometry: geo, properties: {} };
  const center = centroid(feature);
  return center.geometry.coordinates;
});

export const mockWorkOrders: WorkOrder[] = Array.from({ length: 18 }).map(
  (_, i) => {
    const types = WorkOrderType.map((t) => t.type);
    const type = types[Math.floor(Math.random() * types.length)];
    const color =
      WorkOrderType.find((t) => t.type === type)?.color || '#757575';
    // Assign DMA by cycling through available DMAs
    const dmaIndex = i % dmaCentroids.length;
    const dma = `dma-${dmaIndex + 1}`;
    const [lng, lat] = dmaCentroids[dmaIndex];
    return {
      id: `wo-${i + 1}`,
      lng,
      lat,
      type,
      color,
      dma,
      status: 'open',
    };
  }
);
