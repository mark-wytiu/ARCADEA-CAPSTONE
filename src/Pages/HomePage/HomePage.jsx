import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { gameAPI } from "../../services/api";
import GameCard from "../../Components/GameCard/GameCard";
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    TextField,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Chip,
    Fade,
    Pagination,
    CircularProgress,
    IconButton,
    Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import bgImg from "../../Assets/Images/carl-raw-m3hn2Kn5Bns-unsplash.jpg";
import "./HomePage.scss";

// Number of games per page
const GAMES_PER_PAGE = 8;

function HomePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'All');
    const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'All');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'title');
    const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'asc');

    // Pagination
    const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [totalPages, setTotalPages] = useState(1);

    // Unique genres and platforms for filters
    const [genres, setGenres] = useState(['All']);
    const [platforms, setPlatforms] = useState(['All']);

    // Helper function to update URL parameters
    const updateURLParams = (updates) => {
        const newSearchParams = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([key, value]) => {
            if (value === '' || value === 'All') {
                newSearchParams.delete(key);
            } else {
                newSearchParams.set(key, value.toString());
            }
        });
        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const allGames = await gameAPI.getAllGames();
                setGames(allGames);
                setFilteredGames(allGames);

                // Extract unique genres and platforms
                const uniqueGenres = ['All', ...new Set(allGames.map(game => game.genre).filter(Boolean))];
                const uniquePlatforms = ['All', ...new Set(allGames.map(game => game.platform).filter(Boolean))];

                setGenres(uniqueGenres);
                setPlatforms(uniquePlatforms);
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

    // Apply filtering and sorting to games
    useEffect(() => {
        let result = [...games];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(game =>
                game.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.developer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply genre filter
        if (selectedGenre !== 'All') {
            result = result.filter(game => game.genre === selectedGenre);
        }

        // Apply platform filter
        if (selectedPlatform !== 'All') {
            result = result.filter(game => game.platform === selectedPlatform);
        }

        // Apply sorting
        result.sort((a, b) => {
            let aValue = a[sortBy] || '';
            let bValue = b[sortBy] || '';

            // Handle numeric values
            if (sortBy === 'rating' || sortBy === 'price') {
                aValue = Number(aValue) || 0;
                bValue = Number(bValue) || 0;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredGames(result);
        setTotalPages(Math.ceil(result.length / GAMES_PER_PAGE));
        
        // Only reset to page 1 if the current page would be out of bounds
        const newTotalPages = Math.ceil(result.length / GAMES_PER_PAGE);
        if (page > newTotalPages && newTotalPages > 0) {
            setPage(1);
        }
    }, [games, searchTerm, selectedGenre, selectedPlatform, sortBy, sortOrder, page]);

    // Calculate current page games
    const currentPageGames = filteredGames.slice(
        (page - 1) * GAMES_PER_PAGE,
        page * GAMES_PER_PAGE
    );

    const handlePageChange = (event, value) => {
        setPage(value);
        
        // Update URL parameters
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', value.toString());
        setSearchParams(newSearchParams);
        
        // Scroll to top when changing pages
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        updateURLParams({ sortBy: event.target.value });
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        updateURLParams({ sortOrder: newOrder });
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
        updateURLParams({ genre: event.target.value, page: 1 });
    };

    const handlePlatformChange = (event) => {
        setSelectedPlatform(event.target.value);
        updateURLParams({ platform: event.target.value, page: 1 });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        updateURLParams({ search: event.target.value, page: 1 });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('All');
        setSelectedPlatform('All');
        setSortBy('title');
        setSortOrder('asc');
        setPage(1);
        setSearchParams(new URLSearchParams()); // Clear all URL parameters
    };

    const navigateToAddGame = () => {
        navigate('/add-game');
    };

    return (
        <Box sx={{
            width: '100%',
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            minHeight: '100vh',
            paddingY: 4
        }} className="home-page-container">
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{
                    textAlign: 'center',
                    mb: 5,
                    mt: 2,
                    position: 'relative',
                    zIndex: 1
                }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            color: 'white',
                            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                            fontWeight: 800,
                            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                            letterSpacing: '0.05em',
                            mb: 2
                        }}
                    >
                        ARCADEA
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'white',
                            textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                            mb: 4,
                            fontSize: { xs: '1.2rem', sm: '1.5rem' },
                            fontWeight: 300,
                            letterSpacing: '0.02em'
                        }}
                    >
                        Discover Your Next Gaming Adventure
                    </Typography>
                </Box>

                {/* Controls Section */}
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }} className="search-section">
                    <Grid container spacing={2} alignItems="center">
                        {/* Search */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="Search games, developers..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Filters */}
                        <Grid item xs={12} sm={6} md={2}>
                            <FormControl fullWidth>
                                <InputLabel id="genre-filter-label">Genre</InputLabel>
                                <Select
                                    labelId="genre-filter-label"
                                    value={selectedGenre}
                                    label="Genre"
                                    onChange={handleGenreChange}
                                >
                                    {genres.map((genre) => (
                                        <MenuItem key={genre} value={genre}>
                                            {genre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2}>
                            <FormControl fullWidth>
                                <InputLabel id="platform-filter-label">Platform</InputLabel>
                                <Select
                                    labelId="platform-filter-label"
                                    value={selectedPlatform}
                                    label="Platform"
                                    onChange={handlePlatformChange}
                                >
                                    {platforms.map((platform) => (
                                        <MenuItem key={platform} value={platform}>
                                            {platform}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Sorting */}
                        <Grid item xs={12} sm={6} md={2}>
                            <FormControl fullWidth>
                                <InputLabel id="sort-label">Sort By</InputLabel>
                                <Select
                                    labelId="sort-label"
                                    value={sortBy}
                                    label="Sort By"
                                    onChange={handleSortChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={toggleSortOrder}
                                                edge="end"
                                                size="small"
                                                sx={{ mr: 1 }}
                                            >
                                                <SortIcon sx={{ transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none' }} className="sort-icon" />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="title">Title</MenuItem>
                                    <MenuItem value="releaseDate">Release Date</MenuItem>
                                    <MenuItem value="rating">Rating</MenuItem>
                                    <MenuItem value="developer">Developer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Control Buttons */}
                        <Grid item xs={12} sm={6} md={2} sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="outlined"
                                startIcon={<FilterListIcon />}
                                onClick={clearFilters}
                                fullWidth
                            >
                                Clear
                            </Button>
                            <Tooltip title="Add New Game">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={navigateToAddGame}
                                    sx={{ minWidth: '50px', width: '50px' }}
                                    className="add-button"
                                >
                                    <AddCircleIcon />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>

                    {/* Active Filters Display */}
                    {(searchTerm || selectedGenre !== 'All' || selectedPlatform !== 'All') && (
                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
                                Active Filters:
                            </Typography>
                            {searchTerm && (
                                <Chip
                                    label={`Search: ${searchTerm}`}
                                    size="small"
                                    onDelete={() => setSearchTerm('')}
                                    className="filter-chip"
                                />
                            )}
                            {selectedGenre !== 'All' && (
                                <Chip
                                    label={`Genre: ${selectedGenre}`}
                                    size="small"
                                    onDelete={() => setSelectedGenre('All')}
                                    className="filter-chip"
                                />
                            )}
                            {selectedPlatform !== 'All' && (
                                <Chip
                                    label={`Platform: ${selectedPlatform}`}
                                    size="small"
                                    onDelete={() => setSelectedPlatform('All')}
                                    className="filter-chip"
                                />
                            )}
                        </Box>
                    )}
                </Paper>

                {/* Results Section */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }} className="loading-container">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                        <Typography variant="h5" color="error">
                            {error}
                        </Typography>
                    </Paper>
                ) : filteredGames.length === 0 ? (
                    <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                        <Typography variant="h5">
                            No games found matching your filters.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={clearFilters}
                            sx={{ mt: 2 }}
                        >
                            Clear All Filters
                        </Button>
                    </Paper>
                ) : (
                    <>
                        {/* Results count and sorting info */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 3,
                                mt: 4,
                                px: 2
                            }}
                            className="game-count"
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'white',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                                    fontWeight: 500,
                                    fontSize: '1rem'
                                }}
                            >
                                Showing {currentPageGames.length} of {filteredGames.length} games
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'white',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                                    fontWeight: 400
                                }}
                            >
                                Sorted by: {sortBy} ({sortOrder === 'asc' ? 'ascending' : 'descending'})
                            </Typography>
                        </Box>

                        {/* Games Grid */}
                        <Fade in={!loading}>
                            <Grid
                                container
                                spacing={3}
                                sx={{
                                    justifyContent: 'flex-start',
                                    px: 1
                                }}
                            >
                                <GameCard games={currentPageGames} />
                            </Grid>
                        </Fade>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
                                <Paper elevation={3} sx={{ borderRadius: 2, px: 2, py: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        color="primary"
                                        showFirstButton
                                        showLastButton
                                        size="large"
                                    />
                                </Paper>
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
}

export default HomePage;
