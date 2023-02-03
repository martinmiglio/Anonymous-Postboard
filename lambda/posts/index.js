const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = "cs351-project-posts";

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "DELETE /posts/{id}":
        await dynamo
          .delete({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        body = `Deleted post ${event.pathParameters.id}`;
        break;
      case "GET /posts/{id}":
        body = await dynamo
          .get({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        break;
      case "GET /posts":
        body = await dynamo.scan({ TableName: tableName }).promise();
        break;
      case "PUT /posts":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: tableName,
            Post: {
              // id should be generated to avoid collisions
              id: Date.now(),
              content: requestJSON.content ?? "",
              timestamp: requestJSON.timestamp ?? Date.now(), // default to current time if not provided
              votes: requestJSON.votes ?? 0, // default to 0 if not provided
            },
          })
          .promise();
        body = `Put post ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
