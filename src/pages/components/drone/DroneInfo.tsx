import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Drone } from '../../../models/drone';

interface DroneInfoProps {
  drone: Drone;
}

const DroneInfo: React.FC<DroneInfoProps> = ({ drone }) => (
  <Box sx={{ minWidth: 160, textAlign: { xs: 'center', sm: 'left' } }}>
    <Typography fontWeight={700} color={drone.color}>
      {drone.label}
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      {drone.description}
    </Typography>
    <Typography variant='caption' color='text.secondary'>
      ID: {drone.id}
    </Typography>
  </Box>
);

export default DroneInfo;
