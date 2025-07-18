import "./AddGame.scss";
import {
    Box,
    Typography,
    Container,
    Paper,
    Alert,
    Grid,
    Divider,
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom hooks
import { useGameForm, genres, platforms } from './hooks/useGameForm';
import { useGameSubmission } from './hooks/useGameSubmission';

// Components
import GameFormBasics from './components/GameFormBasics';
import GameFormDetails from './components/GameFormDetails';
import GameFormDescription from './components/GameFormDescription';
import FormActions from './components/FormActions';

// Styled components
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
    const {
        formData,
        formErrors,
        handleChange,
        handleRatingChange,
        validateForm,
        getFormattedData
    } = useGameForm();

    const {
        loading,
        error,
        success,
        submitGame
    } = useGameSubmission();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const gameData = getFormattedData();
        await submitGame(gameData);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 10, mb: 5 }} className="add-game-container">
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
                        <GameFormBasics
                            formData={formData}
                            formErrors={formErrors}
                            handleChange={handleChange}
                            genres={genres}
                            platforms={platforms}
                        />
                        
                        <GameFormDetails
                            formData={formData}
                            formErrors={formErrors}
                            handleChange={handleChange}
                            handleRatingChange={handleRatingChange}
                        />
                        
                        <GameFormDescription
                            formData={formData}
                            handleChange={handleChange}
                        />
                        
                        <FormActions loading={loading} />
                    </Grid>
                </Box>
            </StyledPaper>
        </Container>
    );
}

export default AddGame;