import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
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
import './FilterControls.scss';

// Debounce utility function
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Custom hook for local filter state management
const useLocalFilters = (games, onFiltersChange) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(() => searchParams.get('search') || '');
    const [selectedGenre, setSelectedGenre] = useState(() => searchParams.get('genre') || 'All');
    const [selectedPlatform, setSelectedPlatform] = useState(() => searchParams.get('platform') || 'All');
    const [sortBy, setSortBy] = useState(() => searchParams.get('sortBy') || 'title');
    const [sortOrder, setSortOrder] = useState(() => searchParams.get('sortOrder') || 'asc');

    const updateURLParams = useCallback((updates) => {
        const newSearchParams = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([key, value]) => {
            if (value === '' || value === 'All' || (key === 'page' && value === 1)) {
                newSearchParams.delete(key);
            } else {
                newSearchParams.set(key, value.toString());
            }
        });
        setSearchParams(newSearchParams);
    }, [searchParams, setSearchParams]);
    
    // Debounced search update
    const debouncedUpdateSearch = useRef(
        debounce((value) => {
            setDebouncedSearchTerm(value);
            updateURLParams({ search: value });
        }, 300)
    ).current;

    // Sync filter states with URL parameters
    useEffect(() => {
        const urlSearch = searchParams.get('search') || '';
        setSearchTerm(urlSearch);
        setDebouncedSearchTerm(urlSearch);
        setSelectedGenre(searchParams.get('genre') || 'All');
        setSelectedPlatform(searchParams.get('platform') || 'All');
        setSortBy(searchParams.get('sortBy') || 'title');
        setSortOrder(searchParams.get('sortOrder') || 'asc');
    }, [searchParams]);

    // Filter and sort games locally (using debounced search term)
    const filteredGames = useMemo(() => {
        let result = [...games];

        if (debouncedSearchTerm) {
            result = result.filter(game =>
                game.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                game.developer?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                game.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
        }

        if (selectedGenre !== 'All') {
            result = result.filter(game => game.genre === selectedGenre);
        }

        if (selectedPlatform !== 'All') {
            result = result.filter(game => 
                (game.platform === selectedPlatform) || 
                (game.platforms && game.platforms.includes(selectedPlatform))
            );
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
    }, [games, debouncedSearchTerm, selectedGenre, selectedPlatform, sortBy, sortOrder]);

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
        // Debounce the URL update and filter calculation
        debouncedUpdateSearch(newSearchTerm);
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

const FilterControls = React.memo(({ games, genres, platforms, onSteamImportOpen, onFiltersChange }) => {
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
        <Paper 
            elevation={0} 
            className="filter-controls__container search-section"
            sx={{ 
                mb: 4,
                width: '100%',
                maxWidth: '100%',
                paddingTop: { xs: 2, sm: 2.5, md: 3 },
                paddingBottom: { xs: 2, sm: 2.5, md: 3 },
                paddingLeft: { xs: '16px', sm: '24px', md: '24px', lg: '32px', xl: '40px' },
                paddingRight: { xs: '16px', sm: '24px', md: '24px', lg: '32px', xl: '40px' },
                boxSizing: 'border-box',
            }}
        >
            <Box 
                className="filter-controls__row"
                sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    alignItems: 'center',
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                    width: '100%',
                    minWidth: 0,
                    overflow: 'hidden'
                }}
            >
                <TextField
                    placeholder="Search games, developers..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    variant="outlined"
                    className="filter-controls__search-field"
                    sx={{ 
                        flex: { xs: '1 1 100%', md: '2 1 0%' }, 
                        minWidth: { xs: '100%', md: '150px' },
                        maxWidth: '100%'
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <FormControl className="filter-controls__select" sx={{ 
                    flex: { xs: '1 1 auto', md: '1 1 0%' }, 
                    minWidth: { xs: '150px', md: '130px' },
                    maxWidth: '100%'
                }}>
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

                <FormControl className="filter-controls__select" sx={{ 
                    flex: { xs: '1 1 auto', md: '1 1 0%' }, 
                    minWidth: { xs: '150px', md: '130px' },
                    maxWidth: '100%'
                }}>
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

                <FormControl className="filter-controls__select" sx={{ 
                    flex: { xs: '1 1 auto', md: '1 1 0%' }, 
                    minWidth: { xs: '150px', md: '130px' },
                    maxWidth: '100%'
                }}>
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
                                    className="filter-controls__sort-button"
                                >
                                    <SortIcon sx={{ transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
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

                <Box sx={{ 
                    display: 'flex', 
                    gap: 1.5, 
                    alignItems: 'center', 
                    flex: { xs: '1 1 100%', md: '0 0 auto' },
                    flexShrink: 0,
                    minWidth: 0
                }}>
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        onClick={clearFilters}
                        className="filter-controls__clear-button"
                        sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                    >
                        Clear
                    </Button>
                    <Tooltip title="Add New Game" arrow>
                        <Button
                            variant="contained"
                            onClick={navigateToAddGame}
                            className="filter-controls__add-button"
                            sx={{ flexShrink: 0 }}
                        >
                            <AddCircleIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Import from Steam" arrow>
                        <Button
                            variant="outlined"
                            startIcon={<CloudDownloadIcon />}
                            onClick={onSteamImportOpen}
                            className="filter-controls__steam-button"
                            sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                        >
                            Steam
                        </Button>
                    </Tooltip>
                </Box>
            </Box>

            {(searchTerm || selectedGenre !== 'All' || selectedPlatform !== 'All') && (
                <Box className="filter-controls__chips-container" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                    <Typography variant="body2" className="filter-controls__filters-label">
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
                            className="filter-controls__chip"
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
                            className="filter-controls__chip"
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
                            className="filter-controls__chip"
                        />
                    )}
                </Box>
            )}
        </Paper>
    );
});

FilterControls.displayName = 'FilterControls';

export default FilterControls; 