import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LatestUpdates from './LatestUpdates';
import VideocamIcon from '@mui/icons-material/Videocam';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import { motion } from 'framer-motion';
import DroneMap from './DroneMap';
import MetricCard, { mockMetrics } from './components/MetricCard';
import { mockDrones } from '../models/drone';
import thermal1 from '../assets/images/Thermal-1.jpg';
import thermal2 from '../assets/images/thermal-2.jpg';
import thermal3 from '../assets/images/Thermal-3.jpg';
import thermal4 from '../assets/images/Thermal-4.jpeg';
import thermal5 from '../assets/images/thermal-5.jpeg';
import DroneDetails from './components/DroneDetails';
import AnalyticsChartsPanel from './components/AnalyticsChartsPanel';
import NavigationCard from './components/NavigationCard';

import LeakLoggerCorrelationChart from './components/LeakLoggerCorrelationChart';
import LeakByTypeChart from './components/LeakByTypeChart';
import ConsumptionVsLeakageChart from './components/ConsumptionVsLeakageChart';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dma, _] = React.useState('all');
  // const dmas = [
  //   { id: 'all', name: 'All DMAs' },
  //   ...dmaData.map((item: { dmaCode: string; dmaName?: string }) => ({
  //     id: item.dmaCode,
  //     name: item.dmaName || item.dmaCode,
  //   })),
  // ];
  // Drone selection state
  const [selectedDroneId] = React.useState(mockDrones[0].id);
  const selectedDrone =
    mockDrones.find((d) => d.id === selectedDroneId) || mockDrones[0];
  const [openThermal, setOpenThermal] = React.useState<null | {
    src: string;
    idx: number;
  }>(null);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        background: theme.palette.background.default,
        py: { xs: 2, sm: 4, md: 6 },
        width: '100%',
        // maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        left: 0,
        top: 0,
      }}
    >
      {/* Latest Updates Ticker */}
      {/* <LatestUpdates /> */}
      <Typography
        variant="h3"
        fontWeight={800}
        color={theme.palette.primary.main}
        mb={2}
        component={motion.h1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        sx={{ textAlign: 'center', letterSpacing: 1 }}
      >
        Dashboard
      </Typography>
      {/* Metrics Row */}
      <Grid
        container
        spacing={3}
        sx={{
          width: '100%',
          // maxWidth: '100vw',
          mx: 'auto',
          mb: 2,
          justifyContent: 'center',
        }}
      >
        {mockMetrics.map((metric) => (
          <Grid item xs={6} sm={4} md={2.4} lg={2} key={metric.title}>
            <MetricCard {...metric} />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        spacing={4}
        sx={{ width: '100%', maxWidth: '100vw', mx: 'auto', mb: 2 }}
      >
        {/* Main Map Section */}
        <Grid item xs={12} md={8} lg={9}>
          {/* Main Map Section */}
          <Box
            sx={{
              height: { xs: '70vh', sm: '80vh', md: '85vh', lg: '90vh' },
              minHeight: 420,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 8,
              background: theme.palette.background.paper,
              position: 'relative',
              mb: 2,
            }}
          >
            {/* Main Map */}
            <Box sx={{ width: '100%', height: '100%' }}>
              <DroneMap dma={dma} showPopups />
            </Box>
          </Box>
          {/* Drone Detail Section - use reusable component */}
          <DroneDetails
            drone={selectedDrone}
            openThermal={openThermal}
            setOpenThermal={setOpenThermal}
            thermalFallbacks={[
              thermal1,
              thermal2,
              thermal3,
              thermal4,
              thermal5,
            ]}
          />
          {/* Additional Visualizations: Leakage Type, Consumption vs Leakage, Correlation */}
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: 4,
              boxShadow: 6,
              mt: 4,
              mb: 4,
              px: { xs: 1, sm: 2 },
              py: 3,
              display: 'flex',
              justifyContent: 'space-evenly',
              maxWidth: 'auto',
              gap: 1,
              mx: 'auto',
              height: '450px',
            }}
          >
            {/* <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}> */}
            {/* Leakage by Type (Comms Pipe, Mains, etc.) */}
            <Card
              sx={{
                bgcolor: theme.palette.background.default,
                borderRadius: 3,
                boxShadow: 2,
                height: '100%',
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color={theme.palette.primary.main}
                  fontWeight={700}
                  mb={1}
                >
                  Leakage by Type
                </Typography>
                <LeakByTypeChart />
              </CardContent>
            </Card>
            {/* Consumption vs Leakage Chart */}
            <Card
              sx={{
                bgcolor: theme.palette.background.default,
                borderRadius: 3,
                boxShadow: 2,
                height: '100%',
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color={theme.palette.primary.main}
                  fontWeight={700}
                  mb={1}
                >
                  Consumption vs Leakage
                </Typography>
                <ConsumptionVsLeakageChart />
              </CardContent>
            </Card>
            {/* Correlation: Leak Events vs Logger Readings */}
            <Card
              sx={{
                bgcolor: theme.palette.background.default,
                borderRadius: 3,
                boxShadow: 2,
                height: '100%',
              }}
            >
              {' '}
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color={theme.palette.primary.main}
                  fontWeight={700}
                  mb={1}
                >
                  Leak Events & Logger Readings Correlation
                </Typography>
                <LeakLoggerCorrelationChart />
              </CardContent>
            </Card>
          </Box>
        </Grid>
        {/* Side Panel: Insights, Charts, and Quick Stats */}
        <Grid item xs={12} md={4} lg={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              height: '100%',
            }}
          >
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
                  fontWeight={700}
                  color={theme.palette.primary.main}
                  mb={1}
                >
                  Insights
                </Typography>
                <LatestUpdates />
              </CardContent>
            </Card>
            <AnalyticsChartsPanel />
          </Box>
        </Grid>
      </Grid>
      {/* Quick Navigation Cards (bottom row) */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{ width: '100%', maxWidth: '100vw', mx: 'auto', mt: 2 }}
      >
        <Grid item xs={12} md={3}>
          <NavigationCard
            icon={<VideocamIcon fontSize="large" />}
            title="Live Drone Feed"
            description="View real-time drone locations and video"
            onClick={() => navigate('/live-drone-feed')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <NavigationCard
            icon={<AnalyticsIcon fontSize="large" />}
            title="Analytics & Heatmaps"
            description="Explore trends and insights"
            onClick={() => navigate('/analytics')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <NavigationCard
            icon={<SettingsIcon fontSize="large" />}
            title="Settings"
            description="Configure dashboard preferences"
            onClick={() => navigate('/settings')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <NavigationCard
            icon={<AnalyticsIcon fontSize="large" color="error" />}
            title="Leak Heatmap"
            description="Visualize leak distribution by zone"
            onClick={() => navigate('/leak-heatmap')}
          />
        </Grid>
      </Grid>
      <Typography
        mt={6}
        color={theme.palette.text.secondary}
        fontSize={16}
        align="center"
        maxWidth={700}
        component={motion.p}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        sx={{ mx: 'auto' }}
      >
        <strong>Note:</strong> Live data, video, and map integration coming
        soon. This dashboard is designed for real-time updates and actionable
        insights.
      </Typography>
    </Box>
  );
};

export default Dashboard;
