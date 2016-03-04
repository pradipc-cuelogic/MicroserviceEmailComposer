# MicroserviceEmailComposer

This is the lambda function triggered with the new entry in the EmailComposer table.
which will give the call to the amazon aws api to fill in EmailSender table in dynamodb.

Add .env file at the root of the project with the follwoing values
MICROSERVICE_EMAIL_COMPOSER_ARN = arn_of_th_lambda_function // can found in aws-lambda 
