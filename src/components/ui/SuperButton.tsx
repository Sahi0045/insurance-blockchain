import React from 'react';
import { Button, ButtonProps, Box, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

interface SuperButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'glow' | 'neon' | 'gradient';
  children: React.ReactNode;
  glowColor?: string;
}

const SuperButton: React.FC<SuperButtonProps> = ({ 
  variant = 'primary',
  children,
  glowColor,
  ...props 
}) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: theme.palette.primary.main,
          color: 'white',
          boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
          '&:hover': {
            background: theme.palette.primary.dark,
            boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
          },
        };
      case 'secondary':
        return {
          background: theme.palette.secondary.main,
          color: 'white',
          boxShadow: `0 4px 15px ${alpha(theme.palette.secondary.main, 0.4)}`,
          '&:hover': {
            background: theme.palette.secondary.dark,
            boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.6)}`,
          },
        };
      case 'glow':
        return {
          background: glowColor || theme.palette.primary.main,
          color: 'white',
          boxShadow: `0 0 20px ${glowColor || alpha(theme.palette.primary.main, 0.8)}`,
          '&:hover': {
            boxShadow: `0 0 30px ${glowColor || alpha(theme.palette.primary.main, 1)}`,
          },
        };
      case 'neon':
        return {
          background: 'transparent',
          color: glowColor || theme.palette.primary.main,
          border: `2px solid ${glowColor || theme.palette.primary.main}`,
          boxShadow: `0 0 10px ${glowColor || alpha(theme.palette.primary.main, 0.5)}`,
          '&:hover': {
            boxShadow: `0 0 20px ${glowColor || alpha(theme.palette.primary.main, 0.8)}`,
          },
        };
      case 'gradient':
        return {
          background: theme.custom.gradients.primary,
          color: 'white',
          boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
          '&:hover': {
            boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
          },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button
        {...props}
        sx={{
          ...getButtonStyles(),
          borderRadius: 2,
          px: 3,
          py: 1.5,
          fontWeight: 600,
          textTransform: 'none',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          ...props.sx,
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default SuperButton;
