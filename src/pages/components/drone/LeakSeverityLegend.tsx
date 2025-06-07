import React from 'react';
import { Box, Typography } from '@mui/material';

interface LeakSeverityLegendProps {
  show: boolean;
  filteredLeaksCount: number;
}

const LeakSeverityLegend: React.FC<LeakSeverityLegendProps> = ({
  show,
  filteredLeaksCount,
}) => {
  if (!show && filteredLeaksCount === 0) return null;
  return (
    <Box sx={{ width: '100%', mb: 1 }}>
      <Typography fontWeight={700} color='#b0bec5' fontSize={15} mb={0.5}>
        Leak Severity:
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}
      >
        <Box
          sx={{
            width: 24,
            height: 16,
            bgcolor: '#e53935',
            borderRadius: 1,
            mr: 0.5,
          }}
        />
        <Typography color='#e53935' fontSize={14}>
          High
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 16,
            bgcolor: '#fb8c00',
            borderRadius: 1,
            mx: 0.5,
          }}
        />
        <Typography color='#fb8c00' fontSize={14}>
          Medium
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 16,
            bgcolor: '#43a047',
            borderRadius: 1,
            mx: 0.5,
          }}
        />
        <Typography color='#43a047' fontSize={14}>
          Low
        </Typography>
      </Box>
      <Typography color='#b0bec5' fontSize={13} mt={0.5}>
        <strong>Score:</strong> 1 (Low) - 5 (High)
      </Typography>
    </Box>
  );
};

export default LeakSeverityLegend;
