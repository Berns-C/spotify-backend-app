const express = require('express');
const {
    spotifyLogin,
    spotifyCallback,
    spotifyRenewAccessToken,
} = require('../controller/authorization-spotify');
const router = express.Router();

router.route('/login').get(spotifyLogin);
router.route('/callback').get(spotifyCallback);
router.route('/renewAccessToken').post(spotifyRenewAccessToken);

module.exports = router;