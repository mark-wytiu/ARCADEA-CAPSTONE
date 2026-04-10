import { useParams } from 'react-router-dom';
import GamePageDisplay from '../../Components/GamePageDisplay/GamePageDisplay';
import GamePageDetails from '../../Components/GamePageDetails/GamePageDetails';
import { useState, useEffect, useCallback } from "react";
import { gameAPI } from "../../services/api";
import "./GamePage.scss";
import { PageLoading, PageError } from '../../Components/PageStates/PageStates';
import { getGameId } from '../../utils/gameId';

function isRenderableGameRecord(data) {
    if (!data || typeof data !== 'object') {
        return false;
    }
    if (Object.keys(data).length === 0) {
        return false;
    }
    if (getGameId(data)) {
        return true;
    }
    return typeof data.title === 'string' && data.title.trim().length > 0;
}

function GamePage() {
    const { id } = useParams();
    const [selectedGame, setSelectedGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const fetchGameData = useCallback(async () => {
        try {
            setLoading(true);
            setNotFound(false);
            const gameData = await gameAPI.getGameById(id);
            if (!isRenderableGameRecord(gameData)) {
                setSelectedGame(null);
                setNotFound(true);
                setError(null);
                return;
            }
            setSelectedGame(gameData);
            setError(null);
        } catch (err) {
            console.error("Error fetching game details:", err);
            setError("Failed to load game details. Please try again later.");
            setSelectedGame(null);
            setNotFound(false);
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

    if (notFound || !selectedGame) {
        return (
            <PageError
                message="We could not find that game. It may have been removed, or the link is invalid."
                onRetry={fetchGameData}
                retryLabel="Try again"
            />
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