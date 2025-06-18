import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const GAMES_PER_PAGE = 8;

export const useGamePagination = (filteredGames) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);

    const totalPages = useMemo(() => {
        const total = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
        return total > 0 ? total : 1;
    }, [filteredGames]);

    useEffect(() => {
        // Reset to page 1 if current page is out of bounds
        if (page > totalPages) {
            setPage(1);
            // URL param is updated to reflect page 1 (or its absence)
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete('page');
            setSearchParams(newSearchParams);
        }
    }, [totalPages, page, searchParams, setSearchParams]);

    const currentPageGames = useMemo(() => 
        filteredGames.slice(
            (page - 1) * GAMES_PER_PAGE,
            page * GAMES_PER_PAGE
        ),
    [filteredGames, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
        
        const newSearchParams = new URLSearchParams(searchParams);
        if (value === 1) {
            newSearchParams.delete('page');
        } else {
            newSearchParams.set('page', value.toString());
        }
        setSearchParams(newSearchParams);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return { page, totalPages, currentPageGames, handlePageChange };
}; 