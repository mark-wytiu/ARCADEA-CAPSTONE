import React from 'react';
import {
    Grid,
    TextField
} from '@mui/material';

const GameFormDescription = ({ formData, handleChange }) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="image"
                    label="Image URL"
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/game-image.jpg"
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="description"
                    label="Game Description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </Grid>
        </>
    );
};

export default GameFormDescription; 