import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  useTheme,
  alpha,
  SxProps,
  Theme,
} from '@mui/material';
import { motion } from 'framer-motion';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  delay?: number;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  onClick,
  sx,
  delay = 0
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          cursor: 'pointer',
          background: theme.palette.background.paper,
          border: `2px solid ${alpha(color, 0.1)}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${alpha(color, 0.05)} 0%, transparent 100%)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            borderColor: color,
            boxShadow: `0 12px 24px ${alpha(color, 0.2)}`,
            '&::before': {
              opacity: 1,
            },
          },
          ...sx,
        }}
        onClick={onClick}
      >
        <CardContent sx={{ p: 3, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <Avatar sx={{ 
              bgcolor: alpha(color, 0.1), 
              color,
              width: 64, 
              height: 64, 
              mx: 'auto', 
              mb: 3,
              boxShadow: `0 8px 16px ${alpha(color, 0.2)}`,
              border: `2px solid ${alpha(color, 0.2)}`,
            }}>
              {icon}
            </Avatar>
          </motion.div>
          
          <Typography 
            variant="h6" 
            fontWeight="700" 
            sx={{ 
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${color} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickActionCard;
