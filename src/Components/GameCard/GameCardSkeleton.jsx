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
                height={200}
                animation="wave"
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }}
            />
            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: 'white',
                }}
            >
                <Skeleton variant="text" height={24} width="88%" sx={{ mb: 0.5 }} />
                <Skeleton variant="text" height={24} width="62%" sx={{ mb: 1.5 }} />
                <Stack spacing={1} sx={{ marginTop: 'auto' }}>
                    <Skeleton variant="rounded" width={100} height={28} />
                    <Skeleton variant="rounded" width={130} height={28} />
                </Stack>
            </CardContent>
        </Card>
    );
});

export default GameCardSkeleton;
