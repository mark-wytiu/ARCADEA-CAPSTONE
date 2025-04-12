import "./AddGame.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameAPI } from "../../services/api";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    Alert,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
    Grid,
    Rating,
    Divider,
    Chip,
    Stack
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
}));

const FormTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
    fontWeight: 600,
    textAlign: 'center',
}));

function AddGame() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Form validation state
    const [formErrors, setFormErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        releaseDate: '',
        developer: '',
        publisher: '',
        platform: '',
        rating: 0,
        description: '',
        image: '',
        price: '',
    });

    // Genre options
    const genres = [
        'Action',
        'Adventure',
        'RPG',
        'Strategy',
        'Simulation',
        'Sports',
        'Racing',
        'Puzzle',
        'Fighting',
        'Shooter',
        'Platformer',
        'Survival',
        'Horror',
        'Indie',
        'MMO',
        'Open World',
        'Other'
    ];

    // Platform options
    const platforms = [
        'PC',
        'PlayStation 5',
        'PlayStation 4',
        'Xbox Series X/S',
        'Xbox One',
        'Nintendo Switch',
        'Mobile',
        'Other'
    ];

    const validateForm = () => {
        const errors = {};

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!formData.genre) {
            errors.genre = 'Please select a genre';
        }

        if (!formData.releaseDate) {
            errors.releaseDate = 'Release date is required';
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.releaseDate) &&
            !/^\d{4}$/.test(formData.releaseDate)) {
            errors.releaseDate = 'Please use YYYY-MM-DD or YYYY format';
        }

        if (formData.price && isNaN(parseFloat(formData.price))) {
            errors.price = 'Price must be a number';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Clear error when field is edited
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleRatingChange = (newValue) => {
        setFormData(prevData => ({
            ...prevData,
            rating: newValue
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Format the data
            const gameData = {
                ...formData,
                rating: Number(formData.rating),
                price: formData.price ? parseFloat(formData.price) : null
            };

            await gameAPI.addGame(gameData);
            setSuccess(true);

            // Reset form after successful submission
            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (error) {
            console.error("Error adding game:", error);
            setError("Failed to add game. Please try again.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }} className="add-game-container">
            <StyledPaper>
                <FormTitle variant="h4" component="h1">
                    Add New Game
                </FormTitle>

                <Divider sx={{ mb: 4 }}>
                    <Chip label="Game Information" color="primary" />
                </Divider>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Game added successfully! Redirecting to home page...
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={3}>
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

                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    loading={loading}
                                    sx={{ minWidth: '120px' }}
                                >
                                    Add Game
                                </LoadingButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </StyledPaper>
        </Container>
    );
}

export default AddGame;