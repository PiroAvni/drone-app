import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const mockUpdates = [
  'Drone #1: Leak detected at Zone A (Score: 4.8) - 12:01 PM',
  'Drone #2: All clear in Zone B - 12:03 PM',
  'Drone #3: Leak resolved at Zone C - 12:05 PM',
  'New drone deployed to Zone D - 12:07 PM',
  'High probability leak detected at Zone E (Score: 4.9) - 12:09 PM',
  'Drone #1: Battery low, returning to base - 12:10 PM',
  'Leak confirmed at Zone F (Score: 4.7) - 12:12 PM',
];

const LatestUpdates: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const animId = useRef<number | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    let start = 0;
    const scroll = () => {
      if (!paused.current && ticker.scrollWidth > ticker.clientWidth) {
        start -= 1;
        if (Math.abs(start) > ticker.scrollWidth) start = ticker.clientWidth;
        ticker.scrollLeft = Math.abs(start);
      }
      animId.current = requestAnimationFrame(scroll);
    };
    animId.current = requestAnimationFrame(scroll);
    return () => {
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, []);

  const handleMouseEnter = () => {
    paused.current = true;
  };
  const handleMouseLeave = () => {
    paused.current = false;
  };

  return (
    <Box
      sx={{
        width: '100%', // changed from 80% to 100% to fit container
        maxWidth: '1200px', // limit to a reasonable max width
        mx: 'auto', // center horizontally
        bgcolor: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
        py: 1,
        mb: 2,
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Box
        ref={tickerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          display: 'flex',
          whiteSpace: 'nowrap',
          fontWeight: 600,
          color: '#2196f3',
          fontSize: 18,
          alignItems: 'center',
          gap: 6,
          px: 2,
          overflow: 'hidden',
        }}
      >
        {mockUpdates.map((update, idx) => (
          <Typography
            key={idx}
            sx={{
              mx: 3,
              display: 'inline-block',
              alignItems: 'center',
              color: '#b0bec5',
            }}
          >
            {update}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default LatestUpdates;
