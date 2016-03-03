exports.handler = function(event, context) {
    console.log("inside the handler of bulk email composer");
    console.log(JSON.stringify(event, null, 2));
    require('dotenv').load();

    var apiRequest, getLambdaEventData, async, dynamodbRequest, _, composeBulkEmail, records, eventHandler;

    getLambdaEventData = require('./src/getLambdaEventData');
    apiRequest = require('./src/api/apiRequest');
    dynamodbRequest = require('./src/dynamodbRequests');
    async = require('async');
    _ = require('lodash');
    eventHandler = require('./src/eventHandler');

    context.done(null, "success");
}