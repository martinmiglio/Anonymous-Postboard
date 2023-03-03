// CS351-Project-Replies/index.mjs
// This is the Lambda function for the replies table
// The API is documented in API/schemas/openapi.yml
import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = "cs351-project-replies";
const postsTableName = "cs351-project-posts";

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
async function getReplies(event)
{
    const { queryStringParameters } = event;

    if (!queryStringParameters)
    {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing query string parameters" }),
        };
    }

    const { id, parent_id } = queryStringParameters;

    // if id is specified, return the reply with the specified id
    if (id)
    {
        const params = {
            TableName: tableName,
            Key: { id: Number(id) },
        };

        try
        {
            const result = await dynamo.get(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify(result.Item),
            };
        }
        catch (error)
        {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Failed to retrieve reply' }),
            };
        }
    }

    // if parent_id is specified, return all replies with the specified parent_id
    else if (parent_id)
    {
        // Retrieve all replies with the specified parent_id
        const params = {
            TableName: tableName,
            IndexName: 'parent_id-index',
            KeyConditionExpression: 'parent_id = :parent_id_val',
            ExpressionAttributeValues: {
                ':parent_id_val': parent_id
            }
        };

        try
        {
            const result = await dynamo.query(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify(result.Items.sort((a, b) => a.timestamp - b.timestamp)),
            };
        } catch (error)
        {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Failed to retrieve replies' }),
            };
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing or invalid query string parameters" }),
    };
}



async function putReplies(event) {
    const RETENTION_PERIOD = 60 * 60 * 24 * 30; // 30 days
    const { body } = event;
    if (!body)
    {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing request body" }),
        };
    }
    let requestJSON;
    try
    {
        requestJSON = JSON.parse(body);
    }
    catch (error)
    {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid request body" }),
        };
    }
    // Get the parent post to check if it exists
    const parentPost = await dynamo.get({
        TableName: postsTableName,
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
    const newReply = {
        id: Date.now(), // id should be generated to avoid collisions
        parent_id: requestJSON.parent_id,
        content: requestJSON.content ?? "",
        timestamp: requestJSON.timestamp ?? Date.now(),
        votes: requestJSON.votes ?? 0,
        ttl: Math.floor(Date.now() / 1000) + RETENTION_PERIOD,
    };
    // Add the new post to the database
    await dynamo.put({
        TableName: tableName,
        Item: newReply,
    }).promise();
    // Return the newly created post as read from the database
    const result = await dynamo.get({
        TableName: tableName,
        Key: { id: newReply.id },
    }).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
    };
}



async function patchReplies(event) {
    const { queryStringParameters, body } = event;
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
