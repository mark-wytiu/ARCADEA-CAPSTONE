import React from 'react';
import {
    Grid,
    TextField,
    Typography,
    Rating
} from '@mui/material';

const GameFormDetails = ({ formData, formErrors, handleChange, handleRatingChange }) => {
    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    name="price"
                    label="Price ($)"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    error={!!formErrors.price}
                    helperText={formErrors.price}
                    InputProps={{
                        startAdornment: "$"
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    name="developer"
                    label="Developer"
                    id="developer"
                    value={formData.developer}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    name="publisher"
                    label="Publisher"
                    id="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="rating"
                    value={formData.rating}
                    onChange={(event, newValue) => {
                        handleRatingChange(newValue);
                    }}
                    precision={0.5}
                    size="large"
                />
            </Grid>
        </>
    );
};

export default GameFormDetails; 