import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Box, 
  Paper,
  Container,
  useTheme,
  alpha,
  Fade,
} from '@mui/material';
import { 
  Security,
  Description,
  Receipt,
  TrendingUp,
  LocalHospital,
  AccountBalance,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { useApp } from '../utils/context';
import { useRouter } from 'next/router';
import { mockInsuranceProducts, mockPolicies, mockClaims } from '../utils/mockData';
import StatCard from '../components/ui/StatCard';
import QuickActionCard from '../components/ui/QuickActionCard';
import ActivityFeed from '../components/ui/ActivityFeed';
import NotificationCard from '../components/ui/NotificationCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import HeroSection from '../components/ui/HeroSection';

const Dashboard = () => {
  const theme = useTheme();
  const { isWalletConnected, userProfile, connectWallet } = useApp();
  const router = useRouter();
  
  // For demonstration, we'll use mock data
  const [activePolicies, setActivePolicies] = useState(0);
  const [pendingClaims, setPendingClaims] = useState(0);
  const [totalPremiumPaid, setTotalPremiumPaid] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      if (isWalletConnected && userProfile) {
        // Count active policies
        const userPolicies = mockPolicies.filter(
          p => p.customer === userProfile.did && p.status === 'active'
        );
        setActivePolicies(userPolicies.length);
        
        // Calculate total premium paid
        const premium = userPolicies.reduce((sum, policy) => sum + policy.premium, 0);
        setTotalPremiumPaid(premium);
        
        // Count pending claims
        const userClaims = mockClaims.filter(
          c => c.customer === userProfile.did && c.status === 'pending'
        );
        setPendingClaims(userClaims.length);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isWalletConnected, userProfile]);
  
  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'payment' as const,
      title: 'Premium payment processed',
      description: 'Health insurance premium for December',
      amount: '+$250',
      timestamp: '2 hours ago',
      icon: <TrendingUp />,
      color: theme.palette.success.main,
    },
    {
      id: '2',
      type: 'policy' as const,
      title: 'Policy renewed',
      description: 'Auto insurance policy renewed for 6 months',
      timestamp: '1 day ago',
      icon: <Security />,
      color: theme.palette.primary.main,
    },
    {
      id: '3',
      type: 'claim' as const,
      title: 'Claim submitted',
      description: 'Medical claim for routine checkup',
      amount: '$150',
      timestamp: '3 days ago',
      icon: <Receipt />,
      color: theme.palette.warning.main,
    },
  ];
  
  // Mock notifications
  const notifications = [
    {
      id: '1',
      type: 'success' as const,
      title: 'Policy approved',
      message: 'Your health insurance application has been approved',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Payment due',
      message: 'Premium payment due in 3 days',
      timestamp: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'info' as const,
      title: 'New products available',
      message: 'Check out our new insurance products',
      timestamp: '1 day ago',
      read: true,
    },
  ];
  
  return (
    <Layout title="Dashboard">
      {!isWalletConnected ? (
        <HeroSection onConnectWallet={connectWallet} isWalletConnected={isWalletConnected} />
      ) : (
        <Fade in={isWalletConnected}>
          <Box>
            {loading && <LoadingSpinner message="Loading your dashboard..." />}
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Welcome back, {userProfile?.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Here's your insurance portfolio overview
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard 
                    title="Active Policies"
                    value={loading ? '...' : activePolicies}
                    icon={<Description />}
                    color={theme.palette.primary.main}
                    trend={{ type: 'up', label: '+2 this month' }}
                    subtitle="Insurance coverage"
                    delay={0.1}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard 
                    title="Pending Claims"
                    value={loading ? '...' : pendingClaims}
                    icon={<Receipt />}
                    color={theme.palette.warning.main}
                    trend={{ type: 'down', label: '-1 from last week' }}
                    subtitle="Awaiting review"
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard 
                    title="Total Premium"
                    value={loading ? '...' : `$${totalPremiumPaid.toLocaleString()}`}
                    icon={<TrendingUp />}
                    color={theme.palette.success.main}
                    trend={{ type: 'up', label: '+12% this year' }}
                    subtitle="Year to date"
                    delay={0.3}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard 
                    title="Coverage Score"
                    value="850"
                    icon={<Security />}
                    color={theme.palette.info.main}
                    trend={{ type: 'up', label: '+25 points' }}
                    subtitle="Excellent rating"
                    delay={0.4}
                  />
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="600">
                Quick Actions
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <QuickActionCard 
                    title="Browse Products"
                    description="Explore available insurance products"
                    icon={<LocalHospital />}
                    color={theme.palette.primary.main}
                    onClick={() => router.push('/products')}
                    delay={0.1}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <QuickActionCard 
                    title="File a Claim"
                    description="Submit a new insurance claim"
                    icon={<Receipt />}
                    color={theme.palette.warning.main}
                    onClick={() => router.push('/claims/new')}
                    delay={0.2}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <QuickActionCard 
                    title="View Policies"
                    description="Manage your active policies"
                    icon={<Description />}
                    color={theme.palette.success.main}
                    onClick={() => router.push('/policies')}
                    delay={0.3}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <QuickActionCard 
                    title="Bank Integration"
                    description="Connect with your bank"
                    icon={<AccountBalance />}
                    color={theme.palette.info.main}
                    onClick={() => router.push('/banks')}
                    delay={0.4}
                  />
                </Grid>
              </Grid>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ height: '100%', background: theme.palette.background.paper }}>
                  <ActivityFeed activities={activities} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ height: '100%', background: theme.palette.background.paper }}>
                  <NotificationCard notifications={notifications} />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      )}
    </Layout>
  );
};

export default Dashboard; 