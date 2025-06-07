import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Drone } from '../../../models/drone';

interface DronePathsLegendProps {
  show: boolean;
  drones: Drone[];
}

const DronePathsLegend: React.FC<DronePathsLegendProps> = ({
  show,
  drones,
}) => {
  if (!show) return null;
  return (
    <Box sx={{ width: '100%', mb: 1 }}>
      <Typography fontWeight={700} color='#b0bec5' fontSize={15} mb={0.5}>
        Drone Paths:
      </Typography>
      {drones.map((drone) => (
        <Box
          key={drone.id}
          sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
        >
          <Box
            sx={{
              width: 18,
              height: 4,
              bgcolor: drone.color,
              borderRadius: 1,
              mr: 1,
            }}
          />
          <Typography color={drone.color} fontSize={13}>
            {drone.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default DronePathsLegend;
