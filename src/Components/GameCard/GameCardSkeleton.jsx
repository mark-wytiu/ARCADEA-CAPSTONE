import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import './GameCard.scss';

const GameCardSkeleton = React.memo(function GameCardSkeleton() {
    return (
        <Card
            className="game-card game-card--skeleton"
            sx={{
                height: 350,
                width: '100%',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <Skeleton
                variant="rectangular"
                width="100%"
                animation="wave"
                sx={{
                    flexShrink: 0,
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                }}
            />
            <CardContent className="game-card__content">
                <Skeleton variant="rounded" height={48} width="92%" sx={{ flexShrink: 0 }} />
                <Stack className="game-card__chips" direction="column" spacing={1}>
                    <Skeleton variant="rounded" width={100} height={24} />
                    <Skeleton variant="rounded" width={130} height={24} />
                </Stack>
            </CardContent>
        </Card>
    );
});

export default GameCardSkeleton;
