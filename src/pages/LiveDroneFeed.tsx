import React, { useState } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import LatestUpdates from './LatestUpdates';
import DroneMap from './DroneMap';
import DroneSelect from './components/DroneSelect';
import DroneLiveFeed from './components/DroneLiveFeed';

// Import mockDrones from shared mockDrones file
import { mockDrones } from './mockDrones';

const LiveDroneFeed: React.FC = () => {
  const theme = useTheme();
  // Only show drones that are active/inflight
  const inflightDrones = mockDrones.filter((d) => d.status === 'active');
  const [selectedDroneId, setSelectedDroneId] = useState(
    inflightDrones[0]?.id || ''
  );
  const selectedDrone =
    inflightDrones.find((d) => d.id === selectedDroneId) || inflightDrones[0];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.background.default,
        py: { xs: 2, sm: 4, md: 6 },
        width: '100%',
        // maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <LatestUpdates />
      <Typography
        variant='h3'
        fontWeight={800}
        color={theme.palette.primary.main}
        mb={2}
        sx={{ textAlign: 'center', letterSpacing: 1 }}
      >
        Live Drone Feed
      </Typography>
      <Typography
        variant='subtitle1'
        color={theme.palette.text.secondary}
        mb={4}
        sx={{ textAlign: 'center', fontWeight: 400, maxWidth: 700, mx: 'auto' }}
      >
        Monitor real-time drone locations and leak detections as they happen.
        Select a drone to view its live feed.
      </Typography>
      {/* Drone Selector */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        <DroneSelect
          drones={inflightDrones}
          selectedDroneId={selectedDroneId}
          onChange={setSelectedDroneId}
          label='Drone'
          sx={{
            bgcolor: 'rgba(44,83,100,0.85)',
            borderRadius: 2,
            boxShadow: 2,
            minWidth: 180,
          }}
        />
        {selectedDrone && (
          <Box>
            <Typography fontWeight={700} color={selectedDrone.color}>
              {selectedDrone.label}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {selectedDrone.description}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              ID: {selectedDrone.id}
            </Typography>
          </Box>
        )}
      </Box>
      {/* Simulated Video Feed */}
      <Box sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
        <DroneLiveFeed
          image={selectedDrone?.images?.[0] || '/vite.svg'}
          droneLabel={selectedDrone?.label || ''}
          droneId={selectedDrone?.id || ''}
          temperature={'+17.1°C'}
          details={
            <>
              <Typography fontSize={13} color='#fff'>
                Battery: {selectedDrone?.battery}
              </Typography>
              <Typography fontSize={13} color='#fff'>
                Flight Time: {selectedDrone?.flightTime}
              </Typography>
            </>
          }
        />
      </Box>
      {/* Map with drones (optional, for context) */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 0, sm: 2 } }}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 1, sm: 3 },
            borderRadius: 4,
            boxShadow: 8,
            background: theme.palette.background.paper,
          }}
        >
          <DroneMap />
        </Paper>
      </Box>
    </Box>
  );
};

export default LiveDroneFeed;
