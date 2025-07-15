import React from 'react';
import {
    Grid,
    Button,
    Stack,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FormActions = ({ loading }) => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                    variant="outlined"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ minWidth: '120px' }}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? 'Adding...' : 'Add Game'}
                </Button>
            </Stack>
        </Grid>
    );
};

export default FormActions; 