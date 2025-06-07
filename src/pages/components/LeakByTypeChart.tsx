import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for leakage by type
const data = [
  { name: 'Comms Pipe', value: 8 },
  { name: 'Mains', value: 12 },
  { name: 'Service Pipe', value: 5 },
  { name: 'Valve', value: 3 },
];

const LeakByTypeChart: React.FC = () => {
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
        height: '100%',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          color={theme.palette.primary.main}
          fontWeight={700}
          mb={2}
        >
          Leak Type Overview
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              labelLine={false}
              //   label={({ name, percent }) =>
              //     `${name}: ${(percent * 100).toFixed(0)}%`
              //   }
            >
              {data.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeakByTypeChart;
