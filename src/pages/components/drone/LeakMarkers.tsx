import React from 'react';
import { Marker } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import { Typography, Box } from '@mui/material';
import type { Leak } from '../../../models/leak';

interface LeakMarkersProps {
  leaks: Leak[];
  leakColors: Record<string, string>;
  showPopups?: boolean;
  setPopup: (popup: { type: 'leak' } & Leak) => void;
}

const pulseKeyframes = {
  '0%': { boxShadow: '0 0 0 0 rgba(229,57,53,0.7), 0 2px 12px #fff8' },
  '70%': { boxShadow: '0 0 0 16px rgba(229,57,53,0)' },
  '100%': { boxShadow: '0 0 0 0 rgba(229,57,53,0)' },
};

const LeakMarkers: React.FC<LeakMarkersProps> = React.memo(
  ({ leaks, leakColors, showPopups, setPopup }) => (
    <>
      {leaks.map((leak) => (
        <Marker
          key={leak.id}
          longitude={leak.lng}
          latitude={leak.lat}
          offset={[0, -16]}
          onClick={() => showPopups && setPopup({ type: 'leak', ...leak })}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              zIndex: 2,
            }}
          >
            <Typography
              variant='caption'
              sx={{
                bgcolor: '#fff',
                color: leakColors[leak.severity],
                px: 0.5,
                borderRadius: 1,
                fontWeight: 700,
                boxShadow: 1,
                mb: 0.5,
                zIndex: 3,
                whiteSpace: 'nowrap',
              }}
            >
              {leak.severity?.toUpperCase()}
            </Typography>
            {leak.severity === 'high' ? (
              <Box
                sx={{
                  position: 'relative',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: leakColors.high,
                    opacity: 0.5,
                    animation:
                      'leakPulse 1.2s infinite cubic-bezier(0.66,0,0,1)',
                    zIndex: 1,
                    '@keyframes leakPulse': pulseKeyframes,
                  }}
                />
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    bgcolor: leakColors.high,
                    border: '3px solid #fff',
                    boxShadow: '0 2px 12px #e5393588, 0 0 8px #fff8',
                    zIndex: 2,
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 2,
                }}
              >
                {/* Shadow beneath marker */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: 34,
                    width: 38,
                    height: 14,
                    bgcolor: 'transparent',
                    zIndex: 1,
                    pointerEvents: 'none',
                    transform: 'translateX(-50%)',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(ellipse at center, rgba(0,0,0,0.38) 60%, rgba(0,0,0,0.12) 100%)',
                      filter: 'blur(6px)',
                    },
                  }}
                />
                <RoomIcon
                  sx={{
                    color: leakColors[leak.severity],
                    fontSize: 36,
                    filter:
                      'drop-shadow(0 6px 18px #0007) drop-shadow(0 0 8px #fff8)',
                    transform: 'perspective(32px) rotateX(22deg) scale(1.08)',
                    zIndex: 2,
                  }}
                />
              </Box>
            )}
          </Box>
        </Marker>
      ))}
    </>
  )
);

export default LeakMarkers;
