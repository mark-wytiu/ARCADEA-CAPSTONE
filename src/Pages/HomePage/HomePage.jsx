import GameCard from "../../Components/GameCard/GameCard";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import bgImg from "../../Assets/Images/carl-raw-m3hn2Kn5Bns-unsplash.jpg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gameAPI } from "../../services/api";

function HomePage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { gameId } = useParams();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const allGames = await gameAPI.getAllGames();
                setGames(allGames);
                setError(null);
            } catch (error) {
                console.error("Error fetching games:", error);
                setError("Failed to load games. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    return (
        <Box sx={{
            width: '100%',
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            minHeight: '100vh',
            paddingY: 4
        }}>
            <Container maxWidth="xl" sx={{ paddingY: 2 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        color: 'white',
                        textAlign: 'center',
                        marginBottom: 4,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontWeight: 'bold'
                    }}
                >
                    Discover Amazing Games
                </Typography>

                {loading ? (
                    <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
                        Loading games...
                    </Typography>
                ) : error ? (
                    <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
                        {error}
                    </Typography>
                ) : games.length === 0 ? (
                    <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
                        No games found. Check back later!
                    </Typography>
                ) : (
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        <GameCard games={games} />
                    </Grid>
                )}
            </Container>
        </Box>
    );
}

export default HomePage;
