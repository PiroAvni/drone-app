import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Example data for demonstration
const data = [
  { zone: 'North', leaks: 12 },
  { zone: 'South', leaks: 8 },
  { zone: 'East', leaks: 5 },
  { zone: 'West', leaks: 10 },
];

const LeakByZoneChart: React.FC = () => {
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
          Leaks by Zone
        </Typography>
        <ResponsiveContainer width='100%' height={250}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke={theme.palette.text.secondary}
            />
            <XAxis dataKey='zone' stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            />
            <Bar
              dataKey='leaks'
              fill={theme.palette.primary.main}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeakByZoneChart;
