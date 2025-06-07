import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AnalyticsChartsPanel from './components/AnalyticsChartsPanel';
import LatestUpdates from './LatestUpdates';

const AnalyticsHeatmaps: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.background.default,
        py: { xs: 2, sm: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',

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
        sx={{ letterSpacing: 1, textAlign: 'center' }}
      >
        Analytics & Heatmaps
      </Typography>
      <Typography
        variant='subtitle1'
        color={theme.palette.text.secondary}
        mb={4}
        sx={{ textAlign: 'center', fontWeight: 400, maxWidth: 700, mx: 'auto' }}
      >
        Real-time insights into leak trends, zones, and status for smarter water
        management.
      </Typography>
      <AnalyticsChartsPanel direction='row' />
    </Box>
  );
};

export default AnalyticsHeatmaps;
