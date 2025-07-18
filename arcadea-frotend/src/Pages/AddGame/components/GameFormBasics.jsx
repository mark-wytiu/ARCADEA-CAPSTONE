import React from 'react';
import {
    Grid,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    FormHelperText
} from '@mui/material';

const GameFormBasics = ({ formData, formErrors, handleChange, genres, platforms }) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="title"
                    label="Game Title"
                    name="title"
                    autoFocus
                    value={formData.title}
                    onChange={handleChange}
                    error={!!formErrors.title}
                    helperText={formErrors.title}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!formErrors.genre}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        label="Genre"
                        onChange={handleChange}
                    >
                        {genres.map(genre => (
                            <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                        ))}
                    </Select>
                    {formErrors.genre && <FormHelperText>{formErrors.genre}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="platform-label">Platform</InputLabel>
                    <Select
                        labelId="platform-label"
                        id="platform"
                        name="platform"
                        value={formData.platform}
                        label="Platform"
                        onChange={handleChange}
                    >
                        {platforms.map(platform => (
                            <MenuItem key={platform} value={platform}>{platform}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="releaseDate"
                    label="Release Date (YYYY-MM-DD)"
                    id="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    error={!!formErrors.releaseDate}
                    helperText={formErrors.releaseDate || "Format: YYYY-MM-DD or YYYY"}
                />
            </Grid>
        </>
    );
};

export default GameFormBasics; 