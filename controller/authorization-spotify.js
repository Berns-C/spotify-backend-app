const request = require('request');
const querystring = require('querystring');
const { generateRandomString } = require('../utils/utils');
const {
    stateKey,
    client_id,
    client_secret,
    redirect_uri,
    scope,
    appUrl
} = require('../constants/contstants');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../custom_middleware/error-handler');

//@desc     Authenticate to Spotify by redirecting to Spotify authentication page.
//@route    GET /authenticate
//@access   Public
exports.spotifyLogin = async (req, res, next) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
};

//@desc     Spotify Login page will redirect here at authenticate/callback passing access tokens or error.
//@route    GET /authenticate/callback
//@access   Private
exports.spotifyCallback = async (req, res, next) => {
    try {
        const code = req.query.code || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            res.redirect(`${appUrl}/#` + querystring.stringify({ error: 'state_mismatch' }));
        } else {
            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: { code: code, redirect_uri: redirect_uri, grant_type: 'authorization_code' },
                headers: {
                  'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };

            request.post(authOptions, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    const access_token = body.access_token, refresh_token = body.refresh_token;
                    res.redirect(`${appUrl}/#` + querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token,
                    }));
                } else {
                    res.redirect(`${appUrl}/#` + querystring.stringify({ error: 'invalid_token' }));
                }
            });
        }
    } catch (error) {
        console.log('spotifyCallback ', error);
    }
};

//@desc     Spotify Login page will redirect here at authenticate/callback passing access tokens or error.
//@route    POST /authenticate/renewAccessToken
//@access   Private
exports.spotifyRenewAccessToken= async (req, res, next) => {
    // requesting access token from refresh token
    var refresh_token = req.body.data.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });

};