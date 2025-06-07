import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Switch,
} from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Theme } from '@mui/material/styles';
import type { Notification as AppNotification } from '../../App';

// Use AppNotification directly for type compatibility

type Notification = AppNotification;

interface NavBarProps {
  unreadCount: number;
  anchorEl: HTMLElement | null;
  handleBellClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleBellClose: () => void;
  filteredNotifications: Notification[];
  markAsRead: (id: number) => void;
  showAll: boolean;
  setShowAll: (v: (prev: boolean) => boolean) => void;
  visibleNotifications: Notification[];
  showUnreadOnly: boolean;
  setShowUnreadOnly: (v: (prev: boolean) => boolean) => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  theme: Theme;
}

const NavBar: React.FC<NavBarProps> = ({
  unreadCount,
  anchorEl,
  handleBellClick,
  handleBellClose,
  filteredNotifications,
  markAsRead,
  showAll,
  setShowAll,
  visibleNotifications,
  showUnreadOnly,
  setShowUnreadOnly,
  setNotifications,
  theme,
}) => (
  <AppBar
    position='sticky'
    color='default'
    elevation={4}
    sx={{
      background: theme.palette.background.paper,
      backdropFilter: 'blur(10px)',
      borderBottom: `1.5px solid ${theme.palette.divider}`,
      boxShadow: 3,
      //   width: '100vw',
      left: 0,
      zIndex: 1201,
      transition: 'background 0.3s',
    }}
    component={motion.header}
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7 }}
  >
    <Toolbar
      sx={{
        justifyContent: 'space-between',
        width: '100%',
        // maxWidth: '100vw',
        mx: 'auto',
        minHeight: 72,
        px: { xs: 1, sm: 3 },
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <WaterDropIcon
          fontSize='large'
          color='primary'
          sx={{ filter: 'drop-shadow(0 2px 6px #1976d233)' }}
        />
        <Typography
          variant='h6'
          fontWeight={700}
          sx={{ letterSpacing: 1, color: theme.palette.text.primary }}
        >
          Water Leak Dashboard
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', gap: { xs: 0.5, sm: 2 }, alignItems: 'center' }}
      >
        <Button
          component={Link}
          to='/'
          color='inherit'
          startIcon={<HomeIcon />}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            py: 1,
            transition: 'background 0.2s',
            '&:hover': {
              background: '#e3f2fd',
              color: '#1976d2',
            },
          }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to='/dashboard'
          color='inherit'
          startIcon={<DashboardIcon />}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            py: 1,
            transition: 'background 0.2s',
            '&:hover': {
              background: '#e3f2fd',
              color: '#1976d2',
            },
          }}
        >
          Dashboard
        </Button>
        <Button
          component={Link}
          to='/analytics'
          color='inherit'
          startIcon={<AnalyticsIcon />}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            py: 1,
            transition: 'background 0.2s',
            '&:hover': {
              background: '#e3f2fd',
              color: '#1976d2',
            },
          }}
        >
          Analytics
        </Button>
        <Button
          component={Link}
          to='/live-drone-feed'
          color='inherit'
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            py: 1,
            transition: 'background 0.2s',
            '&:hover': {
              background: '#e3f2fd',
              color: '#1976d2',
            },
          }}
        >
          Live Drone Feed
        </Button>
        <Button
          component={Link}
          to='/leak-heatmap'
          color='inherit'
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            py: 1,
            transition: 'background 0.2s',
            '&:hover': {
              background: '#e3f2fd',
              color: '#1976d2',
            },
          }}
        >
          Leak Heatmap
        </Button>
        <Button
          component={Link}
          to='/settings'
          color='inherit'
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            py: 1,
            transition: 'background 0.2s',
            '&:hover': {
              background: '#e3f2fd',
              color: '#1976d2',
            },
          }}
        >
          Settings
        </Button>
        {/* Notification Bell */}
        <IconButton
          color='inherit'
          onClick={handleBellClick}
          sx={{
            mr: 1,
            borderRadius: 2,
            transition: 'background 0.2s',
            '&:hover': {
              background: '#e3f2fd',
            },
            boxShadow: unreadCount > 0 ? '0 0 0 2px #1976d2' : undefined,
          }}
        >
          <Badge badgeContent={unreadCount} color='error' overlap='circular'>
            <NotificationsIcon sx={{ fontSize: 28 }} />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleBellClose}
          PaperProps={{
            sx: {
              minWidth: 340,
              borderRadius: 3,
              boxShadow: 8,
              mt: 1.5,
              p: 0,
              background: '#fff',
              maxHeight: 480,
            },
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              borderBottom: '1px solid #eee',
              fontWeight: 700,
              color: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f5faff',
            }}
          >
            <span>Notifications</span>
            <Button
              size='small'
              color='primary'
              variant='text'
              sx={{
                fontWeight: 700,
                textTransform: 'none',
                ml: 1,
                minWidth: 0,
                p: 0,
              }}
              disabled={unreadCount === 0}
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((n) => (n.read ? n : { ...n, read: true }))
                )
              }
            >
              Mark all as read
            </Button>
          </Box>
          <Box
            sx={{
              px: 2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderBottom: '1px solid #eee',
              background: '#f5faff',
            }}
          >
            <Switch
              size='small'
              checked={showUnreadOnly}
              onChange={() => setShowUnreadOnly((v) => !v)}
              color='primary'
            />
            <Typography fontSize={14} color='#1976d2' fontWeight={600}>
              Show unread only
            </Typography>
          </Box>
          {filteredNotifications.length === 0 && (
            <MenuItem disabled sx={{ py: 2, color: '#888' }}>
              No notifications
            </MenuItem>
          )}
          {filteredNotifications.map((n) => (
            <MenuItem
              key={n.id}
              sx={{
                alignItems: 'flex-start',
                gap: 1.5,
                py: 1.5,
                bgcolor: n.read ? '#fff' : '#e3f2fd',
                borderLeft: n.read
                  ? '4px solid transparent'
                  : '4px solid #1976d2',
                transition: 'background 0.2s',
                '&:hover': {
                  background: n.read ? '#f5faff' : '#bbdefb',
                },
              }}
              onClick={() => {
                markAsRead(n.id);
                handleBellClose();
              }}
            >
              <Box sx={{ fontSize: 22, mt: 0.2 }}>
                {n.type === 'drone' && '🛸'}
                {n.type === 'leak' && '💧'}
                {n.type === 'image' && '📷'}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  fontWeight={n.read ? 500 : 700}
                  color='#232526'
                  fontSize={15}
                >
                  {n.message}
                  {!n.read && (
                    <Box
                      component='span'
                      sx={{
                        display: 'inline-block',
                        ml: 1,
                        width: 8,
                        height: 8,
                        bgcolor: '#1976d2',
                        borderRadius: '50%',
                        verticalAlign: 'middle',
                        boxShadow: '0 0 4px #1976d2',
                      }}
                    />
                  )}
                </Typography>
                <Typography fontSize={12} color='#888' mt={0.5}>
                  {n.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
          {visibleNotifications.length > 5 && (
            <MenuItem
              onClick={() => setShowAll((v) => !v)}
              sx={{
                justifyContent: 'center',
                fontWeight: 700,
                color: '#1976d2',
                borderTop: '1px solid #eee',
                py: 1.5,
                background: '#f5faff',
                transition: 'background 0.2s',
                '&:hover': {
                  background: '#e3f2fd',
                },
              }}
            >
              {showAll ? 'Show less' : 'Show more'}
            </MenuItem>
          )}
        </Menu>
      </Box>
    </Toolbar>
  </AppBar>
);

export default NavBar;
