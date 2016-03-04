var getEmailType, getEventName, getEventRecords, getReferenceId, getLocal, getUserId, getSkipValue, getSenderEmail,
    getSubject, getContent, getBulkEmailTimestamp, getSenderName;

getEventRecords = function(event, next) {
    var eventRecords = (event.Records) ? event.Records : '';
    if ( typeof eventRecords === 'undefined' || eventRecords === '') {
        next("Invalid Records");
    } else {
        return eventRecords;
    }
}

getEventName = function(record, next) {
    var EventType = (record.eventName) ? record.eventName : '';
    if ( typeof EventType === 'undefined' || EventType === '') {
        next("Event name is not valid");
    } else {
        return EventType;
    }
}

getSkipValue = function(record) {
    var skip = (record.dynamodb.NewImage.Skip) ? record.dynamodb.NewImage.Skip.S : '';
    if ( typeof skip === 'undefined' || skip === '') {
        return null;
    } else {
        return skip;
    }
}

getEmailType = function(record, next) {
    var EmailType = (record.dynamodb.NewImage.EmailType.S) ? record.dynamodb.NewImage.EmailType.S : '';
    if ( typeof EmailType === 'undefined' || EmailType === '') {
        next("EmailType is not valid");
    } else {
        return EmailType;
    }
}

getSenderEmail = function(record, next) {
    var SenderEmail = (record.dynamodb.NewImage.Email.M.From.S) ? record.dynamodb.NewImage.Email.M.From.S : '';
    if ( typeof SenderEmail === 'undefined' || SenderEmail === '') {
        next("SenderEmail is not valid");
    } else {
        return SenderEmail;
    }
}

getSenderName = function(record, next) {
    var SenderName = (record.dynamodb.NewImage.Email.M.SenderName.S) ? record.dynamodb.NewImage.Email.M.SenderName.S : '';
    if ( typeof SenderName === 'undefined' || SenderName === '') {
        next("SenderName is not valid");
    } else {
        return SenderName;
    }
}

getSubject = function(record, next) {
    var subject = (record.dynamodb.NewImage.Email.M.Subject.S) ? record.dynamodb.NewImage.Email.M.Subject.S : '';
    if ( typeof subject === 'undefined' || subject === '') {
        next("subject is not valid");
    } else {
        return subject;
    }
}

getContent = function(record, next) {
    var content = (record.dynamodb.NewImage.Email.M.Content.S) ? record.dynamodb.NewImage.Email.M.Content.S : '';
    if ( typeof content === 'undefined' || content === '') {
        next("content is not valid");
    } else {
        return content;
    }
}

module.exports = {
    getEventRecords: getEventRecords,
    getEventName: getEventName,
    getEmailType:getEmailType,
    getSubject:getSubject,
    getContent:getContent,
    getSenderEmail:getSenderEmail,
    getSenderName:getSenderName,
    getSkipValue:getSkipValue
};
