import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

interface NavigationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  icon,
  title,
  description,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 200 }}
      style={{ cursor: 'pointer', height: '100%' }}
      onClick={onClick}
    >
      <Card
        sx={{
          bgcolor: theme.palette.background.paper,
          borderRadius: 4,
          boxShadow: 8,
          minHeight: 180,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: 16,
            border: `2px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              mb: 2,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
          <Typography
            variant='h6'
            fontWeight={700}
            color={theme.palette.primary.main}
            mb={1}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.text.secondary,
              fontSize: 15,
              fontStyle: 'italic',
              mt: 1,
              borderRadius: 2,
              background: theme.palette.background.default,
            }}
          >
            {description}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NavigationCard;
