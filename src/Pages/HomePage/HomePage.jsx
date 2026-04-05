import {
    Box,
    Button,
    Container,
    Paper,
    Typography,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import bgImg from "../../Assets/Images/carl-raw-m3hn2Kn5Bns-unsplash.jpg";
import "./HomePage.scss";

// Custom Hooks
import { useGamesData } from "./hooks/useGamesData";
import { useGamePagination } from "./hooks/useGamePagination";
import { useSteamImport } from "./hooks/useSteamImport";

// Components
import HeroSection from "./components/HeroSection";
import FilterControls from "../../Components/FilterControls/FilterControls";
import GameResultsStats from "../../Components/GameResultsStats/GameResultsStats";
import GameGrid from "../../Components/GameGrid/GameGrid";
import GameGridSkeleton from "../../Components/GameGrid/GameGridSkeleton";
import SteamImport from "../../Components/SteamImport/SteamImport";

const VIRTUALIZATION_THRESHOLD = 60;

function HomePage() {
    const { games, loading, error, genres, platforms, refetchGames } = useGamesData();
    const [filteredGames, setFilteredGames] = useState([]);
    const [sortInfo, setSortInfo] = useState({ sortBy: 'title', sortOrder: 'asc' });
    const [, setSearchParams] = useSearchParams();
    const { page, totalPages, currentPageGames, handlePageChange } = useGamePagination(filteredGames);
    const steamImport = useSteamImport(refetchGames);
    const useVirtualization = filteredGames.length > VIRTUALIZATION_THRESHOLD;
    const gamesToDisplay = useVirtualization ? filteredGames : currentPageGames;

    // Initialize filtered games when games load
    useEffect(() => {
        if (games.length > 0 && filteredGames.length === 0) {
            setFilteredGames(games);
        }
    }, [games, filteredGames.length]);

    // Handle filter changes from FilterControls
    const handleFiltersChange = useCallback((filtered, sortData) => {
        setFilteredGames(filtered);
        setSortInfo(sortData);
    }, []);

    const clearFilters = useCallback(() => {
        setFilteredGames(games);
        setSortInfo({ sortBy: 'title', sortOrder: 'asc' });
        setSearchParams(new URLSearchParams());
    }, [games, setSearchParams]);

    const renderContent = () => {
        if (loading) {
            return <GameGridSkeleton />;
        }

        if (error) {
            return (
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    <Typography variant="h5" color="error" gutterBottom>{error}</Typography>
                    <Button
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        onClick={refetchGames}
                        sx={{ mt: 2 }}
                    >
                        Retry
                    </Button>
                </Paper>
            );
        }

        return (
            <>
                <GameResultsStats
                    shownGamesCount={gamesToDisplay.length}
                    totalFilteredGames={filteredGames.length}
                    sortBy={sortInfo.sortBy}
                    sortOrder={sortInfo.sortOrder}
                    isVirtualized={useVirtualization}
                />
                <GameGrid
                    games={gamesToDisplay}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onClearFilters={clearFilters}
                    useVirtualization={useVirtualization}
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
                paddingY: 4,
                paddingTop: '80px'  // Add padding to account for fixed header
            }}
            className="home-page-container main-content"
        >
            <Container maxWidth="xl">
                <HeroSection />
            </Container>
            <Container maxWidth="xl">
                <FilterControls
                    games={games}
                    genres={genres}
                    platforms={platforms}
                    onSteamImportOpen={steamImport.handleSteamImportOpen}
                    onFiltersChange={handleFiltersChange}
                />
            </Container>
            <Container maxWidth="xl">
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
