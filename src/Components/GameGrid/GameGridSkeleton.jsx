import Grid from '@mui/material/Grid';
import GameCardSkeleton from '../GameCard/GameCardSkeleton';

const DEFAULT_COUNT = 8;

function GameGridSkeleton({ count = DEFAULT_COUNT }) {
    return (
        <Grid
            container
            spacing={4}
            component="section"
            role="status"
            aria-busy="true"
            aria-label="Loading games"
        >
            {Array.from({ length: count }, (_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <GameCardSkeleton />
                </Grid>
            ))}
        </Grid>
    );
}

export default GameGridSkeleton;
