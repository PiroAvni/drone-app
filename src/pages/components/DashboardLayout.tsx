import { Box, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        width: '100vw',
        minHeight: '100vh',
        maxWidth: '100vw',
        mx: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: theme.palette.background.default,
      }}
    >
      {children}
    </Box>
  );
};

export default DashboardLayout;
