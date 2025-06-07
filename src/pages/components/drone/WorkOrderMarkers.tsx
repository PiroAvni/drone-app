import React from 'react';
import { Marker } from 'react-map-gl';
import { Box, Typography } from '@mui/material';
import type { WorkOrder } from '../../../models/workOrder';

interface WorkOrderMarkersProps {
  workOrders: WorkOrder[];
}

const WorkOrderMarkers: React.FC<WorkOrderMarkersProps> = React.memo(
  ({ workOrders }) => (
    <>
      {workOrders.map((wo) => (
        <Marker
          key={wo.id}
          longitude={wo.lng}
          latitude={wo.lat}
          offset={[0, -16]}
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
                top: 24,
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
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: wo.color,
                border: '2px solid #fff',
                boxShadow: '0 0 8px #23252644, 0 6px 18px #0007',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'perspective(32px) rotateX(22deg) scale(1.08)',
                zIndex: 2,
              }}
              title={wo.type}
            >
              <Typography
                fontWeight={700}
                color='#fff'
                fontSize={13}
                sx={{ textShadow: '0 1px 4px #23252688' }}
              >
                {wo.type[0]}
              </Typography>
            </Box>
            <Typography
              variant='caption'
              sx={{
                bgcolor: '#fff',
                color: wo.color,
                px: 0.5,
                borderRadius: 1,
                fontWeight: 700,
                boxShadow: 1,
                mt: 0.5,
                zIndex: 3,
                whiteSpace: 'nowrap',
              }}
            >
              {wo.type}
            </Typography>
          </div>
        </Marker>
      ))}
    </>
  )
);

export default WorkOrderMarkers;
