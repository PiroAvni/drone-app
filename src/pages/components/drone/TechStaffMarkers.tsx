import React from 'react';
import { Marker } from 'react-map-gl';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { Typography } from '@mui/material';
import type { TechStaff } from '../../../models/techStaff';

interface TechStaffMarkersProps {
  staff: TechStaff[];
  showPopups?: boolean;
  setPopup: (popup: { type: 'tech' } & TechStaff) => void;
}

const TechStaffMarkers: React.FC<TechStaffMarkersProps> = React.memo(
  ({ staff, showPopups, setPopup }) => (
    <>
      {staff.map((person) => (
        <Marker
          key={person.id}
          longitude={person.lng}
          latitude={person.lat}
          offset={[0, -16]}
          onClick={() => showPopups && setPopup({ type: 'tech', ...person })}
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
                top: 32,
                width: 38,
                height: 14,
                background: 'transparent',
                zIndex: 1,
                pointerEvents: 'none',
                transform: 'translateX(-50%)',
                // 3D shadow effect
                boxShadow: '0 8px 24px 0 rgba(0,0,0,0.38)',
                borderRadius: '50%',
                // For extra realism, use a radial gradient
                backgroundImage:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0.38) 60%, rgba(0,0,0,0.12) 100%)',
                filter: 'blur(6px)',
              }}
            />
            <PersonPinCircleIcon
              sx={{
                color: '#43a047',
                fontSize: 36,
                filter:
                  'drop-shadow(0 6px 18px #0007) drop-shadow(0 0 8px #fff8)',
                transform: 'perspective(32px) rotateX(22deg) scale(1.08)',
                zIndex: 2,
              }}
            />
            <Typography
              variant='caption'
              sx={{
                bgcolor: '#fff',
                color: '#43a047',
                px: 0.5,
                borderRadius: 1,
                fontWeight: 700,
                boxShadow: 1,
                mt: 0.5,
                zIndex: 3,
                whiteSpace: 'nowrap',
              }}
            >
              {person.name}
            </Typography>
          </div>
        </Marker>
      ))}
    </>
  )
);

export default TechStaffMarkers;
