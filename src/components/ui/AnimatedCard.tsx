import React from 'react';
import { Card, CardProps, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface AnimatedCardProps extends CardProps {
  children: React.ReactNode;
  delay?: number;
  hover?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  delay = 0, 
  hover = true,
  ...props 
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { 
        scale: 1.02, 
        boxShadow: theme.shadows[8],
        transition: { duration: 0.2 }
      } : undefined}
    >
      <Card
        {...props}
        sx={{
          ...props.sx,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: hover ? 'pointer' : 'default',
        }}
      >
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
