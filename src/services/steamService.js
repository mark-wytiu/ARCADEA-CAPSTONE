import axios from 'axios';

const STEAM_API_KEY = process.env.REACT_APP_STEAM_API_KEY;
const CORS_PROXY = process.env.REACT_APP_CORS_PROXY;
const BASE_URL = 'https://api.steampowered.com';
const STORE_API_BASE = 'https://store.steampowered.com';

// Create axios instance for Steam Web API
const steamAPI = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Create axios instance for Steam Store API (doesn't require API key)
const steamStoreAPI = axios.create({
    baseURL: STORE_API_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to handle CORS if proxy is configured
if (CORS_PROXY) {
    steamAPI.interceptors.request.use((config) => {
        config.url = `${CORS_PROXY}${config.baseURL}${config.url}`;
        config.baseURL = '';
        return config;
    });
    
    steamStoreAPI.interceptors.request.use((config) => {
        config.url = `${CORS_PROXY}${config.baseURL}${config.url}`;
        config.baseURL = '';
        return config;
    });
}

// Utility function to resolve Steam ID from vanity URL
export const resolveVanityURL = async (vanityUrl) => {
    try {
        const response = await steamAPI.get('/ISteamUser/ResolveVanityURL/v1/', {
            params: {
                key: STEAM_API_KEY,
                vanityurl: vanityUrl,
                url_type: 1 // 1 for individual profile
            }
        });
        
        if (response.data.response.success === 1) {
            return response.data.response.steamid;
        } else {
            throw new Error('Unable to resolve Steam ID from vanity URL');
        }
    } catch (error) {
        console.error('Error resolving vanity URL:', error);
        throw error;
    }
};

// Get basic player information
export const getPlayerSummary = async (steamId) => {
    try {
        const response = await steamAPI.get('/ISteamUser/GetPlayerSummaries/v2/', {
            params: {
                key: STEAM_API_KEY,
                steamids: steamId
            }
        });
        
        if (response.data.response.players.length > 0) {
            return response.data.response.players[0];
        } else {
            throw new Error('Player not found');
        }
    } catch (error) {
        console.error('Error getting player summary:', error);
        throw error;
    }
};

// Get owned games with enhanced information
export const getOwnedGames = async (steamId) => {
    try {
        const response = await steamAPI.get('/IPlayerService/GetOwnedGames/v1/', {
            params: {
                key: STEAM_API_KEY,
                steamid: steamId,
                include_appinfo: true,
                include_played_free_games: true,
                format: 'json'
            }
        });
        
        if (response.data.response && response.data.response.games) {
            return response.data.response.games;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error getting owned games:', error);
        throw error;
    }
};

// Get detailed game information from Steam Store API
export const getGameDetails = async (appId) => {
    try {
        const response = await steamStoreAPI.get('/api/appdetails/', {
            params: {
                appids: appId,
                filters: 'basic,genres,categories,release_date,screenshots'
            }
        });
        
        const gameData = response.data[appId];
        if (gameData && gameData.success && gameData.data) {
            return gameData.data;
        } else {
            throw new Error(`Game data not found for app ID: ${appId}`);
        }
    } catch (error) {
        console.error(`Error getting game details for ${appId}:`, error);
        throw error;
    }
};

// Convert Steam game data to your app's format
export const convertSteamGameToAppFormat = (steamGame, gameDetails = null) => {
    const baseGame = {
        title: steamGame.name,
        platform: 'PC (Steam)',
        // Use playtime as a rough indicator of rating (games with more playtime tend to be liked more)
        rating: Math.min(5, Math.max(1, Math.round((steamGame.playtime_forever / 60) * 0.1) || 3)),
        image: `https://media.steampowered.com/steamcommunity/public/images/apps/${steamGame.appid}/${steamGame.img_icon_url}.jpg`,
        steamAppId: steamGame.appid,
        playtimeForever: steamGame.playtime_forever,
        playtime2Weeks: steamGame.playtime_2weeks || 0
    };
    
    // If we have detailed game information, add it
    if (gameDetails) {
        return {
            ...baseGame,
            description: gameDetails.short_description || gameDetails.detailed_description || '',
            genre: gameDetails.genres && gameDetails.genres.length > 0 
                ? gameDetails.genres[0].description 
                : 'Unknown',
            releaseDate: gameDetails.release_date ? gameDetails.release_date.date : '',
            developer: gameDetails.developers && gameDetails.developers.length > 0 
                ? gameDetails.developers[0] 
                : '',
            publisher: gameDetails.publishers && gameDetails.publishers.length > 0 
                ? gameDetails.publishers[0] 
                : '',
            price: gameDetails.price_overview ? gameDetails.price_overview.final_formatted : 'Free'
        };
    }
    
    return baseGame;
};

// Demo data for testing without Steam API
const getDemoSteamData = () => {
    const demoPlayerInfo = {
        steamid: '76561198000000000',
        personaname: 'Demo Player',
        avatarmedium: 'https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_medium.jpg',
        profileurl: 'https://steamcommunity.com/profiles/76561198000000000/',
        personastate: 1
    };
    
    const demoGames = [
        {
            appid: 730,
            name: "Counter-Strike 2",
            playtime_forever: 1250,
            img_icon_url: "69f7ebe2735c366c65c0b33dae00e12dc40edbe4"
        },
        {
            appid: 570,
            name: "Dota 2",
            playtime_forever: 890,
            img_icon_url: "0bbb630d63262dd66d2fdd0f7d37e8661a410075"
        },
        {
            appid: 440,
            name: "Team Fortress 2",
            playtime_forever: 567,
            img_icon_url: "e3f595a92552da3d664ad00277fad2107345f743"
        },
        {
            appid: 271590,
            name: "Grand Theft Auto V",
            playtime_forever: 234,
            img_icon_url: "cfa928ab25d6b2cdomains/GTA5_icon.jpg"
        },
        {
            appid: 1172470,
            name: "Apex Legends",
            playtime_forever: 189,
            img_icon_url: "f54ace6d7b01d0bff0b62dba5f49c80a0e0aed90"
        }
    ];
    
    const convertedGames = demoGames.map(game => convertSteamGameToAppFormat(game));
    
    return {
        playerInfo: demoPlayerInfo,
        games: convertedGames,
        totalGames: demoGames.length,
        importedGames: convertedGames.length
    };
};

// Main function to import Steam library
export const importSteamLibrary = async (steamIdOrVanity) => {
    try {
        // Check if we're in demo mode (no API key or demo input)
        if (!STEAM_API_KEY || steamIdOrVanity.toLowerCase() === 'demo' || steamIdOrVanity === 'demo_user') {
            console.log('Running in demo mode - using sample data');
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(getDemoSteamData());
                }, 1500); // Simulate API delay
            });
        }
        
        let steamId = steamIdOrVanity;
        
        // Check if it's a vanity URL (contains non-numeric characters)
        if (!/^\d+$/.test(steamIdOrVanity)) {
            steamId = await resolveVanityURL(steamIdOrVanity);
        }
        
        // Get player info
        const playerInfo = await getPlayerSummary(steamId);
        
        // Get owned games
        const ownedGames = await getOwnedGames(steamId);
        
        // Filter out games with very low playtime (likely not actually played)
        const playedGames = ownedGames.filter(game => 
            game.playtime_forever > 0 || game.name.length > 0
        );
        
        // Convert to app format
        const convertedGames = playedGames.map(game => 
            convertSteamGameToAppFormat(game)
        );
        
        return {
            playerInfo,
            games: convertedGames,
            totalGames: ownedGames.length,
            importedGames: convertedGames.length
        };
    } catch (error) {
        console.error('Error importing Steam library:', error);
        throw error;
    }
};

// Validate Steam ID format
export const isValidSteamId = (steamId) => {
    // Steam ID should be a 17-digit number
    return /^\d{17}$/.test(steamId);
};

// Extract Steam ID from Steam profile URL
export const extractSteamIdFromUrl = (url) => {
    const patterns = [
        /steamcommunity\.com\/profiles\/(\d{17})/,
        /steamcommunity\.com\/id\/([a-zA-Z0-9_-]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    
    return null;
};

