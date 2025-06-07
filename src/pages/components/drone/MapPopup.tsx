import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';

type DronePopup = { type: 'drone'; id: string; label: string };
type LeakPopup = { type: 'leak'; severity: string; dma: string };
type TechPopup = { type: 'tech'; name: string; dma: string };
type MeterPopup = { type: 'meter'; id: string; dma: string };
type LoggerPopup = { type: 'logger'; id: string; dma: string };

type Popup =
  | DronePopup
  | LeakPopup
  | TechPopup
  | MeterPopup
  | LoggerPopup
  | null;

interface MapPopupProps {
  popup: Popup;
  theme: Theme;
}

const MapPopup: React.FC<MapPopupProps> = ({ popup, theme }) => {
  if (!popup) return null;
  switch (popup.type) {
    case 'drone':
      return (
        <Box>
          <Typography fontWeight={700} color={theme.palette.primary.main}>
            Drone Info
          </Typography>
          <Typography>ID: {popup.id}</Typography>
          <Typography>Label: {popup.label}</Typography>
        </Box>
      );
    case 'leak':
      return (
        <Box>
          <Typography fontWeight={700} color={theme.palette.error.main}>
            Leak Info
          </Typography>
          <Typography>Severity: {popup.severity}</Typography>
          <Typography>DMA: {popup.dma}</Typography>
        </Box>
      );
    case 'tech':
      return (
        <Box>
          <Typography fontWeight={700} color={theme.palette.success.main}>
            Tech Staff
          </Typography>
          <Typography>Name: {popup.name}</Typography>
          <Typography>DMA: {popup.dma}</Typography>
        </Box>
      );
    case 'meter':
      return (
        <Box>
          <Typography fontWeight={700} color='#00bcd4'>
            Smart Meter
          </Typography>
          <Typography>ID: {popup.id}</Typography>
          <Typography>DMA: {popup.dma}</Typography>
        </Box>
      );
    case 'logger':
      return (
        <Box>
          <Typography fontWeight={700} color='#ff9800'>
            Logger
          </Typography>
          <Typography>ID: {popup.id}</Typography>
          <Typography>DMA: {popup.dma}</Typography>
        </Box>
      );
    default:
      return null;
  }
};

export default MapPopup;
