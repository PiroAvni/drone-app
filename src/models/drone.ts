import dmaData from '../Mock/dmaData.json';
import centroid from '@turf/centroid';
import type { Feature, Geometry } from 'geojson';
import Thermal1 from '../assets/images/Thermal-1.jpg';
import Thermal2 from '../assets/images/thermal-2.jpg';
import Thermal3 from '../assets/images/thermal-3.jpg';
import Thermal4 from '../assets/images/thermal-4.jpeg';
import Thermal5 from '../assets/images/thermal-5.jpeg';

// Helper: parse geolocation string to GeoJSON
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

// Drone types and mock data
export interface Drone {
  id: string;
  label: string;
  description: string;
  color: string;
  position: { lng: number; lat: number };
  status: 'active' | 'inactive';
  areaCovered: string;
  flightTime: string;
  battery: string;
  detections: {
    leaks: number;
    high: number;
    resolved: number;
  };
  images: string[];
  image?: string;
}

export const mockDrones: Drone[] = [
  {
    id: 'drone-1',
    label: 'Drone Alpha',
    description: 'Thermal + Visual, North Zone',
    color: '#1976d2',
    position: { lng: dmaCentroids[0][0], lat: dmaCentroids[0][1] },
    status: 'active',
    areaCovered: '2.1 km²',
    flightTime: '1h 12m',
    battery: '68%',
    detections: { leaks: 3, high: 2, resolved: 1 },
    images: [Thermal1, Thermal2, Thermal3],
    image: Thermal1, // Use the first image as the icon
  },
  {
    id: 'drone-2',
    label: 'Drone Beta',
    description: 'Thermal, South Zone',
    color: '#00c6ff',
    position: { lng: dmaCentroids[1][0], lat: dmaCentroids[1][1] },
    status: 'active',
    areaCovered: '1.7 km²',
    flightTime: '0h 54m',
    battery: '81%',
    detections: { leaks: 2, high: 1, resolved: 0 },
    images: [Thermal4, Thermal5, Thermal2],
    image: Thermal4, // Use the fourth image as the icon
  },
];
