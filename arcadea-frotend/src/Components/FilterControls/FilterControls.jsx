import React, { useState, useEffect, useMemo } from 'react';
import {
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    IconButton,
    Tooltip,
    Paper,
    Box,
    Chip,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Custom hook for local filter state management
const useLocalFilters = (games, onFiltersChange) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
    const [selectedGenre, setSelectedGenre] = useState(() => searchParams.get('genre') || 'All');
    const [selectedPlatform, setSelectedPlatform] = useState(() => searchParams.get('platform') || 'All');
    const [sortBy, setSortBy] = useState(() => searchParams.get('sortBy') || 'title');
    const [sortOrder, setSortOrder] = useState(() => searchParams.get('sortOrder') || 'asc');
    
    // Sync filter states with URL parameters
    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
        setSelectedGenre(searchParams.get('genre') || 'All');
        setSelectedPlatform(searchParams.get('platform') || 'All');
        setSortBy(searchParams.get('sortBy') || 'title');
        setSortOrder(searchParams.get('sortOrder') || 'asc');
    }, [searchParams]);

    const updateURLParams = (updates) => {
        const newSearchParams = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([key, value]) => {
            if (value === '' || value === 'All' || (key === 'page' && value === 1)) {
                newSearchParams.delete(key);
            } else {
                newSearchParams.set(key, value.toString());
            }
        });
        setSearchParams(newSearchParams);
    };

    // Filter and sort games locally
    const filteredGames = useMemo(() => {
        let result = [...games];

        if (searchTerm) {
            result = result.filter(game =>
                game.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.developer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedGenre !== 'All') {
            result = result.filter(game => game.genre === selectedGenre);
        }

        if (selectedPlatform !== 'All') {
            result = result.filter(game => game.platforms && game.platforms.includes(selectedPlatform));
        }

        result.sort((a, b) => {
            let aValue = a[sortBy] || '';
            let bValue = b[sortBy] || '';

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

        return result;
    }, [games, searchTerm, selectedGenre, selectedPlatform, sortBy, sortOrder]);

    // Notify parent component when filtered games change
    useEffect(() => {
        onFiltersChange(filteredGames, { sortBy, sortOrder });
    }, [filteredGames, sortBy, sortOrder, onFiltersChange]);

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        updateURLParams({ sortBy: newSortBy });
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        updateURLParams({ sortOrder: newOrder });
    };

    const handleGenreChange = (event) => {
        const newGenre = event.target.value;
        setSelectedGenre(newGenre);
        updateURLParams({ genre: newGenre });
    };

    const handlePlatformChange = (event) => {
        const newPlatform = event.target.value;
        setSelectedPlatform(newPlatform);
        updateURLParams({ platform: newPlatform });
    };

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        updateURLParams({ search: newSearchTerm });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('All');
        setSelectedPlatform('All');
        setSortBy('title');
        setSortOrder('asc');
        setSearchParams(new URLSearchParams());
    };

    return {
        searchTerm,
        setSearchTerm,
        selectedGenre,
        setSelectedGenre,
        selectedPlatform,
        setSelectedPlatform,
        sortBy,
        sortOrder,
        handleSortChange,
        toggleSortOrder,
        handleGenreChange,
        handlePlatformChange,
        handleSearchChange,
        clearFilters,
        updateURLParams
    };
};

const FilterControls = ({ games, genres, platforms, onSteamImportOpen, onFiltersChange }) => {
    const navigate = useNavigate();
    const navigateToAddGame = () => {
        navigate('/add-game');
    };

    const {
        searchTerm,
        setSearchTerm,
        selectedGenre,
        setSelectedGenre,
        selectedPlatform,
        setSelectedPlatform,
        sortBy,
        sortOrder,
        handleSortChange,
        toggleSortOrder,
        handleGenreChange,
        handlePlatformChange,
        handleSearchChange,
        clearFilters,
        updateURLParams
    } = useLocalFilters(games, onFiltersChange);

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }} className="search-section">
            <Grid container spacing={2} alignItems="center">
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

                <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        onClick={clearFilters}
                        sx={{ flex: 1 }}
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
                    <Tooltip title="Import from Steam">
                        <Button
                            variant="outlined"
                            startIcon={<CloudDownloadIcon />}
                            onClick={onSteamImportOpen}
                            sx={{ minWidth: '100px' }}
                            color="secondary"
                        >
                            Steam
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>

            {(searchTerm || selectedGenre !== 'All' || selectedPlatform !== 'All') && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
                        Active Filters:
                    </Typography>
                    {searchTerm && (
                        <Chip
                            label={`Search: ${searchTerm}`}
                            size="small"
                            onDelete={() => {
                                setSearchTerm('');
                                updateURLParams({ search: '' });
                            }}
                            className="filter-chip"
                        />
                    )}
                    {selectedGenre !== 'All' && (
                        <Chip
                            label={`Genre: ${selectedGenre}`}
                            size="small"
                            onDelete={() => {
                                setSelectedGenre('All');
                                updateURLParams({ genre: 'All' });
                            }}
                            className="filter-chip"
                        />
                    )}
                    {selectedPlatform !== 'All' && (
                        <Chip
                            label={`Platform: ${selectedPlatform}`}
                            size="small"
                            onDelete={() => {
                                setSelectedPlatform('All');
                                updateURLParams({ platform: 'All' });
                            }}
                            className="filter-chip"
                        />
                    )}
                </Box>
            )}
        </Paper>
    );
};

export default FilterControls; 