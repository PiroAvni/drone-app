import React from 'react';
import { IconButton, Typography } from '@mui/material';

interface LegendPanelToggleProps {
  onClick: () => void;
}

const LegendPanelToggle: React.FC<LegendPanelToggleProps> = ({ onClick }) => (
  <IconButton
    aria-label='Open legend panel'
    onClick={onClick}
    size='large'
    sx={{
      position: 'absolute',
      top: 32,
      right: 16,
      zIndex: 30,
      bgcolor: 'rgba(44,83,100,0.97)',
      color: '#fff',
      borderRadius: 2,
      boxShadow: 4,
      width: 48,
      height: 48,
      '&:hover': { bgcolor: 'rgba(44,83,100,1)' },
      display: { xs: 'flex', md: 'flex' },
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography fontSize={32} fontWeight={700}>
      ≡
    </Typography>
  </IconButton>
);

export default LegendPanelToggle;
