import React from 'react';
import { Paper, Typography, Box, Divider, Stack } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export type ThemeMode = 'modern' | 'classic' | 'dark' | 'orange' | 'green';

interface SettingsProps {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const themeOptions = [
  {
    value: 'modern',
    label: 'Modern (Blue/Grey)',
    desc: 'A sleek, modern look with blue and grey tones.',
    icon: <PaletteIcon sx={{ color: '#2196f3', mr: 1 }} />,
    preview: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
  },
  {
    value: 'classic',
    label: 'Classic (Teal/Blue)',
    desc: 'Classic dashboard colors with teal and blue.',
    icon: <Brightness7Icon sx={{ color: '#00c6ff', mr: 1 }} />,
    preview: 'linear-gradient(90deg, #0f2027 0%, #2c5364 100%)',
  },
  {
    value: 'dark',
    label: 'Dark',
    desc: 'Minimal, high-contrast dark mode.',
    icon: <Brightness4Icon sx={{ color: '#607d8b', mr: 1 }} />,
    preview: 'linear-gradient(90deg, #181a1b 0%, #232526 100%)',
  },
  {
    value: 'orange',
    label: 'Orange & Dark Gray',
    desc: 'Energetic orange with dark gray for focus.',
    icon: <PaletteIcon sx={{ color: '#ff9800', mr: 1 }} />,
    preview: 'linear-gradient(90deg, #232526 0%, #2c2c2c 100%)',
  },
  {
    value: 'green',
    label: 'Green & Gray',
    desc: 'Fresh green with modern gray backgrounds.',
    icon: <PaletteIcon sx={{ color: '#43a047', mr: 1 }} />,
    preview: 'linear-gradient(90deg, #232526 0%, #263238 100%)',
  },
];

const Settings: React.FC<SettingsProps> = ({ themeMode, setThemeMode }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) => theme.palette.background.default,
        py: { xs: 2, sm: 4, md: 6 },
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <Paper
        sx={{
          p: 4,
          mx: 'auto',
          mt: 6,
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <Typography variant='h5' fontWeight={700} mb={2}>
          Theme Settings
        </Typography>
        <Typography variant='body1' mb={3}>
          Choose your preferred dashboard theme. Your selection will be applied
          instantly.
        </Typography>
        <Stack spacing={2}>
          {themeOptions.map((opt) => (
            <Box
              key={opt.value}
              onClick={() => setThemeMode(opt.value as ThemeMode)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                cursor: 'pointer',
                border:
                  themeMode === opt.value
                    ? '2px solid #2196f3'
                    : '2px solid transparent',
                background: opt.preview,
                boxShadow: themeMode === opt.value ? 6 : 1,
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 8,
                  borderColor: '#2196f3',
                },
              }}
            >
              {opt.icon}
              <Box>
                <Typography fontWeight={600} color='#fff'>
                  {opt.label}
                </Typography>
                <Typography variant='body2' color='#b0bec5'>
                  {opt.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Typography variant='caption' color='#b0bec5'>
          Tip: You can always change your theme here for a different look and
          feel.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings;
