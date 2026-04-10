import {
    Box,
    Container,
} from '@mui/material';
import "./HomePage.scss";

// Custom Hooks
import { useGamesData } from "./hooks/useGamesData";
import { useGamePagination } from "./hooks/useGamePagination";
import { useHomePageFilters } from "./hooks/useHomePageFilters";
import { useSteamImport } from "./hooks/useSteamImport";

// Components
import HeroSection from "./components/HeroSection";
import FilterControls from "../../Components/FilterControls/FilterControls";
import GameResultsStats from "../../Components/GameResultsStats/GameResultsStats";
import GameGrid from "../../Components/GameGrid/GameGrid";
import GameGridSkeleton from "../../Components/GameGrid/GameGridSkeleton";
import SteamImport from "../../Components/SteamImport/SteamImport";
import { PageError } from "../../Components/PageStates/PageStates";

const HERO_BG_URL = `${process.env.PUBLIC_URL ?? ''}/images/carl-raw-m3hn2Kn5Bns-unsplash.jpg`;

const VIRTUALIZATION_THRESHOLD = 60;

function HomePage() {
    const { games, loading, error, genres, platforms, refetchGames } = useGamesData();
    const { filteredGames, sortInfo, filterControlsProps } = useHomePageFilters(games);
    const { page, totalPages, currentPageGames, handlePageChange } = useGamePagination(filteredGames);
    const steamImport = useSteamImport(refetchGames);
    const useVirtualization = filteredGames.length > VIRTUALIZATION_THRESHOLD;
    const gamesToDisplay = useVirtualization ? filteredGames : currentPageGames;

    const renderContent = () => {
        if (loading) {
            return <GameGridSkeleton />;
        }

        if (error) {
            return <PageError message={error} onRetry={refetchGames} />;
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
                    onClearFilters={filterControlsProps.clearFilters}
                    useVirtualization={useVirtualization}
                />
            </>
        );
    };

    return (
        <Box
            sx={{
                width: '100%',
                backgroundImage: `url(${HERO_BG_URL})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: 'scroll',
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
                    genres={genres}
                    platforms={platforms}
                    onSteamImportOpen={steamImport.handleSteamImportOpen}
                    {...filterControlsProps}
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
