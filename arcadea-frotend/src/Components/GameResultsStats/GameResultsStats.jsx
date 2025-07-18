import React from 'react';
import { Box, Typography } from '@mui/material';

const GameResultsStats = ({ currentPageGames, totalFilteredGames, sortBy, sortOrder }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                mt: 4,
                px: 2
            }}
            className="game-count"
        >
            <Typography
                variant="body1"
                sx={{
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    fontWeight: 500,
                    fontSize: '1rem'
                }}
            >
                Showing {currentPageGames.length} of {totalFilteredGames} games
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    fontStyle: 'italic',
                    fontSize: '0.9rem'
                }}
            >
                Sorted by {sortBy} ({sortOrder})
            </Typography>
        </Box>
    );
};

export default GameResultsStats; 