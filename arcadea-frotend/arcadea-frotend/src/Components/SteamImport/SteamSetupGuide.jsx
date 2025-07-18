import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Alert,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Link,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper
} from '@mui/material';
import {
    VpnKey as ApiKeyIcon,
    Public as PublicIcon,
    Security as SecurityIcon,
    Info as InfoIcon,
    CheckCircle as CheckIcon
} from '@mui/icons-material';

const setupSteps = [
    'Get Steam API Key',
    'Make Profile Public', 
    'Find Your Steam ID',
    'Configure ARCADEA'
];

function SteamSetupGuide({ open, onClose }) {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{ sx: { minHeight: '600px' } }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SecurityIcon sx={{ mr: 2, color: 'primary.main' }} />
                    Steam Integration Setup Guide
                </Box>
            </DialogTitle>
            
            <DialogContent>
                <Alert severity="info" sx={{ mb: 3 }}>
                    To import your Steam library, you'll need to set up Steam API access and ensure your profile is public.
                    This is a one-time setup process.
                </Alert>

                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Get Steam API Key</StepLabel>
                        <StepContent>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                You need a Steam Web API key to access your game library data.
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon>
                                        <ApiKeyIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Visit Steam Web API Key page"
                                        secondary={
                                            <Link 
                                                href="https://steamcommunity.com/dev/apikey" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                https://steamcommunity.com/dev/apikey
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <InfoIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Domain Name"
                                        secondary="Enter 'localhost' for local development"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CheckIcon color="success" />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Copy your API key"
                                        secondary="Save this key - you'll need it for configuration"
                                    />
                                </ListItem>
                            </List>
                            <Box sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Continue
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>Make Profile Public</StepLabel>
                        <StepContent>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Your Steam profile must be public for the API to access your game library.
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon>
                                        <PublicIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Go to Steam Privacy Settings"
                                        secondary={
                                            <Link 
                                                href="https://steamcommunity.com/my/edit/settings" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                Privacy Settings
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CheckIcon color="success" />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Set 'My Profile' to Public"
                                        secondary="Also set 'Game Details' to Public"
                                    />
                                </ListItem>
                            </List>
                            <Alert severity="warning" sx={{ mt: 2 }}>
                                <Typography variant="body2">
                                    <strong>Privacy Note:</strong> You can change these back to private after importing your games.
                                    The import is a one-time process.
                                </Typography>
                            </Alert>
                            <Box sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Continue
                                </Button>
                                <Button
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>Find Your Steam ID</StepLabel>
                        <StepContent>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                You can use either your Steam ID or your custom URL name.
                            </Typography>
                            <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                    <strong>Profile URL examples:</strong><br />
                                    • https://steamcommunity.com/id/<strong>your_username</strong>/<br />
                                    • https://steamcommunity.com/profiles/<strong>76561198000000000</strong>/
                                </Typography>
                            </Paper>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon>
                                        <InfoIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Custom URL (easiest)"
                                        secondary="Use just the username part: 'your_username'"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <InfoIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Steam ID (17 digits)"
                                        secondary="Use the full numeric ID: '76561198000000000'"
                                    />
                                </ListItem>
                            </List>
                            <Box sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Continue
                                </Button>
                                <Button
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>Configure ARCADEA</StepLabel>
                        <StepContent>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Add your Steam API key to your environment configuration.
                            </Typography>
                            <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'grey.900', color: 'white' }}>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                    # Add this to your .env file<br />
                                    REACT_APP_STEAM_API_KEY=your_api_key_here
                                </Typography>
                            </Paper>
                            <Alert severity="success" sx={{ mt: 2 }}>
                                <Typography variant="body2">
                                    <strong>All set!</strong> You can now import your Steam library. 
                                    Restart the application to apply the new configuration.
                                </Typography>
                            </Alert>
                            <Box sx={{ mb: 1 }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleReset}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Restart Guide
                                </Button>
                                <Button
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Try Demo Mode
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Want to see how Steam import works? Use "demo" as your Steam ID to try it with sample data.
                    </Typography>
                    <Paper elevation={1} sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            Steam ID: <strong>demo</strong>
                        </Typography>
                    </Paper>
                </Box>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={onClose}>
                    Close
                </Button>
                <Button 
                    variant="contained" 
                    href="https://steamcommunity.com/dev/apikey" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Get API Key
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SteamSetupGuide;
