import React from 'react';
import { Grid, Box, Pagination, Paper, Typography, Button } from '@mui/material';
import GameCard from '../GameCard/GameCard';
import { Fade } from '@mui/material';

const GameGrid = ({ games, page, totalPages, onPageChange, onClearFilters }) => {
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
            <Grid container spacing={4}>
                {games.map((game, index) => (
                    <Grid item key={game._id || index} xs={12} sm={6} md={4} lg={3}>
                        <Fade in={true} timeout={500}>
                            <Box>
                                <GameCard game={game} />
                            </Box>
                        </Fade>
                    </Grid>
                ))}
            </Grid>
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
};

export default GameGrid; 