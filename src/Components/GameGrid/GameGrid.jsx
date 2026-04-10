import React, { Suspense } from 'react';
import { Grid, Box, Pagination, Paper, Typography, Button } from '@mui/material';
import GameCard from '../GameCard/GameCard';
import GameGridSkeleton from './GameGridSkeleton';
import { getGameId } from '../../utils/gameId';

// Lazy load VirtualizedGameGrid for large lists
const VirtualizedGameGrid = React.lazy(() => import('../VirtualizedGameGrid/VirtualizedGameGrid'));

const GameGrid = React.memo(({ games, page, totalPages, onPageChange, onClearFilters, useVirtualization = false }) => {

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
                <Suspense fallback={<GameGridSkeleton />}>
                    <VirtualizedGameGrid games={games} containerHeight={600} />
                </Suspense>
            ) : (
                <Grid container spacing={4}>
                    {games.map((game, index) => (
                        <Grid item key={getGameId(game) ?? index} xs={12} sm={6} md={4} lg={3}>
                            <GameCard game={game} />
                        </Grid>
                    ))}
                </Grid>
            )}
            {!useVirtualization && totalPages > 1 && (
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