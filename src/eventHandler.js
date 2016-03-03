var handleEventType, handleEmailType, getLambdaEventData, apiRequest, handleGetUserData, handleGetUserName, getEmailQueueObject, handleSkipCall,
    encoding, handleConditionalRequestOnSkipValue, performSecurityCheck;

getLambdaEventData = require('./getLambdaEventData');

handleEventType = function(EventType, record, next, callback) {
    if (EventType == "INSERT") {
        next(null, record);
    } else {
        console.log("no handling for " + EventType + " type of trigger");
        callback();
    }
}

handleEmailType = function(EmailType, record, next, callback) {
    if (EmailType == "newsletter" || EmailType == "testnewsletter") {
        next(null, record);
    } else {
        console.log("no handling for " + EmailType + " type of trigger");
        callback();
    }
}

handleGetUserName = function(user) {
   return (typeof user.firstName  === 'undefined') ? user.email : user.firstName
}

handleGetUserData = function(record, event, next) {
    EmailType = getLambdaEventData.getEmailType(record, next);
    if (EmailType == "newsletter") {
        skip = getLambdaEventData.getSkipValue(record);
        apiRequest.getUsersData(Local, skip, record, event, next);

    }
}

handleSkipCall = function(EmailQueueObjects, skip, parent_next) {
    if (typeof skip !== 'undefined') {
        parent_next(null, EmailQueueObjects, skip);
    } else {
        parent_next(null, EmailQueueObjects, null);
    }
}

getEmailQueueObject = function(record, user, next) {
    return {
        'From': getLambdaEventData.getSenderEmail(record, next),
        'SenderName': getLambdaEventData.getSenderName(record, next),
        'To': user.email,
        'ReceiverName': handleGetUserName(user),
        'Subject': getLambdaEventData.getSubject(record, next),
        "Content": getLambdaEventData.getContent(record, next),
        "EmailType": getLambdaEventData.getEmailType(record, next),
        "UserId": parseInt(user.id),
        "MergeVars": {
            "loginLinkWithUnsubscribe": encoding.Base64.encode(user.email) + "/" + user.password,
            "loginLink": encoding.Base64.encode(user.email) + "/" + user.password
        }
    }
}

handleConditionalRequestOnSkipValue = function(skip, EmailContentObjects, dynamodbRequest, apiRequest, next) {
    if (skip !== null) {
        dynamodbRequest.putBulkEmailContentRecord(EmailContentObjects, skip, next);
    } else {
        //when skip is null it has done with fetching usersData, give api call to update receipient count
        if (EmailContentObjects[0].EmailType == "newsletter") {
            apiRequest.updateNewsletterStatus( EmailContentObjects[0].Local, EmailContentObjects[0].ReferenceId, 3, EmailContentObjects, next);
        } else {
            next(null, EmailContentObjects);
        }
    }
}



module.exports = {
    handleEventType: handleEventType,
    handleEmailType: handleEmailType,
    getEmailQueueObject: getEmailQueueObject,
    handleSkipCall: handleSkipCall,
    handleGetUserName: handleGetUserName,
    handleConditionalRequestOnSkipValue: handleConditionalRequestOnSkipValue,
    handleGetUserData:handleGetUserData

};
