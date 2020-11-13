exports.generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

exports.spotifyWebApi = (url, access_token) => {
    return {
        url: url,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
};