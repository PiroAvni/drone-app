import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import type { Drone } from '../../../models/drone';
import type { Leak } from '../../../models/leak';
import LeakSeverityLegend from './LeakSeverityLegend';
import WorkOrdersLegend from './WorkOrdersLegend';
import ThermalLegend from './ThermalLegend';
import DronePathsLegend from './DronePathsLegend';

interface LegendPanelProps {
  show: boolean;
  onClose: () => void;
  showLoggers: boolean;
  showMeters: boolean;
  showWorkOrders: boolean;
  showDronePaths: boolean;
  filteredLeaks: Leak[];
  workOrderTypes: { type: string; color: string }[];
  drones: Drone[];
}

const LegendPanel: React.FC<LegendPanelProps> = ({
  show,
  onClose,
  showLoggers,
  showMeters,
  showWorkOrders,
  showDronePaths,
  filteredLeaks,
  workOrderTypes,
  drones,
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ x: 320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 320, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{
          position: 'absolute',
          top: 24,
          right: 0,
          width: 260,
          zIndex: 20,
          height: 'auto',
          maxHeight: 'calc(100% - 48px)',
          overflowY: 'auto',
          pointerEvents: 'auto',
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(44,83,100,0.97)',
            borderRadius: 3,
            px: 3,
            py: 2,
            boxShadow: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 2,
            width: '100%',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}
          >
            <Typography
              fontWeight={800}
              color='#fff'
              fontSize={18}
              sx={{ flex: 1 }}
            >
              Map Legends
            </Typography>
            <IconButton
              aria-label='Close legend panel'
              onClick={onClose}
              size='small'
              sx={{ color: '#fff', ml: 1 }}
            >
              ×
            </IconButton>
          </Box>
          {/* Leak Severity Legend */}
          {(showLoggers || showMeters || filteredLeaks.length > 0) && (
            <LeakSeverityLegend
              show={showLoggers || showMeters}
              filteredLeaksCount={filteredLeaks.length}
            />
          )}
          {/* Work Orders Legend */}
          {showWorkOrders && (
            <WorkOrdersLegend
              show={showWorkOrders}
              workOrderTypes={workOrderTypes}
            />
          )}
          {/* Thermal Legend */}
          {showMeters && <ThermalLegend show={showMeters} />}
          {/* Drone Paths Legend */}
          {showDronePaths && (
            <DronePathsLegend show={showDronePaths} drones={drones} />
          )}
        </Box>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LegendPanel;
