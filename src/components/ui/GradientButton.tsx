import React from 'react';
import { Button, ButtonProps, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface GradientButtonProps extends ButtonProps {
  gradient?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  gradient = 'primary',
  children,
  ...props 
}) => {
  const theme = useTheme();

  const getGradient = () => {
    switch (gradient) {
      case 'primary':
        return theme.custom.gradients.primary;
      case 'secondary':
        return theme.custom.gradients.secondary;
      case 'success':
        return theme.custom.gradients.success;
      case 'error':
        return theme.custom.gradients.error;
      case 'warning':
        return theme.custom.gradients.warning;
      case 'info':
        return theme.custom.gradients.info;
      default:
        return theme.custom.gradients.primary;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        {...props}
        sx={{
          ...props.sx,
          background: getGradient(),
          color: 'white',
          border: 'none',
          boxShadow: theme.shadows[4],
          '&:hover': {
            background: getGradient(),
            boxShadow: theme.shadows[8],
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:disabled': {
            background: theme.palette.action.disabled,
            color: theme.palette.action.disabled,
            boxShadow: 'none',
          },
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default GradientButton;
