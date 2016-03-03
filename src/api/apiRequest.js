var  getUserData, request, async, getLambdaEventData, getUsersData, updateNewsletterStatus;

request = require('request');
async = require('async');
initApi = require('./initApi');
apiResponseHandler = require('./apiResponseHandler');
getLambdaEventData = require('./../getLambdaEventData');

getUsersData = function(local, skip, record, event, parent_next) {
    if (skip == null) {
        skip = '/?page=1';
    }
    var url = (typeof initApi.getAPIURL() === "undefined") ? '' : stripTrailingSlash(initApi.getAPIURL());
    request({
        uri: url + skip,
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

updateNewsletterStatus = function(local, referenceId, status, EmailContentObjects, parent_next) {
    console.log(initApi.getAPIURL(local) + 'newslettercampaigns/' + referenceId + '?api_key=' + initApi.getAPIKey());
    request({
        uri: initApi.getAPIURL(local) + 'newslettercampaigns/' + referenceId + '?api_key=' + initApi.getAPIKey(),
        method: 'PUT',
        json: { 'scheduledStatus': status },
        headers: { 'content-type': 'application/json' }
    }, function(error, response, body) {
        response = apiResponseHandler.handleUpdateNewsletterStatusResponse(error, body);
        console.log(response);
        if (response.error)  {
            parent_next(response);
        } else {
            parent_next(null, EmailContentObjects);
        }
    });
}

stripTrailingSlash = function(str) {
    if (str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

module.exports = {
    getUsersData: getUsersData,
    getUserData: getUserData,
    updateNewsletterStatus: updateNewsletterStatus
};
