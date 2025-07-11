import React, { useMemo } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import GameCard from '../GameCard/GameCard';

const VirtualizedGameGrid = ({ games, containerHeight = 600 }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.down('md'));
    const isMd = useMediaQuery(theme.breakpoints.down('lg'));

    // Calculate columns based on screen size
    const columnCount = useMemo(() => {
        if (isXs) return 1;
        if (isSm) return 2;
        if (isMd) return 3;
        return 4;
    }, [isXs, isSm, isMd]);

    const columnWidth = useMemo(() => {
        const containerWidth = window.innerWidth * 0.9; // Assuming 90% of screen width
        return Math.floor(containerWidth / columnCount);
    }, [columnCount]);

    const rowHeight = 400; // Height for each game card row
    const rowCount = Math.ceil(games.length / columnCount);

    const Cell = ({ columnIndex, rowIndex, style }) => {
        const gameIndex = rowIndex * columnCount + columnIndex;
        const game = games[gameIndex];

        if (!game) return null;

        return (
            <div style={style}>
                <Box sx={{ padding: 1 }}>
                    <GameCard game={game} />
                </Box>
            </div>
        );
    };

    return (
        <Box sx={{ height: containerHeight, width: '100%' }}>
            <Grid
                columnCount={columnCount}
                columnWidth={columnWidth}
                height={containerHeight}
                rowCount={rowCount}
                rowHeight={rowHeight}
                width="100%"
            >
                {Cell}
            </Grid>
        </Box>
    );
};

export default VirtualizedGameGrid;
