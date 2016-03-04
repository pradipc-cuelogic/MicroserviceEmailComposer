var handleGetUserDataResponse, handleGetUsersDataResponse;

handleGetUserDataResponse = function(error, userData, event) {
    if (error) {
        return { "error": error };
    }
    try{
        userData = JSON.parse(userData);
        if (typeof userData.code !== 'undefined' &&  userData.code !== 200) {
            return { "error": "API Response returns " + userData.messages };
        }
        if (userData === '' || typeof userData.email === 'undefined') {
            return { "error": "NO user found with the given data" };
        }
        return { "visitor": [ userData ] };
    } catch(error) {
        return { "error": "API error" };
    }
}

handleGetUsersDataResponse = function(error, userData, event) {
    if (error) {
        return { "error": error };
    }
    try{
        userData = JSON.parse(userData);
        if (typeof userData.code !== 'undefined' &&  userData.code !== 200) {
            return { "error": "API Response returns " + userData.messages };
        }
        if (userData === '' || typeof userData.data === 'undefined') {
            return { "error": "NO user found with the given data" };
        }
        if (userData.next_page_url && typeof userData.next_page_url !== 'undefined') {
            return { "visitor": userData.data , "skip": userData.next_page_url };
        }
        return { "visitor":userData.data };
    } catch(error) {
        return { "error": "API error" };
    }
}

module.exports = {
    handleGetUserDataResponse: handleGetUserDataResponse,
    handleGetUsersDataResponse: handleGetUsersDataResponse
};
