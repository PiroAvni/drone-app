import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
// Mock data for consumption vs leakage
const data = [
  { date: '2025-06-01', consumption: 1200, leakage: 80 },
  { date: '2025-06-02', consumption: 1250, leakage: 90 },
  { date: '2025-06-03', consumption: 1300, leakage: 100 },
  { date: '2025-06-04', consumption: 1280, leakage: 95 },
  { date: '2025-06-05', consumption: 1350, leakage: 110 },
  { date: '2025-06-06', consumption: 1400, leakage: 120 },
];

const ConsumptionVsLeakageChart: React.FC = () => {
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
          Consumption vs Leakage
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              yAxisId="left"
              label={{
                value: 'Consumption',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: 'Leakage', angle: 90, position: 'insideRight' }}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="consumption"
              stroke={theme.palette.primary.main}
              activeDot={{ r: 8 }}
              name="Consumption"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="leakage"
              stroke={theme.palette.primary.main}
              name="Leakage"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ConsumptionVsLeakageChart;
