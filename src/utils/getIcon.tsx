import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import OpacityIcon from '@mui/icons-material/Opacity';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React from 'react';

export function getIcon(update: string): React.ReactNode {
  if (/drone/i.test(update))
    return (
      <FlightTakeoffIcon
        sx={{ color: '#1976d2', mr: 1, verticalAlign: 'middle' }}
      />
    );
  if (/leak/i.test(update))
    return (
      <OpacityIcon sx={{ color: '#00c6ff', mr: 1, verticalAlign: 'middle' }} />
    );
  return (
    <InfoOutlinedIcon
      sx={{ color: '#b0bec5', mr: 1, verticalAlign: 'middle' }}
    />
  );
}
