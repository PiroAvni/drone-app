import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

interface DroneLiveFeedProps {
  image: string;
  droneLabel: string;
  droneId: string;
  temperature?: string;
  details?: React.ReactNode;
}

const DroneLiveFeed: React.FC<DroneLiveFeedProps> = ({
  image,
  droneLabel,
  droneId,
  temperature = '+17.1°C',
  details,
}) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={6}
      sx={{
        p: 0,
        borderRadius: 4,
        boxShadow: 8,
        background: theme.palette.background.paper,
        overflow: 'hidden',
        minHeight: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <img
        src={image}
        alt={`Live feed from ${droneLabel}`}
        style={{
          width: '100%',
          height: 320,
          objectFit: 'cover',
          opacity: 0.98,
        }}
      />
      {/* Overlay details */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          bgcolor: 'rgba(44,83,100,0.85)',
          borderRadius: 2,
          px: 2,
          py: 1,
          color: '#fff',
          boxShadow: 2,
        }}
      >
        <Typography fontWeight={700} fontSize={18}>
          {droneLabel}
        </Typography>
        <Typography fontSize={14}>ID: {droneId}</Typography>
        <Typography fontSize={14} color='#ffeb3b'>
          Temp: {temperature}
        </Typography>
        {details}
      </Box>
      {/* Example right-side legend (like the attached image) */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            width: 18,
            height: 160,
            background:
              'linear-gradient(to top, #e53935 0%, #ff9800 25%, #ffeb3b 50%, #00c6ff 75%, #0000ff 100%)',
            borderRadius: 2,
            mb: 0.5,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 0,
          }}
        >
          <Typography fontSize={12} color='#fff'>
            +17.5°C
          </Typography>
          <Typography fontSize={12} color='#fff'>
            +13.5°C
          </Typography>
          <Typography fontSize={12} color='#fff'>
            +9.4°C
          </Typography>
          <Typography fontSize={12} color='#fff'>
            +5.4°C
          </Typography>
          <Typography fontSize={12} color='#fff'>
            +1.4°C
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DroneLiveFeed;
