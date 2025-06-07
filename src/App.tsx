import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import appRoutes from './routes';
import Settings from './pages/Settings';
import NavBar from './pages/components/NavBar';
import DashboardLayout from './pages/components/DashboardLayout';

import './App.css';

// Define ThemeMode type for themeMode state
export type ThemeMode = 'modern' | 'classic' | 'dark' | 'orange' | 'green';

// Notification type for strict typing
export type Notification = {
  id: number;
  type: 'drone' | 'leak' | 'image';
  message: string;
  time: string;
  date: Date;
  read: boolean;
};

function App() {
  // Theme state with localStorage persistence
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('themeMode');
    return (stored as ThemeMode) || 'modern';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Predefined color themes
  const theme = useMemo(() => {
    switch (themeMode) {
      case 'orange':
        return createTheme({
          palette: {
            mode: 'dark',
            primary: { main: '#ff9800' },
            background: { default: '#232526', paper: '#2c2c2c' },
            text: { primary: '#fff3e0' },
          },
        });
      case 'green':
        return createTheme({
          palette: {
            mode: 'dark',
            primary: { main: '#43a047' },
            background: { default: '#232526', paper: '#263238' },
            text: { primary: '#e8f5e9' },
          },
        });
      case 'modern':
        return createTheme({
          palette: {
            mode: 'dark',
            primary: { main: '#2196f3' },
            background: { default: '#232526', paper: '#414345' },
            text: { primary: '#b0bec5' },
          },
        });
      case 'classic':
        return createTheme({
          palette: {
            mode: 'dark',
            primary: { main: '#00c6ff' },
            background: { default: '#0f2027', paper: '#2c5364' },
            text: { primary: '#f8fafc' },
          },
        });
      case 'dark':
        return createTheme({
          palette: {
            mode: 'dark',
            primary: { main: '#000' },
            background: { default: '#121212', paper: '#1e1e1e' },
            text: { primary: '#e0e0e0' },
          },
        });
      default:
        return createTheme();
    }
  }, [themeMode]);

  // Notification bell state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // Demo: notifications with read/unread and timestamp
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'drone',
      message: 'Drone 1 is now in flight.',
      time: 'Just now',
      date: new Date(),
      read: false,
    },
    {
      id: 2,
      type: 'leak',
      message: 'Leak detected in North Zone (high).',
      time: '2 min ago',
      date: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
    },
    {
      id: 3,
      type: 'image',
      message: 'New thermal image uploaded by Drone 2.',
      time: '5 min ago',
      date: new Date(Date.now() - 5 * 60 * 1000),
      read: true,
    },
    // ...more demo notifications...
  ]);
  const [showAll, setShowAll] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  // Filter for last 10 days
  const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
  const visibleNotifications = notifications
    .filter((n) => n.date >= tenDaysAgo)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayNotifications = showAll
    ? visibleNotifications
    : visibleNotifications.slice(0, 5);
  const filteredNotifications = showUnreadOnly
    ? displayNotifications.filter((n) => !n.read)
    : displayNotifications;
  const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleBellClose = () => {
    setAnchorEl(null);
  };
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Replace AppBar/Toolbar with NavBar */}
        <NavBar
          unreadCount={unreadCount}
          anchorEl={anchorEl}
          handleBellClick={handleBellClick}
          handleBellClose={handleBellClose}
          filteredNotifications={filteredNotifications}
          markAsRead={markAsRead}
          showAll={showAll}
          setShowAll={setShowAll}
          visibleNotifications={visibleNotifications}
          showUnreadOnly={showUnreadOnly}
          setShowUnreadOnly={setShowUnreadOnly}
          setNotifications={setNotifications}
          theme={theme}
        />
        <DashboardLayout>
          <Container maxWidth="xl" sx={{ flex: 1, py: 3 }}>
            <Routes>
              {appRoutes}
              <Route
                path="/settings"
                element={
                  <Settings themeMode={themeMode} setThemeMode={setThemeMode} />
                }
              />
            </Routes>
          </Container>
        </DashboardLayout>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 14000 }}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
