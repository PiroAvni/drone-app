import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
// Mock data for correlation between leak events and logger readings
const data = [
  { logger: 10, leaks: 2 },
  { logger: 20, leaks: 3 },
  { logger: 30, leaks: 5 },
  { logger: 40, leaks: 7 },
  { logger: 50, leaks: 8 },
  { logger: 60, leaks: 10 },
];

const LeakLoggerCorrelationChart: React.FC = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: 3,
        boxShadow: 6,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          color={theme.palette.primary.main}
          fontWeight={700}
          mb={2}
        >
          Leak Trends (Monthly)
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis dataKey="logger" name="Logger Reading" />
            <YAxis dataKey="leaks" name="Leak Events" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter
              name="Correlation"
              data={data}
              fill={theme.palette.primary.main}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeakLoggerCorrelationChart;
