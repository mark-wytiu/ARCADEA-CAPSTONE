import axios from 'axios';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Debounce utility
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Create axios instance with common config
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for caching
apiClient.interceptors.request.use(
    (config) => {
        // Add timestamp to track request time
        config.metadata = { startTime: new Date() };
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor for logging and caching
apiClient.interceptors.response.use(
    (response) => {
        const duration = new Date() - response.config.metadata.startTime;
        console.log(`API Request to ${response.config.url} took ${duration}ms`);
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// Cache helper functions
const getCacheKey = (url, params) => {
    return `${url}?${new URLSearchParams(params || {}).toString()}`;
};

const isValidCache = (cacheItem) => {
    return cacheItem && (Date.now() - cacheItem.timestamp) < CACHE_DURATION;
};

const getFromCache = (key) => {
    const cacheItem = cache.get(key);
    if (isValidCache(cacheItem)) {
        return cacheItem.data;
    }
    cache.delete(key);
    return null;
};

const setCache = (key, data) => {
    cache.set(key, {
        data,
        timestamp: Date.now()
    });
};

// Optimized API methods
export const optimizedGameAPI = {
    getAllGames: async (params = {}) => {
        const cacheKey = getCacheKey('/games', params);
        const cachedData = getFromCache(cacheKey);
        
        if (cachedData) {
            console.log('Returning cached games data');
            return cachedData;
        }

        try {
            const response = await apiClient.get('/games', { params });
            const games = response.data;
            setCache(cacheKey, games);
            return games;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    },

    getGameById: async (id) => {
        const cacheKey = getCacheKey(`/games/${id}`);
        const cachedData = getFromCache(cacheKey);
        
        if (cachedData) {
            console.log(`Returning cached game data for ID: ${id}`);
            return cachedData;
        }

        try {
            const response = await apiClient.get(`/games/${id}`);
            const game = response.data;
            setCache(cacheKey, game);
            return game;
        } catch (error) {
            console.error(`Error fetching game ${id}:`, error);
            throw error;
        }
    },

    // Debounced search for better performance
    searchGames: debounce(async (query, params = {}) => {
        const searchParams = { ...params, q: query };
        const cacheKey = getCacheKey('/games/search', searchParams);
        const cachedData = getFromCache(cacheKey);
        
        if (cachedData) {
            console.log('Returning cached search results');
            return cachedData;
        }

        try {
            const response = await apiClient.get('/games/search', { params: searchParams });
            const results = response.data;
            setCache(cacheKey, results);
            return results;
        } catch (error) {
            console.error('Error searching games:', error);
            throw error;
        }
    }, 300),

    // Prefetch next page for better UX
    prefetchNextPage: async (currentPage, params = {}) => {
        const nextPageParams = { ...params, page: currentPage + 1 };
        const cacheKey = getCacheKey('/games', nextPageParams);
        
        if (!getFromCache(cacheKey)) {
            try {
                const response = await apiClient.get('/games', { params: nextPageParams });
                setCache(cacheKey, response.data);
                console.log(`Prefetched page ${currentPage + 1}`);
            } catch (error) {
                console.error('Error prefetching next page:', error);
            }
        }
    },

    // Clear cache when needed
    clearCache: (pattern = null) => {
        if (pattern) {
            for (const key of cache.keys()) {
                if (key.includes(pattern)) {
                    cache.delete(key);
                }
            }
        } else {
            cache.clear();
        }
    }
};

export default optimizedGameAPI;
