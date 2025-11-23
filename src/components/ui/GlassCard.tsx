import React from 'react';
import { Card, CardProps, Box, useTheme, alpha } from '@mui/material';

interface GlassCardProps extends CardProps {
  children: React.ReactNode;
  blur?: number;
  opacity?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  blur = 10, 
  opacity = 0.8,
  ...props 
}) => {
  const theme = useTheme();

  return (
    <Card
      {...props}
      sx={{
        ...props.sx,
        background: alpha(theme.palette.background.paper, opacity),
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.1)}`,
      }}
    >
      {children}
    </Card>
  );
};

export default GlassCard;
