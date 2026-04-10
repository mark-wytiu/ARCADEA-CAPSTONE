import { useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const GAMES_PER_PAGE = 8;

export const useGamePagination = (filteredGames) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get('page');
    const parsedPage = parseInt(pageParam || '1', 10);
    const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    const totalPages = useMemo(() => {
        const total = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
        return total > 0 ? total : 1;
    }, [filteredGames]);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0 && filteredGames.length > 0) {
            const newPage = Math.min(currentPage, totalPages);
            setSearchParams((prev) => {
                const newSearchParams = new URLSearchParams(prev);
                if (newPage === 1) {
                    newSearchParams.delete('page');
                } else {
                    newSearchParams.set('page', String(newPage));
                }
                return newSearchParams;
            });
        }
    }, [totalPages, currentPage, setSearchParams, filteredGames.length]);

    const currentPageGames = useMemo(
        () =>
            filteredGames.slice(
                (currentPage - 1) * GAMES_PER_PAGE,
                currentPage * GAMES_PER_PAGE
            ),
        [filteredGames, currentPage]
    );

    const handlePageChange = useCallback((event, value) => {
        setSearchParams((prev) => {
            const newSearchParams = new URLSearchParams(prev);
            if (value === 1) {
                newSearchParams.delete('page');
            } else {
                newSearchParams.set('page', value.toString());
            }
            return newSearchParams;
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [setSearchParams]);

    return { page: currentPage, totalPages, currentPageGames, handlePageChange };
};
