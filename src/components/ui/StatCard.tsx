import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  Chip,
  useTheme,
  alpha,
  SxProps,
  Theme,
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: {
    type: 'up' | 'down';
    label: string;
  };
  subtitle?: string;
  sx?: SxProps<Theme>;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  trend,
  subtitle,
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
        scale: 1.02, 
        boxShadow: theme.shadows[8],
        transition: { duration: 0.2 }
      }}
    >
      <Card 
        sx={{ 
          height: '100%',
          background: `linear-gradient(135deg, ${alpha(color, 0.05)} 0%, ${alpha(color, 0.02)} 100%)`,
          border: `1px solid ${alpha(color, 0.1)}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            background: `radial-gradient(circle, ${alpha(color, 0.1)} 0%, transparent 70%)`,
            transform: 'translate(30px, -30px)',
          },
          ...sx,
        }}
      >
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: alpha(color, 0.15),
                color,
                width: 48,
                height: 48,
                boxShadow: `0 4px 12px ${alpha(color, 0.2)}`,
              }}
            >
              {icon}
            </Avatar>
            {trend && (
              <Chip 
                label={trend.label} 
                size="small"
                color={trend.type === 'up' ? 'success' : 'error'}
                icon={trend.type === 'up' ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />}
                sx={{ 
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 28,
                }}
              />
            )}
          </Box>
          
          <Typography 
            variant="h3" 
            component="div" 
            fontWeight="bold" 
            sx={{ 
              mb: 0.5,
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${color} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {value}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 1,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {title}
          </Typography>
          
          {subtitle && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ opacity: 0.8 }}
            >
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
