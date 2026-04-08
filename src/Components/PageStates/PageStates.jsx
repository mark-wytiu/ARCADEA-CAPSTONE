import { Box, Paper, Typography, Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export const PAGE_FEEDBACK_PAPER_SX = {
    p: 4,
    textAlign: 'center',
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    maxWidth: 520,
    width: '100%',
    mx: 'auto',
};

export function PageLoading({ minHeight = '50vh', label = 'Loading' }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight,
                width: '100%',
                py: 4,
            }}
            role="status"
            aria-busy="true"
            aria-label={label}
        >
            <CircularProgress size={60} />
            <Typography
                component="span"
                sx={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                }}
            >
                {label}
            </Typography>
        </Box>
    );
}

export function PageError({ message, onRetry, retryLabel = 'Retry' }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                width: '100%',
                py: 4,
            }}
        >
            <Paper elevation={3} sx={PAGE_FEEDBACK_PAPER_SX}>
                <Typography variant="h5" color="error" gutterBottom>
                    {message}
                </Typography>
                {onRetry ? (
                    <Button variant="contained" startIcon={<RefreshIcon />} onClick={onRetry} sx={{ mt: 2 }}>
                        {retryLabel}
                    </Button>
                ) : null}
            </Paper>
        </Box>
    );
}
