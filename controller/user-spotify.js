const request = require('request');
const { spotifyWebApi } = require('../utils/utils');

//@desc     Application will requests Spotify for user details using access tokens.
//@route    POST /user/user-details
//@access   Private
exports.fetchSpotifyUserDetail = async (req, res, next) => {
    try {
        const spotify_tokens = req.body.data;
        const spotify_user_details_api = spotifyWebApi('https://api.spotify.com/v1/me', spotify_tokens.access_token);

        request.get(spotify_user_details_api, async function(error, response, body) {
            //combine the access and refresh token into the user details response from spotify.
            const newUserObj = { ...body, ...spotify_tokens };
            res.status(200).json({ user_details: newUserObj });
        });
    } catch (error) {
        console.log('Error in fetchSpotifyUserDetail ', error)
    }
};

//@desc     Application will requests Spotify for user's playlist using access tokens and user id.
//@route    POST /user/playlists
//@access   Private
exports.fetchSpotifyUserPlaylists = async (req, res, next) => {
    try {
        const { access_token, user_id } = req.body.data;
        const spotify_user_playlists_api = spotifyWebApi(`https://api.spotify.com/v1/users/${user_id}/playlists?limit=50`, access_token);

        request.get(spotify_user_playlists_api, async function(error, response, body){
            if (body.error) {
                res.status(401).json({ error: body.error.message });
            } else {
                res.status(200).json({ user_playlists_details: body });
            }
        });
    } catch (error) {
        console.log('Error in fetchSpotifyUserPlaylists ', error);
    }
};

//@desc     Application will requests Spotify for the playlist details and tracks using access tokens and playlist id.
//@route    POST /user/playlist
//@access   Private
exports.fetchSpotifyUserPlaylist = async(req, res, next) => {
    try {
        const { access_token, playlist_id, _id } = req.body.data;
        const spotify_user_playlist_api = spotifyWebApi(`https://api.spotify.com/v1/playlists/${playlist_id}`, access_token);

        request.get(spotify_user_playlist_api, async function(error, response, body){
            if (body.error) {
                res.status(401).json({ error: body.error.message });
            } else {
                res.status(200).json({ user_playlist_details: body });
            }
        });
    } catch (error) {
        console.log('Error in fetchSpotifyUserPlaylist ', error);
    }
};

//@desc     Application will requests Spotify for the User's current connected devices.
//@route    POST /user/devices
//@access   Private
exports.fetchSpotifyUserDevice = async (req, res, next) => {
    try {
        const { access_token } = req.body.data;
        const spotify_user_devices_api = spotifyWebApi(`https://api.spotify.com/v1/me/player/devices`, access_token);

        request.get(spotify_user_devices_api, async function(error, response, body){
            if (body.error) {
                res.status(401).json({ error: body.error.message });
            } else {
                res.status(200).json({ devices: body.devices });
            }
        });

    } catch (error) {
        console.log('Error in fetchSpotifyUserDevice ', error);
    }
};