import { useParams } from 'react-router-dom';
import GamePageDisplay from '../../Components/GamePageDisplay/GamePageDisplay';
import GamePageDetails from '../../Components/GamePageDetails/GamePageDetails';
import { useState, useEffect, useCallback } from "react";
import { gameAPI } from "../../services/api";
import "./GamePage.scss";
import { PageLoading, PageError } from '../../Components/PageStates/PageStates';

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
        return <PageLoading label="Loading game details" />;
    }

    if (error) {
        return <PageError message={error} onRetry={fetchGameData} />;
    }

    return (
        <div className='GamePage'>
            <GamePageDisplay foundGame={selectedGame} />
            <GamePageDetails foundGame={selectedGame} />
        </div>
    );
}

export default GamePage;