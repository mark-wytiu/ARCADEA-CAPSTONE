import { useState, useEffect } from 'react';
import { gameAPI } from '../../../services/api';

export const useGamesData = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [genres, setGenres] = useState(['All']);
    const [platforms, setPlatforms] = useState(['All']);

    const fetchGames = async () => {
        try {
            setLoading(true);
            const allGames = await gameAPI.getAllGames();
            setGames(allGames);

            // Extract unique genres and platforms
            const uniqueGenres = ['All', ...new Set(allGames.map(game => game.genre).filter(Boolean))];
            const uniquePlatforms = ['All', ...new Set(allGames.map(game => game.platform).filter(Boolean))];

            setGenres(uniqueGenres);
            setPlatforms(uniquePlatforms);
            setError(null);
        } catch (error) {
            console.error("Error fetching games:", error);
            setError("Failed to load games. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return { games, loading, error, genres, platforms, refetchGames: fetchGames };
}; 