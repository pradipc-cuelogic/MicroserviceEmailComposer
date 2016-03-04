var  getUserData, request, async, getLambdaEventData, getUsersData, updateNewsletterStatus;

request = require('request');
async = require('async');
initApi = require('./initApi');
apiResponseHandler = require('./apiResponseHandler');
getLambdaEventData = require('./../getLambdaEventData');

getUsersData = function(skip, record, event, parent_next) {
    var url = (typeof initApi.getAPIURL() === "undefined") ? '' : stripTrailingSlash(initApi.getAPIURL());
    if (skip == null) {
        skip = url + '/?page=1';
    }

    request({
        uri: skip,
        method: 'get',
        headers: { 'content-type': 'application/json' }
    }, function(error, response, body) {
        response = apiResponseHandler.handleGetUsersDataResponse(error, body, event);
        if (response.error)  {
            parent_next(response.error);
        } else {
            parent_next(null, response, record);
        }
    });
};


stripTrailingSlash = function(str) {
    if (str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

module.exports = {
    getUsersData: getUsersData,
    getUserData: getUserData
};
