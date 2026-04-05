import React from 'react';
import { Paper, Typography, Button, Stack, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

export class RouteErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('RouteErrorBoundary caught an error:', error, errorInfo);
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.routePath !== this.props.routePath &&
            this.state.hasError
        ) {
            this.setState({ hasError: false, error: null });
        }
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            const showDetails = process.env.NODE_ENV === 'development' && this.state.error?.message;

            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '50vh',
                        px: 2,
                        py: 4,
                    }}
                    role="alert"
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            maxWidth: 520,
                            width: '100%',
                            textAlign: 'center',
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        }}
                    >
                        <Typography variant="h5" color="error" gutterBottom component="h1">
                            Something went wrong
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: showDetails ? 2 : 3 }}>
                            This page hit an unexpected error. Try reloading the page or navigate back home.
                        </Typography>
                        {showDetails && (
                            <Typography
                                variant="body2"
                                component="pre"
                                sx={{
                                    mb: 3,
                                    p: 2,
                                    textAlign: 'left',
                                    overflow: 'auto',
                                    maxHeight: 160,
                                    bgcolor: 'grey.100',
                                    borderRadius: 1,
                                    fontFamily: 'monospace',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {this.state.error.message}
                            </Typography>
                        )}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                startIcon={<RefreshIcon />}
                                onClick={this.handleReload}
                            >
                                Reload page
                            </Button>
                            <Button
                                variant="outlined"
                                component={RouterLink}
                                to="/"
                                startIcon={<HomeIcon />}
                            >
                                Go to home
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}
