import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

/**
 * URL-backed filter state and a single derived filtered/sorted list for the home page.
 */
export function useHomePageFilters(games) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(() => searchParams.get('search') || '');
    const [selectedGenre, setSelectedGenre] = useState(() => searchParams.get('genre') || 'All');
    const [selectedPlatform, setSelectedPlatform] = useState(() => searchParams.get('platform') || 'All');
    const [sortBy, setSortBy] = useState(() => searchParams.get('sortBy') || 'title');
    const [sortOrder, setSortOrder] = useState(() => searchParams.get('sortOrder') || 'asc');

    const updateURLParams = useCallback((updates) => {
        setSearchParams((prev) => {
            const newSearchParams = new URLSearchParams(prev);
            Object.entries(updates).forEach(([key, value]) => {
                if (value === '' || value === 'All' || (key === 'page' && value === 1)) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, value.toString());
                }
            });
            return newSearchParams;
        });
    }, [setSearchParams]);

    const debouncedUpdateSearch = useRef(
        debounce((value) => {
            setDebouncedSearchTerm(value);
            updateURLParams({ search: value });
        }, 300)
    ).current;

    useEffect(() => {
        const urlSearch = searchParams.get('search') || '';
        setSearchTerm(urlSearch);
        setDebouncedSearchTerm(urlSearch);
        setSelectedGenre(searchParams.get('genre') || 'All');
        setSelectedPlatform(searchParams.get('platform') || 'All');
        setSortBy(searchParams.get('sortBy') || 'title');
        setSortOrder(searchParams.get('sortOrder') || 'asc');
    }, [searchParams]);

    const filteredGames = useMemo(() => {
        let result = [...games];

        if (debouncedSearchTerm) {
            const q = debouncedSearchTerm.toLowerCase();
            result = result.filter(
                (game) =>
                    game.title?.toLowerCase().includes(q) ||
                    game.developer?.toLowerCase().includes(q) ||
                    game.description?.toLowerCase().includes(q)
            );
        }

        if (selectedGenre !== 'All') {
            result = result.filter((game) => game.genre === selectedGenre);
        }

        if (selectedPlatform !== 'All') {
            result = result.filter(
                (game) =>
                    game.platform === selectedPlatform ||
                    (game.platforms && game.platforms.includes(selectedPlatform))
            );
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
            }
            return aValue < bValue ? 1 : -1;
        });

        return result;
    }, [games, debouncedSearchTerm, selectedGenre, selectedPlatform, sortBy, sortOrder]);

    const handleSortChange = useCallback(
        (event) => {
            const newSortBy = event.target.value;
            setSortBy(newSortBy);
            updateURLParams({ sortBy: newSortBy });
        },
        [updateURLParams]
    );

    const toggleSortOrder = useCallback(() => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        updateURLParams({ sortOrder: newOrder });
    }, [sortOrder, updateURLParams]);

    const handleGenreChange = useCallback(
        (event) => {
            const newGenre = event.target.value;
            setSelectedGenre(newGenre);
            updateURLParams({ genre: newGenre });
        },
        [updateURLParams]
    );

    const handlePlatformChange = useCallback(
        (event) => {
            const newPlatform = event.target.value;
            setSelectedPlatform(newPlatform);
            updateURLParams({ platform: newPlatform });
        },
        [updateURLParams]
    );

    const handleSearchChange = useCallback(
        (event) => {
            const newSearchTerm = event.target.value;
            setSearchTerm(newSearchTerm);
            debouncedUpdateSearch(newSearchTerm);
        },
        [debouncedUpdateSearch]
    );

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedGenre('All');
        setSelectedPlatform('All');
        setSortBy('title');
        setSortOrder('asc');
        setSearchParams(new URLSearchParams());
    }, [setSearchParams]);

    const filterControlsProps = useMemo(
        () => ({
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
            clearFilters,
            updateURLParams,
        }),
        [
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
            clearFilters,
            updateURLParams,
        ]
    );

    return {
        filteredGames,
        sortInfo: { sortBy, sortOrder },
        filterControlsProps,
    };
}
