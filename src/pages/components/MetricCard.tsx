import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MapIcon from '@mui/icons-material/Map';
import SensorsIcon from '@mui/icons-material/Sensors';
import OpacityIcon from '@mui/icons-material/Opacity';

export interface MetricCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
  unit?: string;
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
  unit,
  subtitle,
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 6,
        bgcolor: theme.palette.background.paper,
        minWidth: 160,
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 2,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 0,
        }}
      >
        <Box sx={{ mb: 1 }}>{icon}</Box>
        <Typography
          variant='h5'
          fontWeight={800}
          color={color || theme.palette.primary.main}
        >
          {value}
          {unit && <span style={{ fontSize: 16, marginLeft: 4 }}>{unit}</span>}
        </Typography>
        <Typography
          fontWeight={700}
          color={theme.palette.text.secondary}
          fontSize={15}
          sx={{ mt: 0.5 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            fontSize={13}
            color={theme.palette.text.disabled}
            sx={{ mt: 0.5 }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

// Example metric cards for water utility dashboard
export const mockMetrics = [
  {
    title: 'Leaks Detected',
    value: 17,
    icon: <WaterDropIcon sx={{ color: '#e53935', fontSize: 36 }} />, // red
    color: '#e53935',
    subtitle: 'in last 7 days',
  },
  {
    title: 'Leaks Resolved',
    value: 12,
    icon: <CheckCircleIcon sx={{ color: '#43a047', fontSize: 36 }} />, // green
    color: '#43a047',
    subtitle: 'in last 7 days',
  },
  {
    title: 'DMA Regions Covered',
    value: 4,
    icon: <MapIcon sx={{ color: '#00c6ff', fontSize: 36 }} />, // blue
    color: '#00c6ff',
    subtitle: 'out of 4',
  },
  {
    title: 'Sensors Online',
    value: 38,
    icon: <SensorsIcon sx={{ color: '#fb8c00', fontSize: 36 }} />, // orange
    color: '#fb8c00',
    subtitle: 'Smart meters & loggers',
  },
  {
    title: 'Water Saved',
    value: 128,
    unit: 'm³',
    icon: <OpacityIcon sx={{ color: '#3949ab', fontSize: 36 }} />, // purple
    color: '#3949ab',
    subtitle: 'Estimated (7 days)',
  },
];

export default MetricCard;
