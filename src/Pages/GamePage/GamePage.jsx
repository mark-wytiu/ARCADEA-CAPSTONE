import { useParams } from 'react-router-dom';
import GamePageDisplay from '../../Components/GamePageDisplay/GamePageDisplay';
import GamePageDetails from '../../Components/GamePageDetails/GamePageDetails';
import { useState, useEffect, useCallback } from "react";
import { gameAPI } from "../../services/api";
import "./GamePage.scss";
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

function GamePage() {
    const { id } = useParams();
    const [selectedGame, setSelectedGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGameData = useCallback(async () => {
        try {
            setLoading(true);
            const gameData = await gameAPI.getGameById(id);
            setSelectedGame(gameData);
            setError(null);
        } catch (err) {
            console.error("Error fetching game details:", err);
            setError("Failed to load game details. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchGameData();
    }, [fetchGameData]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh', gap: 2 }}>
                <Typography variant="h5" color="error">{error}</Typography>
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={fetchGameData}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <div className='GamePage'>
            <GamePageDisplay foundGame={selectedGame} />
            <GamePageDetails foundGame={selectedGame} />
        </div>
    );
}

export default GamePage;