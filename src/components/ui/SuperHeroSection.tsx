import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  useTheme,
  alpha,
  Container,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Security, 
  TrendingUp, 
  Shield, 
  Speed,
  ArrowForward,
  PlayArrow,
  Star,
} from '@mui/icons-material';
import ThreeBackground from './ThreeBackground';
import SuperButton from './SuperButton';

interface SuperHeroSectionProps {
  onConnectWallet: () => void;
  isWalletConnected: boolean;
}

const SuperHeroSection: React.FC<SuperHeroSectionProps> = ({ onConnectWallet, isWalletConnected }) => {
  const theme = useTheme();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <Security />,
      title: 'Secure',
      description: 'Bank-grade security with blockchain technology',
      color: theme.palette.primary.main,
    },
    {
      icon: <TrendingUp />,
      title: 'Transparent',
      description: 'All transactions visible on the blockchain',
      color: theme.palette.secondary.main,
    },
    {
      icon: <Shield />,
      title: 'Insured',
      description: 'Comprehensive insurance coverage options',
      color: theme.palette.success.main,
    },
    {
      icon: <Speed />,
      title: 'Fast',
      description: 'Instant settlements and claims processing',
      color: theme.palette.warning.main,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <ThreeBackground variant="particles" />
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 8 },
          textAlign: 'center',
          background: 'transparent',
          color: 'white',
          borderRadius: 0,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <motion.div variants={itemVariants}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block' }}
                    >
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          bgcolor: alpha('#FFFFFF', 0.1),
                          border: `2px solid ${alpha('#FFFFFF', 0.3)}`,
                          boxShadow: `0 8px 32px ${alpha('#000000', 0.3)}`,
                          mb: 4,
                        }}
                      >
                        <Security sx={{ fontSize: 60, color: 'white' }} />
                      </Avatar>
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="h2"
                      component="h1"
                      gutterBottom
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        mb: 3,
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Bank-Assurance
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="h5"
                      sx={{
                        opacity: 0.9,
                        maxWidth: '600px',
                        mx: { xs: 'auto', md: 0 },
                        mb: 4,
                        lineHeight: 1.6,
                      }}
                    >
                      Next-generation decentralized insurance platform powered by Solana blockchain
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      flexWrap: 'wrap',
                      mb: 6,
                    }}>
                      <SuperButton
                        variant="gradient"
                        size="large"
                        onClick={onConnectWallet}
                        endIcon={<ArrowForward />}
                        sx={{ px: 4, py: 2 }}
                      >
                        Connect Wallet
                      </SuperButton>
                      <SuperButton
                        variant="neon"
                        size="large"
                        href="https://phantom.app/"
                        target="_blank"
                        glowColor="#10B981"
                        endIcon={<PlayArrow />}
                        sx={{ px: 4, py: 2 }}
                      >
                        Install Phantom
                      </SuperButton>
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: star * 0.1 }}
                        >
                          <Star sx={{ color: '#FFD700', fontSize: 24 }} />
                        </motion.div>
                      ))}
                      <Typography variant="body2" sx={{ ml: 2, opacity: 0.8 }}>
                        Trusted by 10,000+ users
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Box sx={{ position: 'relative', height: 400 }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFeature}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                      <Paper
                        sx={{
                          p: 4,
                          background: alpha('#FFFFFF', 0.05),
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${alpha('#FFFFFF', 0.1)}`,
                          borderRadius: 4,
                          textAlign: 'center',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Avatar
                            sx={{
                              width: 80,
                              height: 80,
                              bgcolor: alpha(features[currentFeature].color, 0.2),
                              border: `2px solid ${features[currentFeature].color}`,
                              mx: 'auto',
                              mb: 3,
                            }}
                          >
                            {features[currentFeature].icon}
                          </Avatar>
                        </motion.div>
                        <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: features[currentFeature].color }}>
                          {features[currentFeature].title}
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                          {features[currentFeature].description}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </AnimatePresence>

                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 1, 
                    mt: 3,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}>
                    {features.map((_, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setCurrentFeature(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: currentFeature === index ? '#FFFFFF' : alpha('#FFFFFF', 0.3),
                            transition: 'all 0.3s ease',
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </motion.div>
        </Container>
      </Paper>
    </>
  );
};

export default SuperHeroSection;
