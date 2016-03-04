var AWS, DOC, docClient, awsClient, getRecords, putRecord, _, putBulkEmailContentRecord;

_ = require('lodash');
AWS = require("aws-sdk");
DOC = require("dynamodb-doc");
AWS.config.update({ region: "us-west-2" });

awsClient = new AWS.DynamoDB();
docClient = new DOC.DynamoDB(awsClient);

getRecords = function(tableName, conditions, record, callback, next) {
    params = {};
    params.TableName = tableName;
    params.KeyConditions =  [];
    _.forEach(conditions, function(condition, key) {
        params.KeyConditions.push(docClient.Condition(condition[0], condition[1], condition[2]));
    })
    docClient.query(params, function(err, data) {
        if (err) {
            console.log("dynamodb error" + err);
            callback();
        } else {
           next(null, data, record);
        }
    });
}

putRecord = function(emailContentObject, next) {
    params = {};
    params.TableName = "EmailQueue";
    params.Item = {
        "From":  emailContentObject.From,
        "SenderName":  emailContentObject.SenderName,
        "To":  emailContentObject.To,
        "ReceiverName":  emailContentObject.ReceiverName,
        "Subject":  emailContentObject.Subject,
        "Content":  emailContentObject.Content,
        "UserId": parseInt(emailContentObject.UserId),
        "EmailType": emailContentObject.EmailType,
        "Timestamp": new Date().getTime()

    };
    docClient.putItem(params, function(err) {
        if (err) { next(err); }
        next(null, emailContentObject);
    });
}

putBulkEmailContentRecord = function(emailContentObjects, skip, next) {
    emailContentObject = emailContentObjects[0];
    params = {};
    params.TableName = "MicroserviceEmailComposer";
    params.Item = {
        "Timestamp": new Date().getTime(),
        "EmailType": emailContentObject.EmailType,
        "Skip":  skip,
        "Email": {
            "From":  emailContentObject.From,
            "SenderName":  emailContentObject.SenderName,
            "UserId": parseInt(emailContentObject.UserId),
            "Content": emailContentObject.Content,
            "Subject":emailContentObject.Subject
        }
    };

    docClient.putItem(params, function(err, data) {
        if (err) {
            next(err);
        } else {
            next(null, emailContentObjects);
        }
    });

}


module.exports = {
    getRecords: getRecords,
    putRecord:putRecord,
    putBulkEmailContentRecord: putBulkEmailContentRecord
};
