import "./AddGame.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameAPI } from "../../services/api";
import { Box, TextField, Button, Typography, Container, Paper, Alert } from '@mui/material';

function AddGame() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        releaseDate: '',
        developer: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);

            await gameAPI.addGame(formData);
            navigate('/');
        } catch (error) {
            console.error("Error adding game:", error);
            setError("Failed to add game. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                    Add New Game
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Game Title"
                        name="title"
                        autoFocus
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="genre"
                        label="Genre"
                        id="genre"
                        value={formData.genre}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="releaseDate"
                        label="Release Date"
                        id="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="developer"
                        label="Developer"
                        id="developer"
                        value={formData.developer}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="image"
                        label="Image URL"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Game'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default AddGame;