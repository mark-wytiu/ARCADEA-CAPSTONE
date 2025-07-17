import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroSection = () => {
    return (
        <Box sx={{
                textAlign: 'center',
                mb: 5,
                mt: 2,
                position: 'relative',
                zIndex: 1
            }}>
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    background: 'linear-gradient(135deg, #6c5ce7 0%, #00b9ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 20px rgba(108, 92, 231, 0.3)',
                    fontWeight: 800,
                    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                    letterSpacing: '0.05em',
                    mb: 2,
                    filter: 'drop-shadow(0 0 10px rgba(108, 92, 231, 0.3))'
                }}
            >
                ARCADEA
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    color: '#b2bac2',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                    mb: 4,
                    fontSize: { xs: '1.2rem', sm: '1.5rem' },
                    fontWeight: 300,
                    letterSpacing: '0.02em'
                }}
            >
                Discover Your Next Gaming Adventure
            </Typography>
        </Box>
    );
};

export default HeroSection;
