import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  useTheme,
  alpha,
  Chip,
  IconButton,
} from '@mui/material';
import { 
  Notifications,
  CheckCircle,
  Warning,
  Info,
  Error,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface NotificationItem {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationCardProps {
  notifications: NotificationItem[];
  title?: string;
  maxItems?: number;
  onDismiss?: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ 
  notifications, 
  title = 'Notifications',
  maxItems = 3,
  onDismiss
}) => {
  const theme = useTheme();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle />;
      case 'warning':
        return <Warning />;
      case 'info':
        return <Info />;
      case 'error':
        return <Error />;
      default:
        return <Notifications />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      case 'error':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return alpha(theme.palette.success.main, 0.1);
      case 'warning':
        return alpha(theme.palette.warning.main, 0.1);
      case 'info':
        return alpha(theme.palette.info.main, 0.1);
      case 'error':
        return alpha(theme.palette.error.main, 0.1);
      default:
        return alpha(theme.palette.primary.main, 0.1);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="700" color="text.primary">
          {title}
        </Typography>
        {notifications.filter(n => !n.read).length > 0 && (
          <Chip 
            label={notifications.filter(n => !n.read).length}
            size="small"
            color="primary"
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {notifications.slice(0, maxItems).map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: 2,
              p: 2.5,
              borderRadius: 2,
              background: notification.read ? alpha(theme.palette.background.paper, 0.5) : getNotificationBgColor(notification.type),
              border: `1px solid ${alpha(getNotificationColor(notification.type), notification.read ? 0.1 : 0.2)}`,
              position: 'relative',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: getNotificationBgColor(notification.type),
                transform: 'translateX(4px)',
              },
            }}>
              {!notification.read && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 4,
                    height: '100%',
                    backgroundColor: getNotificationColor(notification.type),
                    borderRadius: '4px 0 0 4px',
                  }}
                />
              )}
              
              <Avatar 
                sx={{ 
                  bgcolor: alpha(getNotificationColor(notification.type), 0.15),
                  color: getNotificationColor(notification.type),
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                }}
              >
                {getNotificationIcon(notification.type)}
              </Avatar>
              
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography 
                  variant="body2" 
                  fontWeight={notification.read ? 500 : 600} 
                  color="text.primary"
                  sx={{ mb: 0.5 }}
                >
                  {notification.title}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    display: 'block',
                    lineHeight: 1.4,
                    mb: 1,
                  }}
                >
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                  {notification.timestamp}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
                {onDismiss && (
                  <IconButton
                    size="small"
                    onClick={() => onDismiss(notification.id)}
                    sx={{ 
                      color: theme.palette.text.secondary,
                      '&:hover': { color: theme.palette.text.primary },
                    }}
                  >
                    <Close sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default NotificationCard;
