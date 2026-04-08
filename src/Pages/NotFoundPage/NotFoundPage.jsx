import { Box, Container, Paper, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { PAGE_FEEDBACK_PAPER_SX } from '../../Components/PageStates/PageStates';

function NotFoundPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 10rem)',
                py: 4,
                px: 2,
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ ...PAGE_FEEDBACK_PAPER_SX, maxWidth: 560 }}>
                    <SearchOffIcon sx={{ fontSize: 56, color: 'text.secondary', mb: 2 }} aria-hidden />
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                        404
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Page not found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        That URL does not match any page in Arcadea. Check the address or head back to your
                        library.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                        <Button variant="contained" component={Link} to="/" startIcon={<HomeIcon />} size="large">
                            Back to library
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}

export default NotFoundPage;
