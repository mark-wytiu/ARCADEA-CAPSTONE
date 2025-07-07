import {
    Box,
    Container,
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material';
import bgImg from "../../Assets/Images/carl-raw-m3hn2Kn5Bns-unsplash.jpg";
import "./HomePage.scss";

// Custom Hooks
import { useGamesData } from "./hooks/useGamesData";
import { useGameFiltering } from "./hooks/useGameFiltering";
import { useGamePagination } from "./hooks/useGamePagination";
import { useSteamImport } from "./hooks/useSteamImport";

// Components
import HeroSection from "./components/HeroSection";
import FilterControls from "../../Components/FilterControls/FilterControls";
import GameResultsStats from "../../Components/GameResultsStats/GameResultsStats";
import GameGrid from "../../Components/GameGrid/GameGrid";
import SteamImport from "../../Components/SteamImport/SteamImport";

function HomePage() {
    const { games, loading, error, genres, platforms, refetchGames } = useGamesData();
    const { filteredGames, controls } = useGameFiltering(games);
    const { page, totalPages, currentPageGames, handlePageChange } = useGamePagination(filteredGames);
    const steamImport = useSteamImport(refetchGames);

    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress />
                </Box>
            );
        }

        if (error) {
            return (
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    <Typography variant="h5" color="error">{error}</Typography>
                </Paper>
            );
        }

        return (
            <>
                <GameResultsStats
                    currentPageGames={currentPageGames}
                    totalFilteredGames={filteredGames.length}
                    sortBy={controls.sortBy}
                    sortOrder={controls.sortOrder}
                />
                <GameGrid
                    games={currentPageGames}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onClearFilters={controls.clearFilters}
                />
            </>
        );
    };

    return (
        <Box
            sx={{
                width: '100%',
                backgroundImage: `url(${bgImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                minHeight: '100vh',
                paddingY: 4
            }}
            className="home-page-container"
        >
            <Container maxWidth="xl">
                <HeroSection />
                <FilterControls
                    controls={controls}
                    genres={genres}
                    platforms={platforms}
                    onSteamImportOpen={steamImport.handleSteamImportOpen}
                />
                {renderContent()}
            </Container>
            
            {/* Steam Import Dialog */}
            <SteamImport
                open={steamImport.openSteamImport}
                onClose={steamImport.handleSteamImportClose}
                onImportComplete={steamImport.handleSteamImportComplete}
            />
        </Box>
    );
}

export default HomePage;
