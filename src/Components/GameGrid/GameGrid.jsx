import React, { useState, useEffect, Suspense } from 'react';
import { Grid, Box, Pagination, Paper, Typography, Button, CircularProgress } from '@mui/material';
import GameCard from '../GameCard/GameCard';

// Lazy load VirtualizedGameGrid for large lists
const VirtualizedGameGrid = React.lazy(() => import('../VirtualizedGameGrid/VirtualizedGameGrid'));

const VIRTUALIZATION_THRESHOLD = 20; // Use virtualization when games.length > 20

const GameGrid = React.memo(({ games, page, totalPages, onPageChange, onClearFilters }) => {
    const [useVirtualization, setUseVirtualization] = useState(false);

    // Determine if we should use virtualization based on total games count
    useEffect(() => {
        setUseVirtualization(games.length > VIRTUALIZATION_THRESHOLD);
    }, [games.length]);

    if (games.length === 0) {
        return (
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                <Typography variant="h5">
                    No games found matching your filters.
                </Typography>
                <Button
                    variant="contained"
                    onClick={onClearFilters}
                    sx={{ mt: 2 }}
                >
                    Clear All Filters
                </Button>
            </Paper>
        );
    }

    return (
        <>
            {useVirtualization ? (
                <Suspense fallback={
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                        <CircularProgress />
                    </Box>
                }>
                    <VirtualizedGameGrid games={games} containerHeight={600} />
                </Suspense>
            ) : (
                <Grid container spacing={4}>
                    {games.map((game, index) => (
                        <Grid item key={game._id || game.id || index} xs={12} sm={6} md={4} lg={3}>
                            <GameCard game={game} />
                        </Grid>
                    ))}
                </Grid>
            )}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={onPageChange}
                        color="primary"
                        size="large"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            },
                            '& .Mui-selected': {
                                backgroundColor: 'primary.main',
                            },
                        }}
                    />
                </Box>
            )}
        </>
    );
});

GameGrid.displayName = 'GameGrid';

export default GameGrid; 