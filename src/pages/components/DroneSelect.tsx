import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Avatar,
  type SelectChangeEvent,
} from '@mui/material';
import type { Drone } from '../mockDrones';

interface DroneSelectProps {
  drones: Drone[];
  selectedDroneId: string;
  onChange: (id: string) => void;
  label?: string;
  disabledIds?: string[];
  sx?: object;
}

const DroneSelect: React.FC<DroneSelectProps> = ({
  drones,
  selectedDroneId,
  onChange,
  label = 'Drone',
  disabledIds = [],
  sx = {},
}) => {
  return (
    <FormControl size='small' sx={{ minWidth: 180, ...sx }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedDroneId}
        label={label}
        onChange={(e: SelectChangeEvent<string>) => onChange(e.target.value)}
        sx={{ fontWeight: 700 }}
      >
        {drones.map((drone) => (
          <MenuItem
            key={drone.id}
            value={drone.id}
            disabled={
              disabledIds.includes(drone.id) || drone.status === 'inactive'
            }
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={
                  drone.image ||
                  drone.images[0] ||
                  'https://placehold.co/40x40/232526/888888?text=DR'
                }
                alt={drone.label}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: drone.color,
                  fontSize: 16,
                }}
              >
                {drone.label.charAt(0)}
              </Avatar>
              <Typography
                fontWeight={700}
                color={drone.status === 'inactive' ? '#b0bec5' : drone.color}
              >
                {drone.label}
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ ml: 1 }}
              >
                {drone.status === 'inactive' ? '(Inactive)' : ''}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DroneSelect;
