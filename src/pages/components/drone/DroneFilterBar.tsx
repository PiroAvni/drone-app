import React from 'react';
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

interface DroneFilterBarProps {
  severity: string;
  setSeverity: (v: string) => void;
  dateRange: { from: Dayjs; to: Dayjs };
  setDateRange: (v: { from: Dayjs; to: Dayjs }) => void;
  dma?: string;
  setDMA?: (v: string) => void;
  dmaRegions?: { id: string; name: string }[];
  showMeters: boolean;
  setShowMeters: (v: boolean) => void;
  showLoggers: boolean;
  setShowLoggers: (v: boolean) => void;
  showWorkOrders: boolean;
  setShowWorkOrders: (v: boolean) => void;
  showDronePaths: boolean;
  setShowDronePaths: (v: boolean) => void;
  showTechStaff: boolean;
  setShowTechStaff: (v: boolean) => void;
  severityOptions: { value: string; label: string }[];
}

const DroneFilterBar: React.FC<DroneFilterBarProps> = ({
  severity,
  setSeverity,
  dateRange,
  setDateRange,
  dma,
  setDMA,
  dmaRegions = [],
  showMeters,
  setShowMeters,
  showLoggers,
  setShowLoggers,
  showWorkOrders,
  setShowWorkOrders,
  showDronePaths,
  setShowDronePaths,
  showTechStaff,
  setShowTechStaff,
  severityOptions,
}) => (
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    spacing={2}
    mb={2}
    alignItems='center'
    justifyContent='center'
    sx={{ flexWrap: 'wrap', gap: 2 }}
  >
    <FormControl
      size='small'
      sx={{
        minWidth: 140,
        bgcolor: 'rgba(44,83,100,0.85)',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <InputLabel>Severity</InputLabel>
      <Select
        value={severity}
        label='Severity'
        onChange={(e) => setSeverity(e.target.value as string)}
        sx={{ color: '#00c6ff', fontWeight: 600 }}
      >
        {severityOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label='From'
      type='date'
      size='small'
      value={dateRange.from.format('YYYY-MM-DD')}
      onChange={(e) =>
        setDateRange({ ...dateRange, from: dayjs(e.target.value) })
      }
      InputLabelProps={{ shrink: true }}
      sx={{
        bgcolor: 'rgba(44,83,100,0.85)',
        borderRadius: 2,
        boxShadow: 2,
        minWidth: 140,
      }}
    />
    <TextField
      label='To'
      type='date'
      size='small'
      value={dateRange.to.format('YYYY-MM-DD')}
      onChange={(e) =>
        setDateRange({ ...dateRange, to: dayjs(e.target.value) })
      }
      InputLabelProps={{ shrink: true }}
      sx={{
        bgcolor: 'rgba(44,83,100,0.85)',
        borderRadius: 2,
        boxShadow: 2,
        minWidth: 140,
      }}
    />
    {setDMA && dmaRegions.length > 0 && (
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
          <MenuItem value='all'>All DMAs</MenuItem>
          {dmaRegions.map((region) => (
            <MenuItem key={region.id} value={region.id}>
              {region.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
    <FormControlLabel
      control={
        <Switch
          checked={showMeters}
          onChange={(_, v) => setShowMeters(v)}
          color='primary'
        />
      }
      label='Show Smart Meters'
    />
    <FormControlLabel
      control={
        <Switch
          checked={showLoggers}
          onChange={(_, v) => setShowLoggers(v)}
          color='primary'
        />
      }
      label='Show Loggers'
    />
    <FormControlLabel
      control={
        <Switch
          checked={showWorkOrders}
          onChange={(_, v) => setShowWorkOrders(v)}
          color='secondary'
        />
      }
      label='Show Work Orders'
    />
    <FormControlLabel
      control={
        <Switch
          checked={showDronePaths}
          onChange={(_, v) => setShowDronePaths(v)}
          color='primary'
        />
      }
      label='Show Drone Paths'
    />
    <FormControlLabel
      control={
        <Switch
          checked={showTechStaff}
          onChange={(_, v) => setShowTechStaff(v)}
          color='primary'
        />
      }
      label='Show Tech Staff'
    />
  </Stack>
);

export default DroneFilterBar;
