// CS351-Project-Replies/index.mjs
// This is the Lambda function for the replies table
// The API is documented in API/schemas/openapi.yml
import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = "cs351-project-replies";

export const handler = async (event) => {
    try {
        const httpMethod = event.httpMethod;
        switch (httpMethod) {
            case "GET":
                return getReplies(event);
            case "PUT":
                return putReplies(event);
            case "PATCH":
                return patchReplies(event);
            case "DELETE":
                return deleteReplies(event);
            case "OPTIONS":
                return handleOptions(event);
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        error: `Unsupported method ${httpMethod}`,
                        event: event,
                    }),
                };
        }
    } catch (error) {
        return {
            statusCode: 512,
            body: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        };
    }
};


//Functions 
async function getReplies(event) {
    const { queryStringParameters } = event;
    const parent_id = queryStringParameters.parent_id;
    
    // Verify parent_id exists
    if (!parent_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing parent_id parameter" }),
      };
    }
  
    // Retrieve all replies with the specified parent_id
    const params = {
      TableName: 'cs351-project-posts',
      KeyConditionExpression: 'parent_id = :parent_id_val',
      ExpressionAttributeValues: {
        ':parent_id_val': parent_id
      }
    };
  
    try {
      const result = await dynamo.query(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify(result.Items.sort((a, b) => b.timestamp - a.timestamp)),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to retrieve replies' }),
      };
    }
  }
  


async function putReplies(event) {
    const RETENTION_PERIOD = 60 * 60 * 24 * 30; // 30 days
    const { body } = event;
    const requestJSON = JSON.parse(body);
    // Get the parent post to check if it exists
    const parentPost = await dynamo.get({
        TableName: 'cs351-project-posts',
        Key: { id: requestJSON.parent_id },
    }).promise();
    // Return an error response if the parent post does not exist
    if (!parentPost || !parentPost.Item) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Parent post does not exist" }),
        };
    }
    // Create a new post
    const newPost = {
        id: Date.now(), // id should be generated to avoid collisions
        parent_id: requestJSON.parent_id,
        content: requestJSON.content ?? "",
        timestamp: requestJSON.timestamp ?? Date.now(),
        votes: requestJSON.votes ?? 0,
        ttl: Math.floor(Date.now() / 1000) + RETENTION_PERIOD,
    };
    // Add the new post to the database
    await dynamo.put({
        TableName: 'cs351-project-posts',
        Item: newPost,
    }).promise();
    // Return the newly created post as read from the database
    const result = await dynamo.get({
        TableName: 'cs351-project-posts',
        Key: { id: newPost.id },
    }).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
    };
}



async function patchReplies(event) {
    // Update an existing post
    if (queryStringParameters && queryStringParameters.id) {
        // get the existing reply from the database
        const originalReply = await dynamo
            .get({
                TableName: tableName,
                Key: { id: Number(queryStringParameters.id) },
            })
            .promise();

        if (!originalReply.Item) {
            // If the reply does not exist, return an error
            return {
                statusCode: 513,
                body: JSON.stringify({
                    error: `No item found by id ${queryStringParameters.id}`,
                }),
            };
        }

        // Parse the body of the request
        const requestJSON = JSON.parse(body);

        // replace the values in the original reply with the values in the request
        // if the value is not provided in the request, use the original value
        const updatedReply = {
            id: Number(queryStringParameters.id),
            content: requestJSON.content ?? originalReply.Item.content,
            timestamp: originalReply.Item.timestamp,
            votes: requestJSON.votes ?? originalReply.Item.votes,
            ttl: originalReply.Item.ttl,
        };

        // Update the reply in the database using dynamo.update
        await dynamo
            .update({
                TableName: tableName,
                Key: { id: Number(queryStringParameters.id) },
                UpdateExpression:
                    "set content = :content, votes = :votes",
                ExpressionAttributeValues: {
                    ":content": updatedReply.content,
                    ":votes": updatedReply.votes,
                },
            })
            .promise();
        return {
            statusCode: 200,
            body: JSON.stringify(updatedReply),
        };
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing reply ID" }),
        };
    }
}


async function deleteReplies(event) {
    const { queryStringParameters } = event;
    // Check if the id parameter is specified
    if (!queryStringParameters || !queryStringParameters.id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing id parameter" }),
        };
    }
    const id = Number(queryStringParameters.id);
    // Delete the reply with the specified id
    await dynamo
        .delete({
            TableName: tableName,
            Key: { id: id },
        })
        .promise();
    return { statusCode: 200, body: JSON.stringify({ message: `Reply with id ${id} deleted` }) };
}


async function handleOptions(event, context) {
    // Return the allowed methods for CORS
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,PATCH,DELETE,OPTIONS",
        },
        body: JSON.stringify({ success: true }),
    };
}
