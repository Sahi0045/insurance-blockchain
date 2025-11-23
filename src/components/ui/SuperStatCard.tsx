import React, { useState } from 'react';
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
import { TrendingUp, TrendingDown, Sparkles } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface SuperStatCardProps {
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
  animated?: boolean;
}

const SuperStatCard: React.FC<SuperStatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  trend,
  subtitle,
  sx,
  delay = 0,
  animated = true
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        rotateX: -5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          background: isHovered 
            ? `linear-gradient(135deg, ${alpha(color, 0.15)} 0%, ${alpha(color, 0.05)} 100%)`
            : `linear-gradient(135deg, ${alpha(color, 0.05)} 0%, ${alpha(color, 0.02)} 100%)`,
          border: `2px solid ${alpha(color, isHovered ? 0.3 : 0.1)}`,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isHovered 
            ? `0 20px 40px ${alpha(color, 0.3)}, 0 0 60px ${alpha(color, 0.1)}`
            : `0 8px 32px ${alpha(color, 0.1)}`,
          ...sx,
        }}
      >
        {/* Animated background effect */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '150px',
            height: '150px',
            background: `radial-gradient(circle, ${alpha(color, 0.2)} 0%, transparent 70%)`,
            transform: 'translate(50%, -50%)',
          }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
            rotate: isHovered ? [0, 180, 360] : [0, 90, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                rotate: isHovered ? [0, 10, -10, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 1,
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: alpha(color, 0.15),
                  color,
                  width: 56,
                  height: 56,
                  boxShadow: `0 8px 24px ${alpha(color, 0.3)}`,
                  border: `2px solid ${alpha(color, 0.2)}`,
                }}
              >
                {icon}
              </Avatar>
            </motion.div>
            
            {trend && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.2 }}
              >
                <Chip 
                  label={trend.label} 
                  size="small"
                  color={trend.type === 'up' ? 'success' : 'error'}
                  icon={trend.type === 'up' ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />}
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 28,
                    boxShadow: `0 4px 12px ${alpha(trend.type === 'up' ? theme.palette.success.main : theme.palette.error.main, 0.3)}`,
                  }}
                />
              </motion.div>
            )}
          </Box>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.1 }}
          >
            <Typography 
              variant="h2" 
              component="div" 
              fontWeight="bold" 
              sx={{ 
                mb: 1,
                background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${color} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '2.5rem',
              }}
            >
              {animated ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: delay + 0.3 }}
                >
                  {value}
                </motion.span>
              ) : (
                value
              )}
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 1,
                fontWeight: 600,
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
                sx={{ 
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Sparkles sx={{ fontSize: 14, color }} />
                {subtitle}
              </Typography>
            )}
          </motion.div>
        </CardContent>

        {/* Floating particles effect */}
        {isHovered && animated && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: color,
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -30, -60],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}
          </>
        )}
      </Card>
    </motion.div>
  );
};

export default SuperStatCard;
