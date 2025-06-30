import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const cache = new Map();

// Create axios instance with default config
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Cache helper functions
const getCacheKey = (endpoint, params) => {
	return `${endpoint}${params ? JSON.stringify(params) : ""}`;
};

const isCacheValid = (cacheEntry) => {
	return cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

const getCachedData = (key) => {
	const cacheEntry = cache.get(key);
	if (isCacheValid(cacheEntry)) {
		return cacheEntry.data;
	}
	cache.delete(key);
	return null;
};

const setCacheData = (key, data) => {
	cache.set(key, {
		data,
		timestamp: Date.now(),
	});
};

// Add response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

// Game related API calls
export const gameAPI = {
	// Get all games
	async getAllGames() {
		const cacheKey = getCacheKey("/games");
		const cachedData = getCachedData(cacheKey);

		if (cachedData) {
			return cachedData;
		}

		const response = await apiClient.get("/games");
		setCacheData(cacheKey, response.data);
		return response.data;
	},

	// Get game by ID
	async getGameById(gameId) {
		const cacheKey = getCacheKey(`/games/${gameId}`);
		const cachedData = getCachedData(cacheKey);

		if (cachedData) {
			return cachedData;
		}

		const response = await apiClient.get(`/games/${gameId}`);
		setCacheData(cacheKey, response.data);
		return response.data;
	},

	// Add new game
	async addGame(gameData) {
		const response = await apiClient.post("/games", gameData);
		// Invalidate games list cache after adding new game
		cache.delete(getCacheKey("/games"));
		return response.data;
	},

	// Update game
	async updateGame(gameId, gameData) {
		const response = await apiClient.put(`/games/${gameId}`, gameData);
		// Invalidate relevant caches
		cache.delete(getCacheKey("/games"));
		cache.delete(getCacheKey(`/games/${gameId}`));
		return response.data;
	},

	// Delete game
	async deleteGame(gameId) {
		const response = await apiClient.delete(`/games/${gameId}`);
		// Invalidate relevant caches
		cache.delete(getCacheKey("/games"));
		cache.delete(getCacheKey(`/games/${gameId}`));
		return response.data;
	},
};

export default apiClient;
