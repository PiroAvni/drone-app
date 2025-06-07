import React from 'react';
import { Box, Typography } from '@mui/material';

interface ThermalLegendProps {
  show: boolean;
}

const ThermalLegend: React.FC<ThermalLegendProps> = ({ show }) => {
  if (!show) return null;
  return (
    <Box sx={{ width: '100%' }}>
      <Typography fontWeight={700} color='#b0bec5' fontSize={15} mb={0.5}>
        Thermal Legend:
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}
      >
        <Box
          sx={{ width: 24, height: 14, bgcolor: '#0000ff', borderRadius: 1 }}
        />
        <Typography color='#0000ff' fontSize={13}>
          15°C
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 14,
            bgcolor: '#00c6ff',
            borderRadius: 1,
            mx: 0.5,
          }}
        />
        <Typography color='#00c6ff' fontSize={13}>
          25°C
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 14,
            bgcolor: '#ffeb3b',
            borderRadius: 1,
            mx: 0.5,
          }}
        />
        <Typography color='#ffeb3b' fontSize={13}>
          35°C
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 14,
            bgcolor: '#ff9800',
            borderRadius: 1,
            mx: 0.5,
          }}
        />
        <Typography color='#ff9800' fontSize={13}>
          45°C
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 14,
            bgcolor: '#e53935',
            borderRadius: 1,
            mx: 0.5,
          }}
        />
        <Typography color='#e53935' fontSize={13}>
          55°C
        </Typography>
      </Box>
    </Box>
  );
};

export default ThermalLegend;
