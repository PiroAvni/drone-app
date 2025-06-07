import React, { useState, useEffect, useMemo } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import type { ViewState, ViewStateChangeEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '@mui/material';
import { Popup } from 'react-map-gl';
import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';
import DroneInfo from './components/drone/DroneInfo';
import DroneFilterBar from './components/drone/DroneFilterBar';
import NotificationBar from './components/drone/NotificationBar';
import MapPopup from './components/drone/MapPopup';
import LegendPanel from './components/drone/LegendPanel';
import LegendPanelToggle from './components/drone/LegendPanelToggle';
import DroneDetails from './components/DroneDetails';
import DroneMarkers from './components/drone/DroneMarkers';
import LeakMarkers from './components/drone/LeakMarkers';
import TechStaffMarkers from './components/drone/TechStaffMarkers';
import SmartMeterMarkers from './components/drone/SmartMeterMarkers';
import LoggerMarkers from './components/drone/LoggerMarkers';
import WorkOrderMarkers from './components/drone/WorkOrderMarkers';
import DronePathLines from './components/drone/DronePathLines';
import DroneSelect from './components/DroneSelect';
import type { Popup as MapPopupType } from '../types/Popup.type';
import { WorkOrderType } from '../models/workOrder';

import { mockDrones } from '../models/drone';
import { mockLeaksWithDMA } from '../models/leak';
import { mockTechStaff } from '../models/techStaff';
import { mockSmartMeters, mockLoggers } from '../models/meterLogger';
import { mockWorkOrders } from '../models/workOrder';
import dmaData from '../Mock/dmaData.json';
import thermal1 from '../assets/images/Thermal-1.jpg';
import thermal2 from '../assets/images/thermal-2.jpg';
import thermal3 from '../assets/images/thermal-3.jpg';
import thermal4 from '../assets/images/thermal-4.jpeg';
import thermal5 from '../assets/images/thermal-5.jpeg';

// Colors for different severities
const leakColors: Record<string, string> = {
  high: '#e53935',
  medium: '#fb8c00',
  low: '#43a047',
};

// Options for severity filter
const severityOptions = [
  { value: 'all', label: 'All Severities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

// Convert JSON to DMARegion[] for filter bar
// Fix: ensure bounds is always number[][] (array of [lng,lat] pairs)
const dmaRegions = dmaData.map(
  (item: { dmaCode: string; geolocation: string }) => {
    let geo: { type: string; coordinates: number[][][] } = {
      type: '',
      coordinates: [],
    };
    try {
      geo = JSON.parse(item.geolocation);
    } catch {
      geo = { type: 'Polygon', coordinates: [] };
    }
    // geo.coordinates: number[][][] (Polygon)
    // Use first ring for bounds, or []
    const bounds =
      Array.isArray(geo.coordinates) && Array.isArray(geo.coordinates[0])
        ? geo.coordinates[0].filter(
            (c): c is [number, number] =>
              Array.isArray(c) &&
              c.length === 2 &&
              typeof c[0] === 'number' &&
              typeof c[1] === 'number',
          )
        : [];
    return {
      id: item.dmaCode,
      name: item.dmaCode,
      bounds, // always [number, number][]
      geojson: geo,
    };
  },
);

// Add DMA, tech staff, and popup support
interface DroneMapProps {
  dma?: string;
  showPopups?: boolean;
}

const DroneMap: React.FC<DroneMapProps> = ({
  dma: dmaProp = 'all',
  showPopups,
}) => {
  const theme = useTheme();
  const [dma, setDMA] = useState(dmaProp);
  // Drone selection state
  // const [selectedDroneId, setSelectedDroneId] = useState(mockDrones[0].id);
  const inflightDrones = mockDrones.filter((d) => d.status === 'active');
  const [selectedDroneId, setSelectedDroneId] = useState(
    inflightDrones[0]?.id || '',
  );
  const selectedDrone =
    inflightDrones.find((d) => d.id === selectedDroneId) || inflightDrones[0];

  // State for all drones (not just first two)
  const [dronePositions, setDronePositions] = useState(
    mockDrones.map((d) => d.position),
  );
  const [viewState, setViewState] = useState<ViewState>({
    longitude: mockDrones[0].position.lng,
    latitude: mockDrones[0].position.lat,
    zoom: 15,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const [severity, setSeverity] = useState('all');
  const [dateRange, setDateRange] = useState<{ from: Dayjs; to: Dayjs }>(
    () => ({ from: dayjs().subtract(14, 'day'), to: dayjs() }),
  );
  const [popup, setPopup] = useState<MapPopupType>(null);
  const [showMeters, setShowMeters] = useState(true);
  const [showLoggers, setShowLoggers] = useState(true);
  const [showWorkOrders, setShowWorkOrders] = useState(true);
  const [showTechStaffState, setShowTechStaff] = useState(true);
  const showTechStaff = showTechStaffState;
  const [openThermal, setOpenThermal] = useState<null | {
    src: string;
    idx: number;
  }>(null);
  // Add a state for notifications (simulate for demo)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'drone', message: 'Drone 1 is now in flight.', read: false },
    {
      id: 2,
      type: 'leak',
      message: 'Leak detected in North Zone (high).',
      read: false,
    },
    {
      id: 3,
      type: 'image',
      message: 'New thermal image uploaded by Drone 2.',
      read: true,
    },
  ]);
  const [showLegendPanel, setShowLegendPanel] = useState(true);
  const [showDronePaths, setShowDronePaths] = useState(false);
  // Simulated drone paths (for demo, each drone has a random path)
  const dronePaths = useMemo(
    () =>
      mockDrones.map((drone) => {
        // Generate a random path for each drone (10 points)
        const base = drone.position;
        return Array.from({ length: 10 }).map((_, i) => ({
          lng: base.lng + (Math.random() - 0.5) * 0.01 * i,
          lat: base.lat + (Math.random() - 0.5) * 0.01 * i,
        }));
      }),
    [],
  );

  // Simulate both drones' movement
  const [autoCenterOnDrone, setAutoCenterOnDrone] =
    React.useState<boolean>(true);
  const autoCenterOnDroneRef = React.useRef(autoCenterOnDrone);
  useEffect(() => {
    autoCenterOnDroneRef.current = autoCenterOnDrone;
  }, [autoCenterOnDrone]);
  useEffect(() => {
    const interval = setInterval(() => {
      setDronePositions((prev) =>
        prev.map((pos, idx) => {
          if (mockDrones[idx].status !== 'active') return pos;
          const next = {
            lng: pos.lng + (Math.random() - 0.5) * 0.001,
            lat: pos.lat + (Math.random() - 0.5) * 0.001,
          };
          // Only update viewState if autoCenterOnDrone is true
          if (idx === 0 && autoCenterOnDroneRef.current) {
            setViewState((vs) => ({
              ...vs,
              longitude: next.lng,
              latitude: next.lat,
            }));
          }
          return next;
        }),
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filter by DMA and severity
  const filteredLeaks = useMemo(
    () =>
      mockLeaksWithDMA.filter(
        (l) =>
          (dma === 'all' || l.dma === dma) &&
          (severity === 'all' || l.severity === severity),
      ),
    [dma, severity],
  );
  const filteredTechStaff = useMemo(
    () =>
      dma === 'all'
        ? mockTechStaff
        : mockTechStaff.filter((t) => t.dma === dma),
    [dma],
  );
  const filteredMeters = useMemo(
    () =>
      dma === 'all'
        ? mockSmartMeters
        : mockSmartMeters.filter((m) => m.dma === dma),
    [dma],
  );
  const filteredLoggers = useMemo(
    () =>
      dma === 'all' ? mockLoggers : mockLoggers.filter((l) => l.dma === dma),
    [dma],
  );
  const filteredWorkOrders = useMemo(
    () =>
      dma === 'all'
        ? mockWorkOrders
        : mockWorkOrders.filter((wo) => wo.dma === dma),
    [dma],
  );

  // Example: trigger a notification when a new drone is selected
  useEffect(() => {
    // Helper for Jira-style toast notification
    type ToastData =
      | { label: string }
      | { dma: string; severity: string }
      | { drone: string };

    const showToast = (type: 'drone' | 'leak' | 'image', data: ToastData) => {
      let icon: string, title: string, message: string, color: string;
      switch (type) {
        case 'drone':
          icon = '🛸';
          title = 'New Drone Inflight';
          message = `Drone ${
            (data as { label: string }).label
          } is now in flight.`;
          color = '#1976d2';
          break;
        case 'leak':
          icon = '💧';
          title = 'Leak Detected';
          message = `Leak detected in ${
            (data as { dma: string; severity: string }).dma
          } (${(data as { dma: string; severity: string }).severity}).`;
          color = '#e53935';
          break;
        case 'image':
          icon = '📷';
          title = 'Image Uploaded';
          message = `New thermal image uploaded by ${
            (data as { drone: string }).drone
          }.`;
          color = '#00c6ff';
          break;
        default:
          icon = 'ℹ️';
          title = 'Notification';
          message = '';
          color = '#232526';
      }
      toast(
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ fontSize: 28 }}>{icon}</Box>
          <Box>
            <Typography fontWeight={700} color={color} fontSize={16}>
              {title}
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              {message}
            </Typography>
          </Box>
        </Box>,
        {
          style: {
            borderLeft: `6px solid ${color}`,
            boxShadow: '0 2px 12px #23252622',
            background: '#fff',
            minWidth: 320,
            padding: '12px 18px',
          },
          icon: false,
          closeButton: true,
        },
      );
    };
    if (selectedDroneId) {
      const drone = mockDrones.find((d) => d.id === selectedDroneId);
      if (drone) {
        showToast('drone', { label: drone.label });
      }
    }
  }, [selectedDroneId]);

  // Handler to mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Remove selectedDMA state, use only dma for selection/highlight/zoom
  // const [selectedDMA, setSelectedDMA] = useState<string | null>(null);
  const [hoveredDMA, setHoveredDMA] = useState<string | null>(null);
  const [hoveredDMACoord, setHoveredDMACoord] = useState<
    [number, number] | null
  >(null);

  // Helper to get bounds for a DMA region
  // function getDmaBounds(dmaId: string) {
  //   const region = dmaRegions.find((d) => d.id === dmaId);
  //   if (!region || !region.bounds.length) return null;
  //   // region.bounds: number[][]
  //   const boundsArr: [number, number][] = Array.isArray(region.bounds)
  //     ? region.bounds.filter(
  //         (c): c is [number, number] =>
  //           Array.isArray(c) &&
  //           c.length === 2 &&
  //           typeof c[0] === 'number' &&
  //           typeof c[1] === 'number'
  //       )
  //     : [];
  //   const lats = boundsArr.map((c) => c[1]);
  //   const lngs = boundsArr.map((c) => c[0]);
  //   return [
  //     Math.min(...lngs),
  //     Math.min(...lats),
  //     Math.max(...lngs),
  //     Math.max(...lats),
  //   ];
  // }

  // Helper to get centroid for a DMA region
  function getDmaCentroid(dmaId: string): [number, number] | null {
    const region = dmaRegions.find((d) => d.id === dmaId);
    if (!region || !region.bounds.length) return null;
    const coords = (
      Array.isArray(region.bounds)
        ? region.bounds.filter(
            (c) =>
              Array.isArray(c) &&
              c.length === 2 &&
              typeof c[0] === 'number' &&
              typeof c[1] === 'number',
          )
        : []
    ) as [number, number][];
    const lats = coords.map((c) => c[1]);
    const lngs = coords.map((c) => c[0]);
    return [
      lngs.reduce((a: number, b: number) => a + b, 0) / lngs.length,
      lats.reduce((a: number, b: number) => a + b, 0) / lats.length,
    ];
  }

  // Always fly to DMA centroid when dma changes (and not 'all')
  useEffect(() => {
    if (dma && dma !== 'all') {
      const centroid = getDmaCentroid(dma);
      if (centroid) {
        setViewState((vs) => ({
          ...vs,
          longitude: centroid[0],
          latitude: centroid[1],
          zoom: 15,
          transitionDuration: 1200,
        }));
        setAutoCenterOnDrone(false);
      }
    } else if (dma === 'all' && dmaRegions.length > 0) {
      // Zoom out to fit all DMAs
      // Calculate bounding box for all DMA regions
      const allCoords = dmaRegions.flatMap((region) => region.bounds);
      if (allCoords.length > 0) {
        const lats = allCoords.map((c) => c[1]);
        const lngs = allCoords.map((c) => c[0]);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        // Center point
        const centerLat = (minLat + maxLat) / 2;
        const centerLng = (minLng + maxLng) / 2;
        // Estimate zoom level based on bounds (simple heuristic)
        // You may want to use a more accurate fitBounds util for production
        const latDiff = Math.abs(maxLat - minLat);
        const lngDiff = Math.abs(maxLng - minLng);
        let zoom = 10;
        if (latDiff < 0.1 && lngDiff < 0.1) zoom = 14;
        else if (latDiff < 0.5 && lngDiff < 0.5) zoom = 12;
        else if (latDiff < 1 && lngDiff < 1) zoom = 11;
        else if (latDiff < 2 && lngDiff < 2) zoom = 10;
        else zoom = 9;
        setViewState((vs) => ({
          ...vs,
          longitude: centerLng,
          latitude: centerLat,
          zoom,
          transitionDuration: 1200,
        }));
        setAutoCenterOnDrone(false);
      }
    }
  }, [dma]);

  // Sync local dma state with dmaProp from parent (Dashboard)
  useEffect(() => {
    setDMA(dmaProp);
  }, [dmaProp]);

  // Focus map on selected drone when selectedDroneId changes
  useEffect(() => {
    const drone = inflightDrones.find((d) => d.id === selectedDroneId);
    if (drone) {
      setViewState((vs) => ({
        ...vs,
        longitude: drone.position.lng,
        latitude: drone.position.lat,
        zoom: 16,
        transitionDuration: 1200,
      }));
      setAutoCenterOnDrone(false);
    }
  }, [selectedDroneId]);

  return (
    <Box
      sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: { xs: 0, sm: 2 } }}
    >
      {/* Drone Selector */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          px: { xs: 2, sm: 4 },
          py: 2,
          bgcolor: 'rgba(44,83,100,0.10)',
          borderRadius: 3,
          boxShadow: 3,
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <DroneSelect
          drones={inflightDrones}
          selectedDroneId={selectedDroneId}
          onChange={setSelectedDroneId}
          label="Drone"
          sx={{
            bgcolor: 'rgba(44,83,100,0.85)',
            borderRadius: 2,
            boxShadow: 2,
            minWidth: 180,
          }}
        />
        <DroneInfo drone={selectedDrone} />
      </Box>
      <DroneFilterBar
        severity={severity}
        setSeverity={setSeverity}
        dateRange={dateRange}
        setDateRange={setDateRange}
        dma={dma}
        setDMA={setDMA}
        dmaRegions={dmaRegions}
        showMeters={showMeters}
        setShowMeters={setShowMeters}
        showLoggers={showLoggers}
        setShowLoggers={setShowLoggers}
        showWorkOrders={showWorkOrders}
        setShowWorkOrders={setShowWorkOrders}
        showDronePaths={showDronePaths}
        setShowDronePaths={setShowDronePaths}
        showTechStaff={showTechStaff}
        setShowTechStaff={setShowTechStaff}
        severityOptions={severityOptions}
      />
      {/* Notification section */}
      <NotificationBar
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        color={theme.palette.text.secondary}
      />
      <Box
        sx={{
          height: { xs: '80vh', sm: '90vh', md: '95vh', lg: '98vh' }, // Increased height
          minHeight: 500, // Increased minHeight
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: 8,
          background: theme.palette.background.paper,
          position: 'relative',
        }}
      >
        <Map
          style={{ width: '100vw', height: '100%' }} // Increased width to full viewport
          viewState={
            viewState as unknown as ViewState & {
              width: number;
              height: number;
            }
          }
          onMove={(e: ViewStateChangeEvent) => {
            setViewState(e.viewState);
            setAutoCenterOnDrone(false); // Disable auto-center on user pan/zoom
          }}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={['dma-region-outline', 'dma-region-fill']}
          onClick={(e) => {
            const feature = e.features && e.features[0];
            if (feature && feature.properties && feature.properties.dmaCode) {
              const dmaId = feature.properties.dmaCode as string;
              setDMA(dmaId); // Sync filter bar and highlight
              // Smooth zoom to centroid
              const centroid = getDmaCentroid(dmaId);
              if (centroid) {
                setViewState((vs) => ({
                  ...vs,
                  longitude: centroid[0],
                  latitude: centroid[1],
                  zoom: 15, // or adjust as needed
                  transitionDuration: 1200,
                }));
                setAutoCenterOnDrone(false); // Disable auto-center on DMA click
              }
            }
          }}
          onMouseMove={(e) => {
            const feature = e.features && e.features[0];
            if (feature && feature.properties && feature.properties.dmaCode) {
              const dmaId = feature.properties.dmaCode as string;
              setHoveredDMA(dmaId);
              setHoveredDMACoord(getDmaCentroid(dmaId));
            } else {
              setHoveredDMA(null);
              setHoveredDMACoord(null);
            }
          }}
        >
          {/* DMA Regions Layer: outlines all DMAs, highlights selected */}
          <Source
            id="dma-regions"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: dmaRegions
                .filter((region) => region.bounds.length > 2) // Only polygons with at least 3 points
                .map((region) => ({
                  type: 'Feature',
                  properties: { dmaCode: region.id },
                  geometry: {
                    type: 'Polygon',
                    coordinates: [region.bounds],
                  },
                })),
            }}
          >
            {/* Fill for all DMAs, highlight selected */}
            <Layer
              id="dma-region-fill"
              type="fill"
              paint={{
                'fill-color': [
                  'case',
                  ['==', ['get', 'dmaCode'], dma],
                  theme.palette.primary.main,
                  '#b0bec5',
                ],
                'fill-opacity': [
                  'case',
                  ['==', ['get', 'dmaCode'], dma],
                  0.25,
                  0.08,
                ],
              }}
            />
            {/* Outline for all DMAs, highlight selected */}
            <Layer
              id="dma-region-outline"
              type="line"
              paint={{
                'line-color': [
                  'case',
                  ['==', ['get', 'dmaCode'], dma],
                  theme.palette.primary.main,
                  '#78909c',
                ],
                'line-width': ['case', ['==', ['get', 'dmaCode'], dma], 4, 2],
              }}
            />
          </Source>
          {/* DMA Tooltip Popup */}
          {hoveredDMA && hoveredDMACoord && (
            <Popup
              longitude={hoveredDMACoord[0]}
              latitude={hoveredDMACoord[1]}
              anchor="top"
              closeButton={false}
              closeOnClick={false}
              offset={16}
              style={{ pointerEvents: 'none' }}
            >
              <Typography
                fontWeight={700}
                color={theme.palette.primary.main}
                fontSize={15}
              >
                DMA: {hoveredDMA}
              </Typography>
            </Popup>
          )}
          {/* Render overlays after DMA region layers for correct z-order */}
          <DroneMarkers
            drones={mockDrones}
            dronePositions={dronePositions}
            selectedDroneId={selectedDroneId}
            onSelect={setSelectedDroneId}
            showPopups={showPopups}
            setPopup={(popup) => setPopup(popup as MapPopupType)}
          />
          <LeakMarkers
            leaks={filteredLeaks}
            leakColors={leakColors}
            showPopups={showPopups}
            setPopup={setPopup}
          />
          {showTechStaff && (
            <TechStaffMarkers
              staff={filteredTechStaff}
              showPopups={showPopups}
              setPopup={setPopup}
            />
          )}
          {showMeters && (
            <SmartMeterMarkers
              meters={filteredMeters}
              showPopups={showPopups}
              setPopup={setPopup}
            />
          )}
          {showLoggers && (
            <LoggerMarkers
              loggers={filteredLoggers}
              showPopups={showPopups}
              setPopup={setPopup}
            />
          )}
          {showWorkOrders && (
            <WorkOrderMarkers
              workOrders={filteredWorkOrders}
              showPopups={showPopups}
            />
          )}
          <DronePathLines
            show={showDronePaths}
            dronePaths={dronePaths}
            drones={mockDrones}
          />
          {/* Popups for details */}
          {showPopups && popup && (
            <Popup
              longitude={popup.lng}
              latitude={popup.lat}
              anchor="top"
              onClose={() => setPopup(null)}
              closeButton
              closeOnClick={false}
              maxWidth="260px"
            >
              <MapPopup popup={popup} theme={theme} />
            </Popup>
          )}
        </Map>
        {/* Overlay for legend and score */}
        <LegendPanel
          show={showLegendPanel}
          onClose={() => setShowLegendPanel(false)}
          showLoggers={showLoggers}
          showMeters={showMeters}
          showWorkOrders={showWorkOrders}
          showDronePaths={showDronePaths}
          filteredLeaks={filteredLeaks}
          workOrderTypes={WorkOrderType}
          drones={mockDrones}
        />
        {/* Legend panel toggle button (≡) */}
        {!showLegendPanel && (
          <LegendPanelToggle onClick={() => setShowLegendPanel(true)} />
        )}
      </Box>
      {/* Optionally, display drone-specific data below the map */}
      <DroneDetails
        drone={selectedDrone}
        openThermal={openThermal}
        setOpenThermal={setOpenThermal}
        thermalFallbacks={[thermal1, thermal2, thermal3, thermal4, thermal5]}
      />
      {/* Optionally, add a button to re-enable auto-centering */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        {!autoCenterOnDrone && (
          <button
            style={{
              background: theme.palette.primary.main,
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 14px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #23252622',
            }}
            onClick={() => setAutoCenterOnDrone(true)}
          >
            Re-center on Drone
          </button>
        )}
      </Box>
    </Box>
  );
};

const MAPBOX_TOKEN =
  'pk.eyJ1IjoianR5cmVtYW4iLCJhIjoiY2wzc2sycHozMHdyajNrcW9oY3pnMjNqcSJ9.IS58CjGaa1wLoxh58CFq-w';

export default DroneMap;
