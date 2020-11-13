const express = require('express');
const {
    fetchSpotifyUserDetail,
    fetchSpotifyUserPlaylists,
    fetchSpotifyUserPlaylist,
    fetchSpotifyUserDevice,
} = require('../controller/user-spotify');
const router = express.Router();

router.route('/user-details').post(fetchSpotifyUserDetail);
router.route('/playlists').post(fetchSpotifyUserPlaylists);
router.route('/playlist').post(fetchSpotifyUserPlaylist);
router.route('/devices').post(fetchSpotifyUserDevice);

module.exports = router;