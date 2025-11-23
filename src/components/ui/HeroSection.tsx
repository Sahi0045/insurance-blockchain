import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  useTheme,
  alpha,
  Container,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Security, TrendingUp, Shield, Speed } from '@mui/icons-material';
import GradientButton from './GradientButton';

interface HeroSectionProps {
  onConnectWallet: () => void;
  isWalletConnected: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onConnectWallet, isWalletConnected }) => {
  const theme = useTheme();

  const features = [
    {
      icon: <Security />,
      title: 'Secure',
      description: 'Bank-grade security with blockchain technology',
    },
    {
      icon: <TrendingUp />,
      title: 'Transparent',
      description: 'All transactions visible on the blockchain',
    },
    {
      icon: <Shield />,
      title: 'Insured',
      description: 'Comprehensive insurance coverage options',
    },
    {
      icon: <Speed />,
      title: 'Fast',
      description: 'Instant settlements and claims processing',
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 4, md: 8 },
        textAlign: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        mb: 6,
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: alpha('#FFFFFF', 0.1),
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: alpha('#FFFFFF', 0.05),
        }}
      />
      
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: alpha('#FFFFFF', 0.2),
                mx: 'auto',
                mb: 4,
                boxShadow: `0 8px 32px ${alpha('#000000', 0.2)}`,
              }}
            >
              <Security sx={{ fontSize: 50 }} />
            </Avatar>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 3,
              }}
            >
              Welcome to Bank-Assurance
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography
              variant="h5"
              sx={{
                opacity: 0.9,
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              A decentralized platform connecting banks and insurance providers on the Solana blockchain. 
              Secure, transparent, and efficient insurance management for the modern world.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
              <GradientButton
                gradient="primary"
                size="large"
                onClick={onConnectWallet}
                startIcon={<Security />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: alpha('#FFFFFF', 0.9),
                  },
                }}
              >
                Connect Wallet
              </GradientButton>
              <GradientButton
                gradient="secondary"
                size="large"
                href="https://phantom.app/"
                target="_blank"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    background: alpha('#FFFFFF', 0.1),
                  },
                }}
              >
                Install Phantom
              </GradientButton>
            </Box>
          </motion.div>

          <Grid container spacing={4} sx={{ mt: 6 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: alpha('#FFFFFF', 0.2),
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Paper>
  );
};

export default HeroSection;
