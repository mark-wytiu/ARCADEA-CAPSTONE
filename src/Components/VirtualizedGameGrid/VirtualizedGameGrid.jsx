import React, { useMemo, useRef, useState, useEffect } from 'react';
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

    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) {
            return undefined;
        }

        const updateWidth = () => {
            setContainerWidth(node.clientWidth);
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(node);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const columnWidth = useMemo(() => {
        if (!containerWidth || !columnCount) {
            return 300;
        }

        return Math.max(250, Math.floor(containerWidth / columnCount));
    }, [containerWidth, columnCount]);

    const rowHeight = 400; // Height for each game card row
    const rowCount = Math.ceil(games.length / columnCount);

    const Cell = React.memo(({ columnIndex, rowIndex, style }) => {
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
    });

    Cell.displayName = 'VirtualizedCell';

    if (!containerWidth) {
        return <Box ref={containerRef} sx={{ height: containerHeight, width: '100%' }} />;
    }

    return (
        <Box ref={containerRef} sx={{ height: containerHeight, width: '100%' }}>
            <Grid
                columnCount={columnCount}
                columnWidth={columnWidth}
                height={containerHeight}
                rowCount={rowCount}
                rowHeight={rowHeight}
                width={containerWidth}
                overscanRowCount={2}
            >
                {Cell}
            </Grid>
        </Box>
    );
};

export default VirtualizedGameGrid;
