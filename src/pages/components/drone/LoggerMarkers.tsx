import React from 'react';
import { Marker } from 'react-map-gl';
import SensorsIcon from '@mui/icons-material/Sensors';
import { Typography } from '@mui/material';
import type { Logger } from '../../../models/meterLogger';

interface LoggerMarkersProps {
  loggers: Logger[];
  showPopups?: boolean;
  setPopup: (popup: { type: 'logger' } & Logger) => void;
}

const LoggerMarkers: React.FC<LoggerMarkersProps> = React.memo(
  ({ loggers, showPopups, setPopup }) => (
    <>
      {loggers.map((logger) => (
        <Marker
          key={logger.id}
          longitude={logger.lng}
          latitude={logger.lat}
          offset={[0, -16]}
          onClick={() => showPopups && setPopup({ type: 'logger', ...logger })}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
            }}
          >
            {/* Shadow beneath marker */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 28,
                width: 32,
                height: 12,
                background: 'transparent',
                zIndex: 1,
                pointerEvents: 'none',
                transform: 'translateX(-50%)',
                boxShadow: '0 8px 24px 0 rgba(0,0,0,0.38)',
                borderRadius: '50%',
                backgroundImage:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0.38) 60%, rgba(0,0,0,0.12) 100%)',
                filter: 'blur(6px)',
              }}
            />
            <SensorsIcon
              sx={{
                color: '#ff9800',
                fontSize: 32,
                filter:
                  'drop-shadow(0 6px 18px #0007) drop-shadow(0 0 8px #ff980088)',
                transform: 'perspective(32px) rotateX(22deg) scale(1.08)',
                zIndex: 2,
              }}
            />
            <Typography
              variant='caption'
              sx={{
                bgcolor: '#fff',
                color: '#ff9800',
                px: 0.5,
                borderRadius: 1,
                fontWeight: 700,
                boxShadow: 1,
                mt: 0.5,
                zIndex: 3,
                whiteSpace: 'nowrap',
              }}
            >
              Logger
            </Typography>
          </div>
        </Marker>
      ))}
    </>
  )
);

export default LoggerMarkers;
