import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { name: 'Detected', value: 24 },
  { name: 'Resolved', value: 16 },
  { name: 'Pending', value: 8 },
];

const LeakStatusPieChart: React.FC = () => {
  const theme = useTheme();
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.background.paper,
    theme.palette.text.secondary,
  ];
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
          Leak Status Overview
        </Typography>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill={theme.palette.primary.main}
              dataKey='value'
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeakStatusPieChart;
