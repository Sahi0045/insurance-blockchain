import React, { ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Tooltip,
  Avatar,
  useTheme,
  alpha,
  Fade,
  Badge,
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Dashboard, 
  Description, 
  LocalHospital, 
  AccountBalance, 
  Person,
  Receipt,
  Warning,
  Notifications,
  TrendingUp,
  Security,
  Settings,
} from '@mui/icons-material';
import { useApp } from '../utils/context';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Bank-Assurance DAPP' }) => {
  const theme = useTheme();
  const { 
    isWalletConnected, 
    connectWallet, 
    disconnectWallet, 
    userProfile, 
    isLoading, 
    error,
    isPhantomInstalled,
    wallet 
  } = useApp();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/', badge: null },
    { text: 'Insurance Products', icon: <LocalHospital />, path: '/products', badge: 'New' },
    { text: 'My Policies', icon: <Description />, path: '/policies', badge: null },
    { text: 'Claims', icon: <Receipt />, path: '/claims', badge: '2' },
    { text: 'Analytics', icon: <TrendingUp />, path: '/analytics', badge: null },
    { text: 'Security', icon: <Security />, path: '/security', badge: null },
    { text: 'Settings', icon: <Settings />, path: '/settings', badge: null },
  ];

  const handleWalletClick = async () => {
    try {
      if (isWalletConnected) {
        await disconnectWallet();
      } else {
        if (!isPhantomInstalled) {
          window.open('https://phantom.app/', '_blank');
        } else {
          await connectWallet();
        }
      }
    } catch (error) {
      console.error('Error handling wallet click:', error);
    }
  };

  const drawerContent = (
    <Box sx={{ width: 280, height: '100%', background: theme.palette.background.default }}>
      <Box sx={{ 
        p: 3, 
        background: theme.custom.gradients.primary,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: alpha('#FFFFFF', 0.1),
        }
      }}>
        <Typography variant="h5" component="div" fontWeight="bold" sx={{ mb: 1 }}>
          Bank-Assurance
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {userProfile ? userProfile.name : 'Not Connected'}
        </Typography>
        {isWalletConnected && wallet.publicKey && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: alpha('#FFFFFF', 0.2) }}>
              <Person sx={{ fontSize: 18 }} />
            </Avatar>
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                Wallet Address
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: 'monospace' }} noWrap>
                {wallet.publicKey.toString().substring(0, 8)}...
                {wallet.publicKey.toString().substring(wallet.publicKey.toString().length - 8)}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Divider sx={{ borderColor: theme.palette.divider }} />
      <List sx={{ py: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => {
              router.push(item.path);
              toggleDrawer();
            }}
            selected={router.pathname === item.path}
            sx={{
              mx: 2,
              my: 0.5,
              borderRadius: 2,
              '&.Mui-selected': {
                background: alpha(theme.palette.primary.main, 0.08),
                color: theme.palette.primary.main,
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.12),
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
              '&:hover': {
                background: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.badge ? (
                <Badge badgeContent={item.badge} color="primary" overlap="circular">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontWeight: router.pathname === item.path ? 600 : 400,
                fontSize: '0.875rem',
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ borderColor: theme.palette.divider }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          Network: Solana Devnet
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Version: 1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 32, 
              height: 32, 
              borderRadius: 1, 
              background: theme.custom.gradients.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1
            }}>
              <Security sx={{ color: 'white', fontSize: 18 }} />
            </Box>
            <Typography variant="h6" component="div" fontWeight="600" color="inherit">
              {title}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isPhantomInstalled && (
              <Fade in={!isPhantomInstalled}>
                <Tooltip title="Phantom wallet is not installed">
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    background: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.dark,
                  }}>
                    <Warning sx={{ fontSize: 18, mr: 1 }} />
                    <Typography variant="body2" fontWeight="500" sx={{ display: { xs: 'none', sm: 'block' } }}>
                      Phantom not installed
                    </Typography>
                  </Box>
                </Tooltip>
              </Fade>
            )}
            
            {isWalletConnected && wallet.publicKey && (
              <Fade in={isWalletConnected}>
                <Box>
                  <Chip 
                    avatar={<Avatar sx={{ width: 24, height: 24, bgcolor: theme.palette.primary.main }}>
                      <Person sx={{ fontSize: 14 }} />
                    </Avatar>}
                    label={`${wallet.publicKey.toString().substring(0, 4)}...${wallet.publicKey.toString().substring(wallet.publicKey.toString().length - 4)}`}
                    variant="outlined"
                    size="small"
                    sx={{ 
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '& .MuiChip-label': {
                        fontWeight: 500,
                        fontFamily: 'monospace',
                      },
                    }}
                  />
                </Box>
              </Fade>
            )}
            
            <Button 
              variant={isWalletConnected ? "outlined" : "contained"}
              onClick={handleWalletClick}
              disabled={!isPhantomInstalled && isWalletConnected}
              startIcon={!isWalletConnected && <Security />}
              sx={{
                borderRadius: 2,
                px: 2.5,
                py: 1,
                fontWeight: 500,
                boxShadow: isWalletConnected ? 'none' : theme.shadows[2],
                '&:hover': {
                  boxShadow: isWalletConnected ? 'none' : theme.shadows[4],
                  transform: isWalletConnected ? 'none' : 'translateY(-1px)',
                },
              }}
            >
              {isWalletConnected 
                ? 'Disconnect' 
                : isPhantomInstalled 
                  ? 'Connect Wallet' 
                  : 'Install Phantom'
              }
            </Button>
            
            <IconButton 
              size="small"
              sx={{ 
                ml: 1,
                color: theme.palette.text.secondary,
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.08),
                  color: theme.palette.primary.main,
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 280,
            borderRight: `1px solid ${theme.palette.divider}`,
          }
        }}
      >
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, pt: 12, pb: 3, minHeight: '100vh' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          <Fade in={!isLoading}>
            <Box>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3, 
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                      fontWeight: 500,
                    },
                  }}
                >
                  {error}
                </Alert>
              )}
              
              {!isPhantomInstalled && !isWalletConnected && (
                <Alert 
                  severity="warning" 
                  sx={{ 
                    mb: 3, 
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                      fontWeight: 500,
                    },
                  }}
                  action={
                    <Button 
                      size="small" 
                      variant="outlined"
                      href="https://phantom.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Install
                    </Button>
                  }
                >
                  Phantom wallet is not installed. Install Phantom to use all features.
                </Alert>
              )}
              
              {isLoading ? (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: 400,
                  gap: 2,
                }}>
                  <CircularProgress size={40} thickness={4} />
                  <Typography variant="body2" color="text.secondary">
                    Loading application...
                  </Typography>
                </Box>
              ) : (
                children
              )}
            </Box>
          </Fade>
        </Container>
      </Box>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          mt: 'auto',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Bank-Assurance DAPP on Solana Blockchain
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography variant="body2" color="text.secondary" component="a" href="#" sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
                Terms
              </Typography>
              <Typography variant="body2" color="text.secondary" component="a" href="#" sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
                Privacy
              </Typography>
              <Typography variant="body2" color="text.secondary" component="a" href="#" sx={{ textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
                Support
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 