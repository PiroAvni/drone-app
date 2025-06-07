import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  useTheme,
} from '@mui/material';
import type { Drone } from '../../models/drone';

interface DroneDetailsProps {
  drone: Drone;
  openThermal: null | { src: string; idx: number };
  setOpenThermal: (v: null | { src: string; idx: number }) => void;
  thermalFallbacks: string[];
}

const DroneDetails: React.FC<DroneDetailsProps> = ({
  drone,
  openThermal,
  setOpenThermal,
  thermalFallbacks,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        p: 2,
        bgcolor: theme.palette.background.paper,
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <Grid container spacing={3}>
        {/* Thermal Images */}
        <Grid item xs={12} md={5}>
          <Typography
            variant='subtitle1'
            fontWeight={700}
            mb={1}
            color={theme.palette.text.secondary}
          >
            Thermal Images
          </Typography>
          <Grid container spacing={1}>
            {(drone.images && drone.images.length > 0
              ? drone.images
              : thermalFallbacks
            ).map((img: string, idx: number) => (
              <Grid item xs={4} key={idx}>
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    background:
                      'linear-gradient(135deg,#232526 60%,#00c6ff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.25)',
                      zIndex: 2,
                      boxShadow: 8,
                    },
                  }}
                  onClick={() => setOpenThermal({ src: img, idx })}
                >
                  <img
                    src={img}
                    alt={`Thermal ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.95,
                      pointerEvents: 'none',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          {/* Thermal Legend */}
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography fontWeight={700} color={theme.palette.text.secondary}>
              Thermal Legend:
            </Typography>
            <Box
              sx={{
                width: 32,
                height: 16,
                bgcolor: '#0000ff',
                borderRadius: 1,
              }}
            />
            <Typography color='#0000ff' fontSize={14}>
              15°C
            </Typography>
            <Box
              sx={{
                width: 32,
                height: 16,
                bgcolor: '#00c6ff',
                borderRadius: 1,
                mx: 0.5,
              }}
            />
            <Typography color='#00c6ff' fontSize={14}>
              25°C
            </Typography>
            <Box
              sx={{
                width: 32,
                height: 16,
                bgcolor: '#ffeb3b',
                borderRadius: 1,
                mx: 0.5,
              }}
            />
            <Typography color='#ffeb3b' fontSize={14}>
              35°C
            </Typography>
            <Box
              sx={{
                width: 32,
                height: 16,
                bgcolor: '#ff9800',
                borderRadius: 1,
                mx: 0.5,
              }}
            />
            <Typography color='#ff9800' fontSize={14}>
              45°C
            </Typography>
            <Box
              sx={{
                width: 32,
                height: 16,
                bgcolor: '#e53935',
                borderRadius: 1,
                mx: 0.5,
              }}
            />
            <Typography color='#e53935' fontSize={14}>
              55°C
            </Typography>
          </Box>
          {/* Thermal Image Popup Dialog */}
          <Dialog
            open={!!openThermal}
            onClose={() => setOpenThermal(null)}
            maxWidth='md'
          >
            <DialogContent
              sx={{ bgcolor: theme.palette.background.paper, p: 0 }}
            >
              {openThermal && (
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={openThermal.src}
                    alt={`Thermal ${openThermal.idx + 1}`}
                    style={{
                      maxWidth: '80vw',
                      maxHeight: '60vh',
                      borderRadius: 8,
                      boxShadow: '0 4px 32px #0008',
                      marginBottom: 16,
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography
                      fontWeight={700}
                      color={theme.palette.text.secondary}
                    >
                      Thermal Legend:
                    </Typography>
                    <Box
                      sx={{
                        width: 32,
                        height: 16,
                        bgcolor: '#0000ff',
                        borderRadius: 1,
                      }}
                    />
                    <Typography color='#0000ff' fontSize={14}>
                      15°C
                    </Typography>
                    <Box
                      sx={{
                        width: 32,
                        height: 16,
                        bgcolor: '#00c6ff',
                        borderRadius: 1,
                      }}
                    />
                    <Typography color='#00c6ff' fontSize={14}>
                      25°C
                    </Typography>
                    <Box
                      sx={{
                        width: 32,
                        height: 16,
                        bgcolor: '#ffeb3b',
                        borderRadius: 1,
                      }}
                    />
                    <Typography color='#ffeb3b' fontSize={14}>
                      35°C
                    </Typography>
                    <Box
                      sx={{
                        width: 32,
                        height: 16,
                        bgcolor: '#ff9800',
                        borderRadius: 1,
                      }}
                    />
                    <Typography color='#ff9800' fontSize={14}>
                      45°C
                    </Typography>
                    <Box
                      sx={{
                        width: 32,
                        height: 16,
                        bgcolor: '#e53935',
                        borderRadius: 1,
                      }}
                    />
                    <Typography color='#e53935' fontSize={14}>
                      55°C
                    </Typography>
                  </Box>
                </Box>
              )}
            </DialogContent>
          </Dialog>
        </Grid>
        {/* Flight Data */}
        <Grid item xs={12} md={4}>
          <Typography
            variant='subtitle1'
            fontWeight={700}
            mb={1}
            color={theme.palette.text.secondary}
          >
            Flight Data
          </Typography>
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 2,
              p: 2,
              boxShadow: 2,
              mb: 2,
            }}
          >
            <Typography fontWeight={600} color={theme.palette.primary.main}>
              Area Covered
            </Typography>
            <Typography color={theme.palette.text.secondary}>
              {drone.areaCovered}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 2,
              p: 2,
              boxShadow: 2,
              mb: 2,
            }}
          >
            <Typography fontWeight={600} color={theme.palette.primary.main}>
              Flight Time
            </Typography>
            <Typography color={theme.palette.text.secondary}>
              {drone.flightTime}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 2,
              p: 2,
              boxShadow: 2,
            }}
          >
            <Typography fontWeight={600} color={theme.palette.primary.main}>
              Battery Used
            </Typography>
            <Typography color={theme.palette.text.secondary}>
              {drone.battery}
            </Typography>
          </Box>
        </Grid>
        {/* Detection Details */}
        <Grid item xs={12} md={3}>
          <Typography
            variant='subtitle1'
            fontWeight={700}
            mb={1}
            color={theme.palette.text.secondary}
          >
            Detections
          </Typography>
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 2,
              p: 2,
              boxShadow: 2,
              mb: 2,
            }}
          >
            <Typography fontWeight={600} color={theme.palette.error.main}>
              Leaks Detected
            </Typography>
            <Typography color={theme.palette.text.secondary}>
              {drone.detections.leaks}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 2,
              p: 2,
              boxShadow: 2,
              mb: 2,
            }}
          >
            <Typography fontWeight={600} color={theme.palette.warning.main}>
              High Probability
            </Typography>
            <Typography color={theme.palette.text.secondary}>
              {drone.detections.high}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 2,
              p: 2,
              boxShadow: 2,
            }}
          >
            <Typography fontWeight={600} color={theme.palette.success.main}>
              Resolved
            </Typography>
            <Typography color={theme.palette.text.secondary}>
              {drone.detections.resolved}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DroneDetails;
