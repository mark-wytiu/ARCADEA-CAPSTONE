import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroSection = () => {
    return (
        <Box sx={{
            textAlign: 'center',
            mb: 5,
            position: 'relative',
            zIndex: 1
        }}>
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    color: 'white',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                    fontWeight: 800,
                    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                    letterSpacing: '0.05em',
                    mb: 2
                }}
            >
                ARCADEA
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    color: 'white',
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