// CS351-Project-Replies/index.mjs
// This is the Lambda function for the replies table
// The API is documented in API/schemas/openapi.yml

import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = "cs351-project-replies";

export const handler = async (event) =>
{
    try
    {
        // TODO implement
        const response = {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),
        };
        return response;
    } catch (error)
    {
        return {
            statusCode: 512,
            body: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        };
    }
};
