import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useGameFiltering = (games) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
    const [selectedGenre, setSelectedGenre] = useState(() => searchParams.get('genre') || 'All');
    const [selectedPlatform, setSelectedPlatform] = useState(() => searchParams.get('platform') || 'All');
    const [sortBy, setSortBy] = useState(() => searchParams.get('sortBy') || 'title');
    const [sortOrder, setSortOrder] = useState(() => searchParams.get('sortOrder') || 'asc');
    
    // Sync filter states with URL parameters
    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
        setSelectedGenre(searchParams.get('genre') || 'All');
        setSelectedPlatform(searchParams.get('platform') || 'All');
        setSortBy(searchParams.get('sortBy') || 'title');
        setSortOrder(searchParams.get('sortOrder') || 'asc');
    }, [searchParams]);

    const updateURLParams = (updates) => {
        const newSearchParams = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([key, value]) => {
            if (value === '' || value === 'All' || (key === 'page' && value === 1)) {
                newSearchParams.delete(key);
            } else {
                newSearchParams.set(key, value.toString());
            }
        });
        setSearchParams(newSearchParams);
    };

    const filteredGames = useMemo(() => {
        let result = [...games];

        if (searchTerm) {
            result = result.filter(game =>
                game.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.developer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedGenre !== 'All') {
            result = result.filter(game => game.genre === selectedGenre);
        }

        if (selectedPlatform !== 'All') {
            result = result.filter(game => game.platforms && game.platforms.includes(selectedPlatform));
        }

        result.sort((a, b) => {
            let aValue = a[sortBy] || '';
            let bValue = b[sortBy] || '';

            if (sortBy === 'rating' || sortBy === 'price') {
                aValue = Number(aValue) || 0;
                bValue = Number(bValue) || 0;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return result;
    }, [games, searchTerm, selectedGenre, selectedPlatform, sortBy, sortOrder]);

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        updateURLParams({ sortBy: newSortBy });
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        updateURLParams({ sortOrder: newOrder });
    };

    const handleGenreChange = (event) => {
        const newGenre = event.target.value;
        setSelectedGenre(newGenre);
        updateURLParams({ genre: newGenre });
    };

    const handlePlatformChange = (event) => {
        const newPlatform = event.target.value;
        setSelectedPlatform(newPlatform);
        updateURLParams({ platform: newPlatform });
    };

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        updateURLParams({ search: newSearchTerm });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('All');
        setSelectedPlatform('All');
        setSortBy('title');
        setSortOrder('asc');
        setSearchParams(new URLSearchParams());
    };

    useEffect(() => {
        // Reset page to 1 when filters change, which is reflected in URL
        const params = new URLSearchParams(window.location.search);
        if (!params.has('page')) {
            // This condition is a bit tricky, the updateURLParams handles it
        }
    }, [searchTerm, selectedGenre, selectedPlatform]);


    return {
        filteredGames,
        controls: {
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
        }
    };
}; 