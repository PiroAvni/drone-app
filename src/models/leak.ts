import dmaData from '../Mock/dmaData.json';
import * as turf from '@turf/turf';

// Leak types and mock data
export type Leak = {
  id: string;
  lng: number;
  lat: number;
  severity: 'high' | 'medium' | 'low';
  dma: string;
};

// Generate leaks at the centroid of each DMA region
export const mockLeaksWithDMA: Leak[] = dmaData.map((item, idx) => {
  const geo = JSON.parse(item.geolocation);
  let centroid;
  if (geo.type === 'Polygon' || geo.type === 'MultiPolygon') {
    centroid = turf.centroid(geo);
  } else {
    centroid = { geometry: { coordinates: [0, 0] } };
  }
  const [lng, lat] = centroid.geometry.coordinates;
  // Cycle through severities for demo
  const severities: Leak['severity'][] = ['high', 'medium', 'low'];
  return {
    id: `leak-${idx + 1}`,
    lng,
    lat,
    severity: severities[idx % severities.length],
    dma: `dma-${idx + 1}`,
  };
});
