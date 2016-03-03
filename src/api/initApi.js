var getAPIURL, getApiKey;

getAPIURL = function(reply) {
    return process.env.API_URL + "/";
}

getAPIKey = function() {
    return process.env.API_KEY;
}

module.exports = {
    getAPIURL: getAPIURL,
    getAPIKey: getAPIKey
};
