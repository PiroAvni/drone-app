import React from 'react';
import { Source, Layer } from 'react-map-gl';
import type { Drone } from '../../../models/drone';

interface DronePathLinesProps {
  show: boolean;
  dronePaths: { lng: number; lat: number }[][];
  drones: Drone[];
}

const DronePathLines: React.FC<DronePathLinesProps> = React.memo(
  ({ show, dronePaths, drones }) => {
    if (!show) return null;
    return (
      <>
        {dronePaths.map((path, idx) => (
          <Source
            key={`drone-path-${idx}`}
            id={`drone-path-${idx}`}
            type='geojson'
            data={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: path.map((p) => [p.lng, p.lat]),
              },
              properties: {},
            }}
          >
            <Layer
              id={`drone-path-layer-${idx}`}
              type='line'
              paint={{
                'line-color': drones[idx].color,
                'line-width': 4,
                'line-opacity': 0.7,
              }}
            />
          </Source>
        ))}
      </>
    );
  }
);

export default DronePathLines;
