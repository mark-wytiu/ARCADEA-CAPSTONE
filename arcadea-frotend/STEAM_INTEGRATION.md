# Steam API Integration

This document explains how to set up and use the Steam API integration feature in ARCADEA.

## Setup

### 1. Get a Steam API Key

1. Go to [Steam Web API Key page](https://steamcommunity.com/dev/apikey)
2. Sign in with your Steam account
3. Enter a domain name (you can use `localhost` for development)
4. Generate your API key

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Steam API key:
   ```env
   REACT_APP_STEAM_API_KEY=your_steam_api_key_here
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   REACT_APP_CORS_PROXY=https://cors-anywhere.herokuapp.com/
   ```

### 3. CORS Configuration

Since Steam API doesn't support CORS for browser requests, you have a few options:

#### Option 1: Use a CORS Proxy (Recommended for Development)
- The default configuration uses `cors-anywhere.herokuapp.com`
- This is fine for development but has rate limits
- For production, consider setting up your own CORS proxy

#### Option 2: Backend Proxy (Recommended for Production)
- Implement Steam API calls in your backend
- Your frontend calls your backend, which calls Steam API
- This is more secure and reliable

#### Option 3: Browser Extension (Development Only)
- Use a browser extension like \"CORS Unblock\"
- Only for development, not suitable for production

## Features

### Import Steam Library

1. **Open Import Dialog**: Click the \"Steam\" button on the main page
2. **Enter Steam Information**: You can use any of these formats:
   - Steam ID (17-digit number): `76561198000000000`
   - Vanity URL: `your_username`
   - Full profile URL: `https://steamcommunity.com/id/your_username`

3. **Review Games**: Select which games you want to import to your ARCADEA library
4. **Import**: Save selected games to your collection

### What Gets Imported

The integration imports the following data for each game:
- **Title**: Game name
- **Platform**: Set to \"PC (Steam)\"
- **Rating**: Estimated based on playtime (more played = higher rating)
- **Image**: Game icon from Steam
- **Playtime**: Hours played (stored as metadata)
- **Steam App ID**: For future reference

### Additional Data (if available)

If the Steam Store API provides additional information:
- **Description**: Game description
- **Genre**: Primary genre
- **Release Date**: When the game was released
- **Developer**: Game developer
- **Publisher**: Game publisher
- **Price**: Current price (or \"Free\")

## Requirements

### Steam Profile Settings

For the import to work, the Steam profile must be set to **Public**:

1. Go to Steam → View Profile → Edit Profile
2. Set \"My Profile\" to \"Public\"
3. Set \"Game details\" to \"Public\"

### API Limitations

- **Rate Limits**: Steam API has rate limits (100,000 calls per day per key)
- **CORS**: Requires proxy or backend solution for production
- **Public Profiles Only**: Can only access public Steam profiles
- **No Private Games**: Cannot access private or hidden games

## Troubleshooting

### Common Issues

1. **\"Failed to import Steam library\"**
   - Check if Steam profile is public
   - Verify Steam ID/username is correct
   - Check API key in environment variables

2. **CORS Errors**
   - Ensure CORS proxy is working
   - Try using a different CORS proxy
   - Consider implementing backend proxy

3. **No Games Found**
   - Profile might be private
   - User might not own any games
   - Check Steam privacy settings

4. **Rate Limit Exceeded**
   - Wait before trying again
   - Steam API allows 100,000 calls per day
   - Consider caching results

### Debug Mode

To enable debug logging, open browser console and check for error messages. The Steam service logs detailed error information.

## Future Enhancements

Potential improvements for the Steam integration:

1. **Bulk Import with Details**: Fetch detailed game information for all games
2. **Playtime Sync**: Regularly sync playtime data
3. **Achievement Import**: Import Steam achievements
4. **Friend Recommendations**: Suggest games based on friends' libraries
5. **Price Tracking**: Track game prices and sales
6. **Automatic Updates**: Periodically update game information

## Security Considerations

1. **API Key**: Keep your Steam API key secret
2. **Backend Proxy**: Use backend proxy for production
3. **Rate Limiting**: Implement client-side rate limiting
4. **Data Privacy**: Be transparent about what data is collected

## API Reference

### Steam Web API Endpoints Used

1. **ISteamUser/ResolveVanityURL**: Convert vanity URL to Steam ID
2. **ISteamUser/GetPlayerSummaries**: Get player information
3. **IPlayerService/GetOwnedGames**: Get list of owned games
4. **Steam Store API**: Get detailed game information

For full API documentation, see [Steam Web API Documentation](https://steamapi.xpaw.me/).
