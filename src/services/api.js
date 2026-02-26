import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5050';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Request deduplication - prevent duplicate concurrent requests
const pendingRequests = new Map();

// Debounce utility for search operations
const debounce = (func, delay) => {
	let timeoutId;
	return (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(null, args), delay);
	};
};

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

// Clear cache utility (useful for cache invalidation)
export const clearCache = (pattern = null) => {
	if (pattern) {
		for (const key of cache.keys()) {
			if (key.includes(pattern)) {
				cache.delete(key);
			}
		}
	} else {
		cache.clear();
	}
};

// Create axios instance with default config
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000, // 10 second timeout
	headers: {
		"Content-Type": "application/json",
	},
});

// Add request interceptor for request timing (useful for performance monitoring)
apiClient.interceptors.request.use(
	(config) => {
		// Add timestamp to track request time
		config.metadata = { startTime: new Date() };
		return config;
	},
	(error) => Promise.reject(error)
);

// Add response interceptor for error handling and performance logging
apiClient.interceptors.response.use(
	(response) => {
		// Log request duration in development
		if (process.env.NODE_ENV === 'development' && response.config.metadata) {
			const duration = new Date() - response.config.metadata.startTime;
			console.log(`API Request to ${response.config.url} took ${duration}ms`);
		}
		return response;
	},
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

// Game related API calls with caching
export const gameAPI = {
	// Get all games (with caching and request deduplication)
	getAllGames: async (params = {}) => {
		const cacheKey = getCacheKey("/games", params);
		const cachedData = getFromCache(cacheKey);
		
		if (cachedData) {
			return cachedData;
		}

		// Check if there's already a pending request for this key
		if (pendingRequests.has(cacheKey)) {
			return pendingRequests.get(cacheKey);
		}

		try {
			const requestPromise = apiClient.get("/games", { params }).then(response => {
				const games = response.data;
				setCache(cacheKey, games);
				pendingRequests.delete(cacheKey);
				return games;
			}).catch(error => {
				pendingRequests.delete(cacheKey);
				throw error;
			});

			pendingRequests.set(cacheKey, requestPromise);
			return requestPromise;
		} catch (error) {
			pendingRequests.delete(cacheKey);
			throw error;
		}
	},

	// Get game by ID (with caching and request deduplication)
	getGameById: async (gameId) => {
		const cacheKey = getCacheKey(`/games/${gameId}`);
		const cachedData = getFromCache(cacheKey);
		
		if (cachedData) {
			return cachedData;
		}

		// Check if there's already a pending request for this key
		if (pendingRequests.has(cacheKey)) {
			return pendingRequests.get(cacheKey);
		}

		try {
			const requestPromise = apiClient.get(`/games/${gameId}`).then(response => {
				const game = response.data;
				setCache(cacheKey, game);
				pendingRequests.delete(cacheKey);
				return game;
			}).catch(error => {
				pendingRequests.delete(cacheKey);
				throw error;
			});

			pendingRequests.set(cacheKey, requestPromise);
			return requestPromise;
		} catch (error) {
			pendingRequests.delete(cacheKey);
			throw error;
		}
	},

	// Add new game (invalidates cache)
	addGame: async (gameData) => {
		try {
			const response = await apiClient.post("/games", gameData);
			// Invalidate games list cache
			clearCache("/games");
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Update game (invalidates cache)
	updateGame: async (gameId, gameData) => {
		try {
			const response = await apiClient.put(`/games/${gameId}`, gameData);
			// Invalidate both specific game and games list cache
			clearCache(`/games/${gameId}`);
			clearCache("/games");
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Delete game (invalidates cache)
	deleteGame: async (gameId) => {
		try {
			const response = await apiClient.delete(`/games/${gameId}`);
			// Invalidate both specific game and games list cache
			clearCache(`/games/${gameId}`);
			clearCache("/games");
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Search games with debouncing for better performance
	searchGames: debounce(async (query, params = {}) => {
		const searchParams = { ...params, q: query };
		const cacheKey = getCacheKey("/games/search", searchParams);
		const cachedData = getFromCache(cacheKey);
		
		if (cachedData) {
			return cachedData;
		}

		// Check if there's already a pending request for this key
		if (pendingRequests.has(cacheKey)) {
			return pendingRequests.get(cacheKey);
		}

		try {
			const requestPromise = apiClient.get("/games/search", { params: searchParams }).then(response => {
				const results = response.data;
				setCache(cacheKey, results);
				pendingRequests.delete(cacheKey);
				return results;
			}).catch(error => {
				pendingRequests.delete(cacheKey);
				throw error;
			});

			pendingRequests.set(cacheKey, requestPromise);
			return requestPromise;
		} catch (error) {
			pendingRequests.delete(cacheKey);
			throw error;
		}
	}, 300),

	// Prefetch next page for better UX (optimistic loading)
	prefetchNextPage: async (currentPage, params = {}) => {
		const nextPageParams = { ...params, page: currentPage + 1 };
		const cacheKey = getCacheKey("/games", nextPageParams);
		
		// Only prefetch if not already cached
		if (!getFromCache(cacheKey) && !pendingRequests.has(cacheKey)) {
			try {
				const requestPromise = apiClient.get("/games", { params: nextPageParams }).then(response => {
					setCache(cacheKey, response.data);
					pendingRequests.delete(cacheKey);
					if (process.env.NODE_ENV === 'development') {
						console.log(`Prefetched page ${currentPage + 1}`);
					}
					return response.data;
				}).catch(error => {
					pendingRequests.delete(cacheKey);
					// Silently fail for prefetch - don't throw
					if (process.env.NODE_ENV === 'development') {
						console.error('Error prefetching next page:', error);
					}
				});

				pendingRequests.set(cacheKey, requestPromise);
			} catch (error) {
				// Silently fail for prefetch
				if (process.env.NODE_ENV === 'development') {
					console.error('Error prefetching next page:', error);
				}
			}
		}
	},
};

export default apiClient;
