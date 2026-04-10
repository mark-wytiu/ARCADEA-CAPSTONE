import React from 'react';
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
import { useNavigate } from 'react-router-dom';
import './FilterControls.scss';

const FilterControls = React.memo(
    ({
        genres,
        platforms,
        onSteamImportOpen,
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
        updateURLParams,
    }) => {
    const navigate = useNavigate();
    const navigateToAddGame = () => {
        navigate('/add-game');
    };

    return (
        <Paper 
            elevation={0} 
            className="filter-controls__container"
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
                    flexWrap: 'wrap',
                    width: '100%',
                    minWidth: 0,
                    overflow: 'visible',
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

                <Box
                    className="filter-controls__sort-wrap"
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 0.5,
                        flex: { xs: '1 1 100%', sm: '1 1 auto', md: '1 1 0%' },
                        minWidth: { xs: '100%', sm: 'min(100%, 200px)', md: 'min(100%, 220px)' },
                        maxWidth: '100%',
                    }}
                >
                    <FormControl className="filter-controls__select" sx={{ flex: '1 1 auto', minWidth: 0, maxWidth: '100%' }}>
                        <InputLabel id="sort-label">Sort By</InputLabel>
                        <Select
                            labelId="sort-label"
                            value={sortBy}
                            label="Sort By"
                            onChange={handleSortChange}
                        >
                            <MenuItem value="title">Title</MenuItem>
                            <MenuItem value="releaseDate">Release Date</MenuItem>
                            <MenuItem value="rating">Rating</MenuItem>
                            <MenuItem value="developer">Developer</MenuItem>
                        </Select>
                    </FormControl>
                    <Tooltip title={sortOrder === 'asc' ? 'Ascending — click for descending' : 'Descending — click for ascending'} arrow>
                        <IconButton
                            type="button"
                            onClick={toggleSortOrder}
                            size="small"
                            aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                            className="filter-controls__sort-button"
                            sx={{ mb: 0.5, flexShrink: 0 }}
                        >
                            <SortIcon sx={{ transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
                        </IconButton>
                    </Tooltip>
                </Box>

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
    }
);

FilterControls.displayName = 'FilterControls';

export default FilterControls; 