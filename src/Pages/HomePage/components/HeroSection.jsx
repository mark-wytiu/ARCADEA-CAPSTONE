import { useId } from 'react';
import { Box, Typography } from '@mui/material';

const HeroSection = () => {
    const uid = useId();
    const gradientId = `arcadea-hero-grad-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`;

    return (
        <Box sx={{
            textAlign: 'center',
            mb: 4,
            mt: 1.5,
            position: 'relative',
            zIndex: 1,
        }}>
            <Box
                component="h1"
                sx={{
                    m: 0,
                    mb: 1.5,
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
                        width: 'min(88vw, 440px)',
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
                            fontSize: 34,
                            fontWeight: 800,
                            fontFamily:
                                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
                            letterSpacing: '0.045em',
                        }}
                    >
                        ARCADEA
                    </text>
                </svg>
            </Box>
            <Typography
                component="p"
                variant="body1"
                sx={{
                    color: '#c5ced6',
                    textShadow: '0 1px 2px rgba(0,0,0,0.55)',
                    mb: 3,
                    maxWidth: 520,
                    mx: 'auto',
                    px: 1,
                    fontSize: { xs: '0.9375rem', sm: '1.0625rem' },
                    fontWeight: 400,
                    lineHeight: 1.45,
                    letterSpacing: '0.01em',
                }}
            >
                Discover Your Next Gaming Adventure
            </Typography>
        </Box>
    );
};

export default HeroSection;
