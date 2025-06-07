// DMA region types and mock data
export interface DMARegion {
  id: string;
  name: string;
  bounds: [number, number][];
}

export const dmaRegions: DMARegion[] = [
  {
    id: 'dma-1',
    name: 'North Zone',
    bounds: [
      [-122.425, 37.78],
      [-122.415, 37.78],
      [-122.415, 37.77],
      [-122.425, 37.77],
      [-122.425, 37.78],
    ],
  },
  {
    id: 'dma-2',
    name: 'South Zone',
    bounds: [
      [-122.425, 37.77],
      [-122.415, 37.77],
      [-122.415, 37.765],
      [-122.425, 37.765],
      [-122.425, 37.77],
    ],
  },
  {
    id: 'dma-3',
    name: 'East Zone',
    bounds: [
      [-122.415, 37.78],
      [-122.41, 37.78],
      [-122.41, 37.77],
      [-122.415, 37.77],
      [-122.415, 37.78],
    ],
  },
  {
    id: 'dma-4',
    name: 'West Zone',
    bounds: [
      [-122.43, 37.78],
      [-122.425, 37.78],
      [-122.425, 37.77],
      [-122.43, 37.77],
      [-122.43, 37.78],
    ],
  },
];
