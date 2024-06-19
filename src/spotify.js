import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const STATE_KEY = 'spotify_auth_state';


function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function getAccessToken() {
    const authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
        },
        data: 'grant_type=client_credentials'
    };

    try {
        const response = await axios(authOptions);
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}

export async function searchSongs(query) {
    const accessToken = await getAccessToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            q: query,
            type: 'track'
        }
    });

    return response.data.tracks.items;
}

export function login() {
    const state = generateRandomString(16);
    localStorage.setItem(STATE_KEY, state);
    const scope = 'user-read-private user-read-email';

    const url = 'https://accounts.spotify.com/authorize?' +
        `response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}`;

    window.location = url;
}

export async function handleCallback() {
    const code = new URLSearchParams(window.location.search).get('code');
    const state = new URLSearchParams(window.location.search).get('state');
    const storedState = localStorage.getItem(STATE_KEY);

    if (state === null || state !== storedState) {
        alert('State mismatch');
        return;
    }

    localStorage.removeItem(STATE_KEY);

    const authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
        },
        data: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
    };

    try {
        const response = await axios(authOptions);
        const accessToken = response.data.access_token;
        localStorage.setItem('access_token', accessToken);

        window.location = '/';
    } catch (error) {
        console.error('Error handling callback:', error);
        alert('Failed to authenticate');
    }
}
