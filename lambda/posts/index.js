import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = "cs351-project-posts";

export const handler = async (event, context) => {
  try {
    const httpMethod = event.httpMethod;
    switch (httpMethod) {
      case "GET":
        return handleGet(event, context);
      case "PUT":
        return handlePut(event, context);
      case "PATCH":
        return handlePatch(event, context);
      case "DELETE":
        return handleDelete(event, context);
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

async function handleGet(event, context) {
  const { queryStringParameters } = event;
  const DEFAULT_COUNT = 1;

  if (queryStringParameters && queryStringParameters.latest) {
    // If the latest parameter is specified, return the latest items
    const result = await dynamo.scan({ TableName: tableName }).promise();
    const items = result.Items;
    // Sort the items based on the timestamp, most recent first
    items.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(
        items.slice(0, Number(queryStringParameters.count ?? DEFAULT_COUNT))
      ),
    };
  } else if (queryStringParameters && queryStringParameters.after) {
    // If an ID is specified, return the items after that ID
    const result = await dynamo.scan({ TableName: tableName }).promise();
    const items = result.Items;
    // Sort the items based on the timestamp, most recent first
    items.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    // If an ID is specified, start return from the next item until item count
    const idIndex = items.findIndex(
      (item) => item.id === Number(queryStringParameters.after)
    );

    if (idIndex === -1) {
      // If the ID is not found, return an error
      return {
        statusCode: 513,
        body: JSON.stringify({
          error: `No item found by id ${queryStringParameters.after}`,
        }),
      };
    }

    // Start from the next item
    const startIndex = idIndex + 1;

    return {
      statusCode: 200,
      body: JSON.stringify(
        items.slice(
          startIndex,
          startIndex + Number(queryStringParameters.count ?? DEFAULT_COUNT)
        )
      ),
    };
  } else if (queryStringParameters && queryStringParameters.id) {
    // If an ID is specified, return the item with that ID
    const result = await dynamo
      .get({
        TableName: tableName,
        Key: { id: Number(queryStringParameters.id) },
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } else {
    // Otherwise, return all items
    const result = await dynamo.scan({ TableName: tableName }).promise();
    const items = result.Items;
    // Sort the items based on the timestamp, most recent first
    items.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  }
}

async function handlePut(event, context) {
  // Create a new post
  const { body } = event;
  const requestJSON = JSON.parse(body);
  const now = Date.now();
  await dynamo
    .put({
      TableName: tableName,
      Item: {
        // id should be generated to avoid collisions
        id: now,
        content: requestJSON.content ?? "",
        timestamp: requestJSON.timestamp ?? now, // default to current time if not provided
        votes: requestJSON.votes ?? 0, // default to 0 if not provided
      },
    })
    .promise();
  // Return the newly created post
  const result = await dynamo
    .get({
      TableName: tableName,
      Key: { id: now },
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
}

async function handlePatch(event, context) {
  // Update an existing post
  const { body, queryStringParameters } = event;

  if (queryStringParameters && queryStringParameters.id) {
    const requestJSON = JSON.parse(body);

    const attributeValues = {};
    let updateExpression = "set";

    // Build the update expression and attribute values based on the JSON body
    // this will ensure that only the provided fields are updated
    if (requestJSON.hasOwnProperty("content")) {
      updateExpression += " content = :c,";
      attributeValues[":c"] = requestJSON.content;
    }
    if (requestJSON.hasOwnProperty("timestamp")) {
      updateExpression += " timestamp = :t,";
      attributeValues[":t"] = requestJSON.timestamp;
    }
    if (requestJSON.hasOwnProperty("votes")) {
      updateExpression += " votes = :v,";
      attributeValues[":v"] = requestJSON.votes;
    }

    // Remove the trailing comma from the update expression
    updateExpression = updateExpression.slice(0, -1);

    const result = await dynamo
      .update({
        TableName: tableName,
        Key: { id: Number(queryStringParameters.id) },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: attributeValues,
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing post ID" }),
    };
  }
}

async function handleDelete(event, context) {
  // Delete an existing post
  const { queryStringParameters } = event;
  if (queryStringParameters && queryStringParameters.id) {
    await dynamo
      .delete({
        TableName: tableName,
        Key: { id: Number(queryStringParameters.id) },
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing post ID" }),
    };
  }
}
