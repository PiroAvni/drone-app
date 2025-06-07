import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import LatestUpdates from './LatestUpdates';
import DroneMap from './DroneMap';
import LeakSeverityLegend from './components/drone/LeakSeverityLegend';

const LeakHeatmap: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.background.default,
        py: { xs: 2, sm: 4, md: 6 },
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
        sx={{ textAlign: 'center', letterSpacing: 1 }}
      >
        Leak Probability Heatmap
      </Typography>
      <Typography
        variant='subtitle1'
        color={theme.palette.text.secondary}
        mb={4}
        sx={{ textAlign: 'center', fontWeight: 400, maxWidth: 700, mx: 'auto' }}
      >
        Visualize areas with high probability of leaks. Scores and color legend
        help prioritize field response.
      </Typography>
      <Box
        sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 0, sm: 2 }, width: '100%' }}
      >
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
        <Paper
          elevation={4}
          sx={{
            mt: 3,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <LeakSeverityLegend show filteredLeaksCount={1} />
        </Paper>
      </Box>
    </Box>
  );
};

export default LeakHeatmap;
