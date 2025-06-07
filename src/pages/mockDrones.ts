// Shared mock drone data for use in DroneMap and LiveDroneFeed
export interface Drone {
  id: string;
  position: { lng: number; lat: number };
  color: string;
  label: string;
  description: string;
  status: 'active' | 'inactive';
  areaCovered: string;
  flightTime: string;
  battery: string;
  detections: { leaks: number; high: number; resolved: number };
  images: string[];
  image?: string; // New: thumbnail image for selector
}

export const mockDrones: Drone[] = [
  {
    id: 'drone-1',
    position: { lng: -122.4194, lat: 37.7749 },
    color: '#1976d2',
    label: 'Drone 1',
    description: 'Thermal + RGB, active patrol',
    status: 'active',
    areaCovered: '2.3 km²',
    flightTime: '18 min 42 sec',
    battery: '68%',
    detections: { leaks: 3, high: 2, resolved: 1 },
    images: [
      'https://placehold.co/120x120/232526/00c6ff?text=Thermal+1',
      'https://placehold.co/120x120/232526/00c6ff?text=Thermal+2',
      'https://placehold.co/120x120/232526/00c6ff?text=Thermal+3',
    ],
    image: 'https://placehold.co/40x40/232526/00c6ff?text=D1',
  },
  {
    id: 'drone-2',
    position: { lng: -122.423, lat: 37.778 },
    color: '#00c6ff',
    label: 'Drone 2',
    description: 'Thermal only, standby',
    status: 'active',
    areaCovered: '1.7 km²',
    flightTime: '12 min 10 sec',
    battery: '82%',
    detections: { leaks: 1, high: 1, resolved: 0 },
    images: [
      'https://placehold.co/120x120/232526/00c6ff?text=Thermal+A',
      'https://placehold.co/120x120/232526/00c6ff?text=Thermal+B',
      'https://placehold.co/120x120/232526/00c6ff?text=Thermal+C',
    ],
    image: 'https://placehold.co/40x40/232526/00c6ff?text=D2',
  },
  {
    id: 'drone-3',
    position: { lng: -122.425, lat: 37.772 },
    color: '#b0bec5',
    label: 'Drone 3',
    description: 'Inactive - maintenance',
    status: 'inactive',
    areaCovered: '0 km²',
    flightTime: '0 min',
    battery: '0%',
    detections: { leaks: 0, high: 0, resolved: 0 },
    images: [],
    image: 'https://placehold.co/40x40/232526/b0bec5?text=D3',
  },
];
