import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const GAMES_PER_PAGE = 8;

export const useGamePagination = (filteredGames) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Always get page from URL, don't store in local state
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const totalPages = useMemo(() => {
        const total = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
        return total > 0 ? total : 1;
    }, [filteredGames]);

    useEffect(() => {
        // Reset to page 1 if current page is out of bounds due to filtering
        if (currentPage > totalPages && totalPages > 0 && filteredGames.length > 0) {
            const newPage = Math.min(currentPage, totalPages);
            const newSearchParams = new URLSearchParams(searchParams);
            if (newPage === 1) {
                newSearchParams.delete('page');
            } else {
                newSearchParams.set('page', newPage.toString());
            }
            setSearchParams(newSearchParams);
        }
    }, [totalPages, currentPage, setSearchParams, filteredGames.length, searchParams]);

    const currentPageGames = useMemo(() => 
        filteredGames.slice(
            (currentPage - 1) * GAMES_PER_PAGE,
            currentPage * GAMES_PER_PAGE
        ),
    [filteredGames, currentPage]);

    const handlePageChange = (event, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (value === 1) {
            newSearchParams.delete('page');
        } else {
            newSearchParams.set('page', value.toString());
        }
        setSearchParams(newSearchParams);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return { page: currentPage, totalPages, currentPageGames, handlePageChange };
}; 