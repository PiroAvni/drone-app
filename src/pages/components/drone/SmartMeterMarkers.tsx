import React from 'react';
import { Marker } from 'react-map-gl';
import SpeedIcon from '@mui/icons-material/Speed';
import { Typography } from '@mui/material';
import type { SmartMeter } from '../../../models/meterLogger';

interface SmartMeterMarkersProps {
  meters: SmartMeter[];
  showPopups?: boolean;
  setPopup: (popup: { type: 'meter' } & SmartMeter) => void;
}

const SmartMeterMarkers: React.FC<SmartMeterMarkersProps> = React.memo(
  ({ meters, showPopups, setPopup }) => (
    <>
      {meters.map((meter) => (
        <Marker
          key={meter.id}
          longitude={meter.lng}
          latitude={meter.lat}
          offset={[0, -16]}
          onClick={() => showPopups && setPopup({ type: 'meter', ...meter })}
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
            <SpeedIcon
              sx={{
                color: '#00bcd4',
                fontSize: 32,
                filter:
                  'drop-shadow(0 6px 18px #0007) drop-shadow(0 0 8px #00bcd488)',
                transform: 'perspective(32px) rotateX(22deg) scale(1.08)',
                zIndex: 2,
              }}
            />
            <Typography
              variant='caption'
              sx={{
                bgcolor: '#fff',
                color: '#00bcd4',
                px: 0.5,
                borderRadius: 1,
                fontWeight: 700,
                boxShadow: 1,
                mt: 0.5,
                zIndex: 3,
                whiteSpace: 'nowrap',
              }}
            >
              Smart Meter
            </Typography>
          </div>
        </Marker>
      ))}
    </>
  )
);

export default SmartMeterMarkers;
