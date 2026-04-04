import { useId } from 'react';
import { Box, Typography } from '@mui/material';

const HeroSection = () => {
    const uid = useId();
    const gradientId = `arcadea-hero-grad-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`;

    return (
        <Box sx={{
            textAlign: 'center',
            mb: 5,
            mt: 2,
            position: 'relative',
            zIndex: 1
        }}>
            <Box
                component="h1"
                sx={{
                    m: 0,
                    mb: 2,
                    lineHeight: 0,
                }}
            >
                <svg
                    role="img"
                    aria-label="ARCADEA"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 520 76"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                        display: 'block',
                        margin: '0 auto',
                        width: 'min(92vw, 520px)',
                        height: 'auto',
                    }}
                >
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6c5ce7" />
                            <stop offset="100%" stopColor="#00b9ff" />
                        </linearGradient>
                    </defs>
                    <text
                        x="260"
                        y="50"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={`url(#${gradientId})`}
                        style={{
                            fontSize: 42,
                            fontWeight: 800,
                            fontFamily:
                                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
                            letterSpacing: '0.06em',
                        }}
                    >
                        ARCADEA
                    </text>
                </svg>
            </Box>
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
