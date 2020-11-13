exports.stateKey = 'spotify_auth_state';
exports.client_id = process.env.SPOTIFY_CLIENT_ID;
exports.client_secret = process.env.SPOTIFY_CLIENT_SECRET;
exports.redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
exports.scope = 'ugc-image-upload user-read-playback-state user-library-modify user-library-read user-read-playback-position user-read-recently-played user-top-read user-read-private user-read-email playlist-read-collaborative playlist-modify-private playlist-modify-public playlist-read-private streaming';
exports.appUrl = process.env.APP_URL;