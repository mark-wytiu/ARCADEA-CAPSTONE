import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create axios instance with default config
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

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
	getAllGames: async () => {
		try {
			const response = await apiClient.get("/games");
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Get game by ID
	getGameById: async (gameId) => {
		try {
			const response = await apiClient.get(`/games/${gameId}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Add new game
	addGame: async (gameData) => {
		try {
			const response = await apiClient.post("/games", gameData);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Update game
	updateGame: async (gameId, gameData) => {
		try {
			const response = await apiClient.put(`/games/${gameId}`, gameData);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Delete game
	deleteGame: async (gameId) => {
		try {
			const response = await apiClient.delete(`/games/${gameId}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export default apiClient;
