import GameCard from "../../Components/GameCard/GameCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

function HomePage() {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={2}>
                    <GameCard />
                </Grid>
                <Grid xs={2}>
                    <GameCard />
                </Grid>
                <Grid xs={2}>
                    <GameCard />
                </Grid>
                <Grid xs={2}>
                    <GameCard />
                </Grid>
            </Grid>
        </Box>
    )
}

export default HomePage;
