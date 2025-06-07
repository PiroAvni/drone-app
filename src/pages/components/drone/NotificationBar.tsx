import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface NotificationBarProps {
  notifications: { read: boolean }[];
  onMarkAllAsRead: () => void;
  color?: string;
}

const NotificationBar: React.FC<NotificationBarProps> = ({
  notifications,
  onMarkAllAsRead,
  color,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      mb: 2,
    }}
  >
    <Typography fontWeight={700} color={color || 'text.secondary'}>
      Notifications
    </Typography>
    <IconButton
      aria-label='Mark all as read'
      color='primary'
      onClick={onMarkAllAsRead}
      disabled={notifications.every((n) => n.read)}
      sx={{ ml: 1 }}
    >
      <CheckCircleIcon />
    </IconButton>
  </Box>
);

export default NotificationBar;
