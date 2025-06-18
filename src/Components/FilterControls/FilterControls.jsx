import React from 'react';
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
import { useNavigate } from 'react-router-dom';

const FilterControls = ({ controls, genres, platforms }) => {
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
        clearFilters
    } = controls;

    const navigate = useNavigate();
    const navigateToAddGame = () => {
        navigate('/add-game');
    };

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
                                // You might want to update URL params here as well
                            }}
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
    );
};

export default FilterControls; 