// import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import SpotifyWebApi from "spotify-web-api-node";
const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-email',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    "user-library-modify",
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-follow-read',].join(",");

const params = {
    scope: scopes,
}
    
const queryParamString = new URLSearchParams(params);

const LOGIN_URL =
    "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const SpotifyApi = new SpotifyWebApi({
    clientId: '8a2348e0195b4a9dacc554acb3b95702',
    clientSecret: '1513ae04ae6d4d10be6e858e5d48948e',
});


export default SpotifyApi;

export { LOGIN_URL };
