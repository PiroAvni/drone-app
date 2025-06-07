import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';

export interface DMARegion {
  id: string;
  name: string;
}

interface DMAFilterBarProps {
  dma: string;
  setDMA: (v: string) => void;
  dmas: DMARegion[];
}

const DMAFilterBar: React.FC<DMAFilterBarProps> = ({ dma, setDMA, dmas }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1,
        bgcolor: 'rgba(44,83,100,0.10)',
        borderRadius: 2,
        boxShadow: 2,
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
      }}
    >
      <MapIcon sx={{ color: theme.palette.primary.main }} />
      <Typography fontWeight={700} color={theme.palette.primary.main}>
        DMA Region
      </Typography>
      <FormControl
        size='small'
        sx={{
          minWidth: 140,
          bgcolor: 'rgba(44,83,100,0.85)',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <InputLabel>DMA Region</InputLabel>
        <Select
          value={dma}
          label='DMA Region'
          onChange={(e) => setDMA(e.target.value)}
          sx={{ color: '#00c6ff', fontWeight: 600 }}
        >
          {dmas.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DMAFilterBar;
