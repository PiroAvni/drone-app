import React from 'react';
import { Box, Typography } from '@mui/material';

// Accepts unique work order types, not all work orders
interface WorkOrdersLegendProps {
  show: boolean;
  workOrderTypes: { type: string; color: string }[];
}

const WorkOrdersLegend: React.FC<WorkOrdersLegendProps> = ({
  show,
  workOrderTypes,
}) => {
  if (!show) return null;
  return (
    <Box sx={{ width: '100%', mb: 1 }}>
      <Typography fontWeight={700} color='#b0bec5' fontSize={15} mb={0.5}>
        Work Orders:
      </Typography>
      {workOrderTypes.map((t) => (
        <Box
          key={t.type}
          sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
        >
          <Box
            sx={{
              width: 18,
              height: 12,
              bgcolor: t.color,
              borderRadius: 1,
              mr: 1,
            }}
          />
          <Typography color={t.color} fontSize={13}>
            {t.type}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default WorkOrdersLegend;
