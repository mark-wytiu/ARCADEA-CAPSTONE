import {
    Box,
    Container,
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
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
import SteamImport from "../../Components/SteamImport/SteamImport";

function HomePage() {
    const { games, loading, error, genres, platforms, refetchGames } = useGamesData();
    const [filteredGames, setFilteredGames] = useState([]);
    const [sortInfo, setSortInfo] = useState({ sortBy: 'title', sortOrder: 'asc' });
    const { page, totalPages, currentPageGames, handlePageChange } = useGamePagination(filteredGames);
    const steamImport = useSteamImport(refetchGames);

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

    // Clear all filters function
    const clearFilters = useCallback(() => {
        // Reset URL to clear all filters
        window.location.href = window.location.pathname;
    }, []);

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
                    sortBy={sortInfo.sortBy}
                    sortOrder={sortInfo.sortOrder}
                />
                <GameGrid
                    games={currentPageGames}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onClearFilters={clearFilters}
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
                minHeight: '100vh'
            }}
            className="home-page-container main-content"
        >
            <Container maxWidth="xl">
                <HeroSection />
                <FilterControls
                    games={games}
                    genres={genres}
                    platforms={platforms}
                    onSteamImportOpen={steamImport.handleSteamImportOpen}
                    onFiltersChange={handleFiltersChange}
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
