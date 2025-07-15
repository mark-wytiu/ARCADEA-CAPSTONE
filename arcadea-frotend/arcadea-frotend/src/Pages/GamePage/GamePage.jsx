import { useParams } from 'react-router-dom';
import GamePageDsiplay from '../../Components/GamePageDisplay/GamePageDisplay';
import GamePageDetails from '../../Components/GamePageDetails/GamePageDetails';
import { useState, useEffect } from "react";
import { gameAPI } from "../../services/api";
import "./GamePage.scss";
import { Box, Typography, CircularProgress } from '@mui/material';

function GamePage() {
    const { id } = useParams();
    const [selectedGame, setSelectedGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                setLoading(true);
                const gameData = await gameAPI.getGameById(id);
                setSelectedGame(gameData);
                setError(null);
            } catch (error) {
                console.error("Error fetching game details:", error);
                setError("Failed to load game details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography variant="h5" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <div className='GamePage'>
            <GamePageDsiplay foundGame={selectedGame} />
            <GamePageDetails foundGame={selectedGame} />
        </div>
    );
}

export default GamePage;