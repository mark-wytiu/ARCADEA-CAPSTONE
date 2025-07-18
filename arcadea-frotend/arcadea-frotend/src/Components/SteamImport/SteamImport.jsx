import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
    LinearProgress,
    Divider,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Info as InfoIcon,
    CheckCircle as CheckCircleIcon,
    SportsEsports as GamesIcon,
    Person as PersonIcon,
    Close as CloseIcon,
    Help as HelpIcon
} from '@mui/icons-material';
import { importSteamLibrary, extractSteamIdFromUrl, isValidSteamId } from '../../services/steamService';
import { gameAPI } from '../../services/api';
import SteamSetupGuide from './SteamSetupGuide';
import './SteamImport.scss';

const steps = ['Enter Steam ID', 'Import Games', 'Review & Save'];

function SteamImport({ open, onClose, onImportComplete }) {
    const [activeStep, setActiveStep] = useState(0);
    const [steamInput, setSteamInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [importData, setImportData] = useState(null);
    const [selectedGames, setSelectedGames] = useState([]);
    const [importProgress, setImportProgress] = useState(0);
    const [showSetupGuide, setShowSetupGuide] = useState(false);

    const resetDialog = () => {
        setActiveStep(0);
        setSteamInput('');
        setLoading(false);
        setError(null);
        setImportData(null);
        setSelectedGames([]);
        setImportProgress(0);
    };

    const handleClose = () => {
        resetDialog();
        onClose();
    };

    const handleSteamInputChange = (event) => {
        const value = event.target.value;
        setSteamInput(value);
        
        // Try to extract Steam ID from URL if user pasted a profile URL
        const extractedId = extractSteamIdFromUrl(value);
        if (extractedId) {
            setSteamInput(extractedId);
        }
    };

    const validateSteamInput = () => {
        if (!steamInput.trim()) {
            setError('Please enter a Steam ID or profile URL');
            return false;
        }
        
        // Check if it's a valid Steam ID (17 digits) or looks like a vanity URL
        if (!isValidSteamId(steamInput) && !/^[a-zA-Z0-9_-]+$/.test(steamInput)) {
            setError('Please enter a valid Steam ID or vanity URL');
            return false;
        }
        
        return true;
    };

    const handleImportSteamLibrary = async () => {
        if (!validateSteamInput()) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const result = await importSteamLibrary(steamInput);
            setImportData(result);
            setSelectedGames(result.games); // Select all games by default
            setActiveStep(1);
        } catch (error) {
            console.error('Import error:', error);
            setError('Failed to import Steam library. Please check your Steam ID and make sure your profile is public.');
        } finally {
            setLoading(false);
        }
    };

    const handleGameSelection = (gameIndex) => {
        setSelectedGames(prev => {
            const isSelected = prev.some(game => game.steamAppId === importData.games[gameIndex].steamAppId);
            
            if (isSelected) {
                return prev.filter(game => game.steamAppId !== importData.games[gameIndex].steamAppId);
            } else {
                return [...prev, importData.games[gameIndex]];
            }
        });
    };

    const selectAllGames = () => {
        setSelectedGames(importData.games);
    };

    const deselectAllGames = () => {
        setSelectedGames([]);
    };

    const handleSaveGames = async () => {
        if (selectedGames.length === 0) {
            setError('Please select at least one game to import');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setImportProgress(0);
            
            // Save games one by one with progress tracking
            for (let i = 0; i < selectedGames.length; i++) {
                const game = selectedGames[i];
                try {
                    await gameAPI.addGame(game);
                } catch (gameError) {
                    console.warn(`Failed to save game: ${game.title}`, gameError);
                }
                setImportProgress(((i + 1) / selectedGames.length) * 100);
            }
            
            setActiveStep(2);
            
            // Notify parent component about successful import
            if (onImportComplete) {
                onImportComplete(selectedGames.length);
            }
            
            // Auto-close after showing success
            setTimeout(() => {
                handleClose();
            }, 2000);
            
        } catch (error) {
            console.error('Save error:', error);
            setError('Failed to save some games. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Box>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Enter your Steam ID, vanity URL, or paste your Steam profile URL to import your game library.
                        </Typography>
                        
                        <Alert severity="info" sx={{ mb: 3 }}>
                            <Typography variant="body2">
                                <strong>Note:</strong> Your Steam profile must be set to public for this to work. 
                                You can find your Steam ID in your profile URL or use your custom vanity URL.
                            </Typography>
                        </Alert>
                        
                        <Alert severity="success" sx={{ mb: 3 }}>
                            <Typography variant="body2">
                                <strong>Try Demo Mode:</strong> Enter "demo" as your Steam ID to see how this works with sample data!
                            </Typography>
                        </Alert>
                        
                        <TextField
                            fullWidth
                            label="Steam ID or Profile URL"
                            placeholder="e.g., 76561198000000000 or your_username"
                            value={steamInput}
                            onChange={handleSteamInputChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        
                        <Typography variant="caption" color="text.secondary">
                            Examples:
                            <br />• Steam ID: 76561198000000000
                            <br />• Vanity URL: your_username
                            <br />• Profile URL: https://steamcommunity.com/id/your_username
                        </Typography>
                    </Box>
                );
                
            case 1:
                return (
                    <Box>
                        {importData && (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Avatar 
                                        src={importData.playerInfo.avatarmedium} 
                                        sx={{ width: 48, height: 48, mr: 2 }}
                                    />
                                    <Box>
                                        <Typography variant="h6">
                                            {importData.playerInfo.personaname}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {importData.totalGames} total games • {importData.importedGames} available for import
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Divider sx={{ mb: 2 }} />
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6">
                                        Select Games to Import ({selectedGames.length} selected)
                                    </Typography>
                                    <Box>
                                        <Button size="small" onClick={selectAllGames} sx={{ mr: 1 }}>
                                            Select All
                                        </Button>
                                        <Button size="small" onClick={deselectAllGames}>
                                            Deselect All
                                        </Button>
                                    </Box>
                                </Box>
                                
                                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                                    {importData.games.map((game, index) => {
                                        const isSelected = selectedGames.some(selected => selected.steamAppId === game.steamAppId);
                                        return (
                                            <ListItem 
                                                key={game.steamAppId}
                                                button
                                                onClick={() => handleGameSelection(index)}
                                                sx={{ 
                                                    bgcolor: isSelected ? 'action.selected' : 'transparent',
                                                    borderRadius: 1,
                                                    mb: 1
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar src={game.image} variant="square" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={game.title}
                                                    secondary={
                                                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                                            <Chip size="small" label={game.platform} />
                                                            {game.playtimeForever > 0 && (
                                                                <Chip 
                                                                    size="small" 
                                                                    label={`${Math.round(game.playtimeForever / 60)}h played`}
                                                                    variant="outlined"
                                                                />
                                                            )}
                                                        </Box>
                                                    }
                                                />
                                                {isSelected && (
                                                    <CheckCircleIcon color="primary" />
                                                )}
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </>
                        )}
                    </Box>
                );
                
            case 2:
                return (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Import Successful!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Successfully imported {selectedGames.length} games from your Steam library.
                        </Typography>
                    </Box>
                );
                
            default:
                return null;
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{ sx: { minHeight: '500px' } }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <GamesIcon />
                    </Avatar>
                    Import from Steam
                </Box>
                <Box>
                    <Tooltip title="Setup Help">
                        <IconButton onClick={() => setShowSetupGuide(true)}>
                            <HelpIcon />
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            
            <DialogContent>
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                
                {loading && activeStep === 1 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Saving games... ({Math.round(importProgress)}%)
                        </Typography>
                        <LinearProgress variant="determinate" value={importProgress} />
                    </Box>
                )}
                
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}
                
                {renderStepContent()}
            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                
                {activeStep === 0 && (
                    <Button 
                        variant="contained" 
                        onClick={handleImportSteamLibrary}
                        disabled={loading || !steamInput.trim()}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? 'Importing...' : 'Import Library'}
                    </Button>
                )}
                
                {activeStep === 1 && (
                    <Button 
                        variant="contained" 
                        onClick={handleSaveGames}
                        disabled={loading || selectedGames.length === 0}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? 'Saving...' : `Save ${selectedGames.length} Games`}
                    </Button>
                )}
            </DialogActions>
            
            {/* Setup Guide Dialog */}
            <SteamSetupGuide
                open={showSetupGuide}
                onClose={() => setShowSetupGuide(false)}
            />
        </Dialog>
    );
}

export default SteamImport;
