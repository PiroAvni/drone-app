import React from 'react';
import { Box, Typography, useTheme, Card, CardContent } from '@mui/material';
import LeakTrendsChart from '../LeakTrendsChart';
import LeakByZoneChart from '../LeakByZoneChart';
import LeakStatusPieChart from '../LeakStatusPieChart';

interface AnalyticsChartsPanelProps {
  direction?: 'column' | 'row'; // 'column' for dashboard, 'row' for analytics
}

const AnalyticsChartsPanel: React.FC<AnalyticsChartsPanelProps> = ({
  direction = 'column',
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRadius: 4,
        boxShadow: 6,
        mt: 4,
        mb: 4,
        px: { xs: 1, sm: 3 },
        py: 3,
        maxWidth: direction === 'column' ? 600 : 1200,
        mx: 'auto',
      }}
    >
      <Typography
        variant='h5'
        fontWeight={800}
        color={theme.palette.primary.main}
        mb={2}
        sx={{ letterSpacing: 1, textAlign: 'center' }}
      >
        Analytics & Heatmaps
      </Typography>
      <Typography
        variant='subtitle1'
        color={theme.palette.text.secondary}
        mb={3}
        sx={{ textAlign: 'center', fontWeight: 400 }}
      >
        Real-time insights into leak trends, zones, and status for smarter water
        management.
      </Typography>
      {direction === 'column' ? (
        <Box display='flex' flexDirection='column' gap={3}>
          <Card
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            <CardContent>
              <Typography
                variant='subtitle2'
                color={theme.palette.primary.main}
                fontWeight={700}
                mb={1}
              >
                Leak Trends
              </Typography>
              <LeakTrendsChart />
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            <CardContent>
              <Typography
                variant='subtitle2'
                color={theme.palette.primary.main}
                fontWeight={700}
                mb={1}
              >
                Leaks by Zone
              </Typography>
              <LeakByZoneChart />
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            <CardContent>
              <Typography
                variant='subtitle2'
                color={theme.palette.primary.main}
                fontWeight={700}
                mb={1}
              >
                Leak Status
              </Typography>
              <LeakStatusPieChart />
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box>
          <Box display='flex' flexWrap='wrap' gap={3} justifyContent='center'>
            <Box flex={1} minWidth={320} maxWidth={420}>
              <Card
                sx={{
                  bgcolor: theme.palette.background.default,
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant='subtitle2'
                    color={theme.palette.primary.main}
                    fontWeight={700}
                    mb={1}
                  >
                    Leak Trends
                  </Typography>
                  <LeakTrendsChart />
                </CardContent>
              </Card>
            </Box>
            <Box flex={1} minWidth={320} maxWidth={420}>
              <Card
                sx={{
                  bgcolor: theme.palette.background.default,
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant='subtitle2'
                    color={theme.palette.primary.main}
                    fontWeight={700}
                    mb={1}
                  >
                    Leaks by Zone
                  </Typography>
                  <LeakByZoneChart />
                </CardContent>
              </Card>
            </Box>
            <Box flex={1} minWidth={320} maxWidth={420}>
              <Card
                sx={{
                  bgcolor: theme.palette.background.default,
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant='subtitle2'
                    color={theme.palette.primary.main}
                    fontWeight={700}
                    mb={1}
                  >
                    Leak Status
                  </Typography>
                  <LeakStatusPieChart />
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AnalyticsChartsPanel;
