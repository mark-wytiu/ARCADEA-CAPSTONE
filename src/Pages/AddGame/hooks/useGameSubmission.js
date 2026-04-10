import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameAPI } from '../../../services/api';

// options.onBeforeRedirect runs right before navigate after a successful add (e.g. reset form).
export const useGameSubmission = (options = {}) => {
    const { onBeforeRedirect } = options;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitGame = async (gameData) => {
        try {
            setLoading(true);
            setError(null);

            await gameAPI.addGame(gameData);
            setSuccess(true);

            // Navigate to home after successful submission
            setTimeout(() => {
                onBeforeRedirect?.();
                navigate('/');
            }, 1500);

        } catch (error) {
            console.error("Error adding game:", error);
            setError("Failed to add game. Please try again.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const resetStatus = () => {
        setError(null);
        setSuccess(false);
    };

    return {
        loading,
        error,
        success,
        submitGame,
        resetStatus
    };
}; 