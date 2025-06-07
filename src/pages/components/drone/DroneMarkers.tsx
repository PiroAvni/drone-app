import React from 'react';
import { Marker } from 'react-map-gl';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Box, Typography } from '@mui/material';
import type { Drone } from '../../../models/drone';

interface DroneMarkersProps {
  drones: Drone[];
  dronePositions: { lng: number; lat: number }[];
  selectedDroneId: string;
  onSelect: (id: string) => void;
  showPopups?: boolean;
  setPopup: (popup: {
    type: string;
    id: string;
    label: string;
    color: string;
    position: { lng: number; lat: number };
    lng: number;
    lat: number;
    // Add more fields if your popup requires them
  }) => void;
}

const DroneMarkers: React.FC<DroneMarkersProps> = React.memo(
  ({
    drones,
    dronePositions,
    selectedDroneId,
    onSelect,
    showPopups,
    setPopup,
  }) => {
    return (
      <>
        {drones.map((drone, idx) => {
          const isSelected = drone.id === selectedDroneId;
          return (
            <Marker
              key={drone.id}
              longitude={dronePositions[idx]?.lng ?? drone.position.lng}
              latitude={dronePositions[idx]?.lat ?? drone.position.lat}
              offset={[0, -20]}
              onClick={() => {
                onSelect(drone.id);
                if (showPopups) {
                  setPopup({
                    type: 'drone',
                    ...drone,
                    lng: dronePositions[idx]?.lng ?? drone.position.lng,
                    lat: dronePositions[idx]?.lat ?? drone.position.lat,
                  });
                }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isSelected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: `${drone.color}33`,
                      border: `3px solid ${drone.color}`,
                      boxShadow: `0 0 16px 4px ${drone.color}88`,
                      zIndex: 1,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                {drone.id === 'drone-1' ? (
                  <FlightTakeoffIcon
                    sx={{
                      color: drone.color,
                      fontSize: isSelected ? 54 : 44,
                      filter:
                        `drop-shadow(0 0 8px ${drone.color}88)` +
                        (isSelected
                          ? ` drop-shadow(0 0 16px ${drone.color})`
                          : ''),
                      zIndex: 2,
                      transition: 'font-size 0.2s, filter 0.2s',
                    }}
                  />
                ) : (
                  <AirplanemodeActiveIcon
                    sx={{
                      color: drone.color,
                      fontSize: isSelected ? 54 : 44,
                      filter:
                        `drop-shadow(0 0 8px ${drone.color}88)` +
                        (isSelected
                          ? ` drop-shadow(0 0 16px ${drone.color})`
                          : ''),
                      zIndex: 2,
                      transition: 'font-size 0.2s, filter 0.2s',
                    }}
                  />
                )}
              </Box>
              <Typography
                variant='caption'
                sx={{
                  bgcolor: '#fff',
                  color: drone.color,
                  px: 0.5,
                  borderRadius: 1,
                  fontWeight: 700,
                  boxShadow: 1,
                }}
              >
                {drone.label}
              </Typography>
            </Marker>
          );
        })}
      </>
    );
  }
);

export default DroneMarkers;
