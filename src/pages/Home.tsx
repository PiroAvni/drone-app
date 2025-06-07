import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import InfoIcon from '@mui/icons-material/Info';
import { motion } from 'framer-motion';
import AnalyticsChartsPanel from './components/AnalyticsChartsPanel';

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <motion.div
      {...fadeIn}
      style={{
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          background: theme.palette.background.default,
          py: 6,
          width: '100%',

          overflowX: 'hidden',
          mx: 'auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 72,
              height: 72,
              mx: 'auto',
              mb: 2,
            }}
            component='div'
          >
            <WaterDropIcon fontSize='large' />
          </Avatar>
          <Typography
            variant='h2'
            fontWeight={800}
            color={theme.palette.primary.main}
            gutterBottom
            letterSpacing={1}
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            AquaGuard: Smart Water Leak Detection
          </Typography>
          <Typography
            variant='h6'
            color={theme.palette.text.secondary}
            sx={{ mb: 3, lineHeight: 1.6 }}
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Every year, billions of litres of clean water are lost due to
            undetected pipe leaks, bursts, and infrastructure failures.
            AquaGuard is an AI-powered ecosystem using drones, real-time
            intelligence, and advanced analytics to detect water leaks faster,
            cheaper, and smarter.
          </Typography>
        </motion.div>
        <Grid
          container
          spacing={4}
          justifyContent='center'
          alignItems='stretch'
          sx={{ maxWidth: 1200, mb: 4, width: '100%' }}
        >
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{ flex: 1, display: 'flex' }}
            >
              <Card
                sx={{
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 3,
                  boxShadow: 3,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box display='flex' alignItems='center' mb={2} gap={1}>
                    <InfoIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography
                      variant='h5'
                      fontWeight={700}
                      color={theme.palette.primary.main}
                    >
                      The Vision
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <ul
                      style={{
                        color: theme.palette.text.secondary,
                        fontSize: 18,
                        lineHeight: 1.7,
                        margin: 0,
                        paddingLeft: 20,
                      }}
                    >
                      <li>
                        Drones autonomously patrol water networks, scanning for
                        anomalies using RGB and thermal imaging.
                      </li>
                      <li>
                        Onboard AI (YOLOv8n) identifies leak patterns in
                        real-time.
                      </li>
                      <li>
                        Live data and alerts empower field teams to act
                        immediately.
                      </li>
                      <li>
                        Heatmaps and trends highlight weak spots for proactive
                        maintenance.
                      </li>
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{ flex: 1, display: 'flex' }}
            >
              <Card
                sx={{
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 3,
                  boxShadow: 3,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent
                  sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Box display='flex' alignItems='center' mb={2} gap={1}>
                    <RocketLaunchIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <Typography
                      variant='h5'
                      fontWeight={700}
                      color={theme.palette.primary.main}
                    >
                      Get Started
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      color={theme.palette.text.secondary}
                      fontSize={16}
                      mb={2}
                    >
                      Explore the dashboard to see live drone feeds, leak
                      locations, and analytics in action.
                    </Typography>
                  </Box>
                  <Button
                    href='/dashboard'
                    variant='contained'
                    size='large'
                    sx={{
                      mt: 1,
                      background: `linear-gradient(90deg,${
                        theme.palette.primary.main
                      },${
                        theme.palette.primary.dark || theme.palette.primary.main
                      })`,
                      color: theme.palette.getContrastText(
                        theme.palette.primary.main
                      ),
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: 18,
                      boxShadow: '0 2px 8px rgba(0,198,255,0.12)',
                      textTransform: 'none',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        background: `linear-gradient(90deg,${
                          theme.palette.primary.dark ||
                          theme.palette.primary.main
                        },${theme.palette.primary.main})`,
                      },
                    }}
                    startIcon={<RocketLaunchIcon />}
                  >
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        <Box
          sx={{
            color: theme.palette.text.secondary,
            fontSize: 18,
            mb: 2,
            textAlign: 'center',
          }}
        >
          <strong>Real Impact:</strong> For water utilities, field teams, and
          cities building sustainable infrastructure.
        </Box>
        <Box
          sx={{
            color: theme.palette.text.secondary,
            fontSize: 16,
            mb: 2,
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          <em>
            "This is not just a drone — it’s a fully connected AI-powered
            ecosystem, designed to protect one of Earth’s most vital resources:
            water."
          </em>
        </Box>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{ width: '100%' }}
        >
          <Grid
            container
            spacing={4}
            justifyContent='center'
            alignItems='center'
            sx={{ mt: 2, width: '100%' }}
          >
            <Grid item xs={12} md={10} lg={8} sx={{ mx: 'auto' }}>
              <motion.div whileHover={{ scale: 1.01 }}>
                <Card
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 3,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant='h6'
                      color={theme.palette.primary.main}
                      fontWeight={700}
                      mb={1}
                      align='center'
                    >
                      How It Works
                    </Typography>
                    <ul
                      style={{
                        color: theme.palette.text.secondary,
                        fontSize: 16,
                        lineHeight: 1.6,
                        margin: 0,
                        paddingLeft: 20,
                        textAlign: 'left',
                        maxWidth: 600,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <li>Autonomous drone flight (PX4, GPS waypoints)</li>
                      <li>Edge AI (YOLOv8n, FLIR Lepton 3.5)</li>
                      <li>Node.js backend, PostgreSQL storage</li>
                      <li>React + Mapbox dashboard</li>
                      <li>WebSockets for real-time updates</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          style={{ width: '100%' }}
        >
          <AnalyticsChartsPanel direction={'row'} />
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Home;
