import GameCard from "../../Components/GameCard/GameCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import bgImg from "../../Assets/Images/carl-raw-m3hn2Kn5Bns-unsplash.jpg"


function HomePage() {




    return (
        
        <Box sx={{ width: '100%', backgroundImage:`url(${bgImg})`, backgroundRepeat: "no-repeat",
        backgroundSize: "cover", height:'80rem' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3  }}>
                
                    <GameCard />
                
                {/* <Grid xs={2}>
                    <GameCard />
                </Grid>
                <Grid xs={2}>
                    <GameCard />
                </Grid>
                <Grid xs={2}>
                    <GameCard />
                </Grid> */}
            </Grid>
        </Box>
    )
}

export default HomePage;
