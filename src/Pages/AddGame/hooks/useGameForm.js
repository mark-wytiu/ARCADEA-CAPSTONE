import { useState } from 'react';

const initialFormData = {
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
};

export const useGameForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState({});

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

    const resetForm = () => {
        setFormData(initialFormData);
        setFormErrors({});
    };

    const getFormattedData = () => {
        return {
            ...formData,
            rating: Number(formData.rating),
            price: formData.price ? parseFloat(formData.price) : null
        };
    };

    return {
        formData,
        formErrors,
        handleChange,
        handleRatingChange,
        validateForm,
        resetForm,
        getFormattedData
    };
};

// Export genre and platform options
export const genres = [
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

export const platforms = [
    'PC',
    'PlayStation 5',
    'PlayStation 4',
    'Xbox Series X/S',
    'Xbox One',
    'Nintendo Switch',
    'Mobile',
    'Other'
]; 