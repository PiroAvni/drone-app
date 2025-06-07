import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Example data for demonstration
const data = [
  { name: 'Jan', leaks: 4 },
  { name: 'Feb', leaks: 7 },
  { name: 'Mar', leaks: 3 },
  { name: 'Apr', leaks: 9 },
  { name: 'May', leaks: 6 },
  { name: 'Jun', leaks: 2 },
];

const LeakTrendsChart: React.FC = () => {
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
          variant='h6'
          color={theme.palette.primary.main}
          fontWeight={700}
          mb={2}
        >
          Leak Trends (Monthly)
        </Typography>
        <ResponsiveContainer width='100%' height={250}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke={theme.palette.text.secondary}
            />
            <XAxis dataKey='name' stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            />
            <Line
              type='monotone'
              dataKey='leaks'
              stroke={theme.palette.primary.main}
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeakTrendsChart;
