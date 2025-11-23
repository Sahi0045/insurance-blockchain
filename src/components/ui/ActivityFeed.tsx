import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  useTheme,
  alpha,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import { 
  TrendingUp,
  Receipt,
  Security,
  LocalHospital,
  AccountBalance,
  MoreVert,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface ActivityItem {
  id: string;
  type: 'payment' | 'claim' | 'policy' | 'product' | 'bank';
  title: string;
  description: string;
  amount?: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  maxItems?: number;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  activities, 
  title = 'Recent Activity',
  maxItems = 5 
}) => {
  const theme = useTheme();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <TrendingUp />;
      case 'claim':
        return <Receipt />;
      case 'policy':
        return <Security />;
      case 'product':
        return <LocalHospital />;
      case 'bank':
        return <AccountBalance />;
      default:
        return <Security />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'payment':
        return theme.palette.success.main;
      case 'claim':
        return theme.palette.warning.main;
      case 'policy':
        return theme.palette.primary.main;
      case 'product':
        return theme.palette.info.main;
      case 'bank':
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Paper sx={{ p: 3, height: '100%', background: theme.palette.background.paper }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="700" color="text.primary">
          {title}
        </Typography>
        <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
          <MoreVert />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {activities.slice(0, maxItems).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              {/* Timeline Dot */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 1 }}>
                <Avatar
                  sx={{
                    backgroundColor: getActivityColor(activity.type),
                    boxShadow: `0 0 0 4px ${alpha(getActivityColor(activity.type), 0.1)}`,
                    width: 32,
                    height: 32,
                    zIndex: 1,
                  }}
                >
                  <Box sx={{ fontSize: 16, color: 'white' }}>
                    {getActivityIcon(activity.type)}
                  </Box>
                </Avatar>
                {index < activities.slice(0, maxItems).length - 1 && (
                  <Box
                    sx={{
                      width: 2,
                      height: 40,
                      backgroundColor: alpha(theme.palette.divider, 0.5),
                      mt: 1,
                    }}
                  />
                )}
              </Box>

              {/* Content */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  background: alpha(getActivityColor(activity.type), 0.05),
                  border: `1px solid ${alpha(getActivityColor(activity.type), 0.1)}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: alpha(getActivityColor(activity.type), 0.1),
                    transform: 'translateX(4px)',
                  },
                }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="600" color="text.primary">
                      {activity.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      {activity.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                      {activity.timestamp}
                    </Typography>
                  </Box>
                  {activity.amount && (
                    <Typography
                      variant="body2"
                      fontWeight="700"
                      color={activity.type === 'payment' ? 'success.main' : 'text.primary'}
                    >
                      {activity.amount}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Paper>
  );
};

export default ActivityFeed;
