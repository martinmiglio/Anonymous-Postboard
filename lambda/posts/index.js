import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = "cs351-project-posts";

export const handler = async (event, context) => {
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
};

async function handleGet(event, context) {
  const { queryStringParameters } = event;
  if (queryStringParameters && queryStringParameters.latest === "true") {
    const result = await dynamo.scan({ TableName: tableName }).promise();
    const items = result.Items;
    // Sort the items based on the timestamp, most recent first
    items.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    if (queryStringParameters.id) {
      // If an ID is specified, start return from the next item until item count
      const idIndex = items.findIndex(
        (item) => item.id === Number(queryStringParameters.id)
      );

      if (idIndex === -1) {
        return {
          statusCode: 513,
          body: JSON.stringify({
            error: `No item found by id ${queryStringParameters.id}`,
          }),
        };
      }

      const startIndex = idIndex + 1;

      return {
        statusCode: 200,
        body: JSON.stringify(
          items.slice(
            startIndex,
            startIndex + (queryStringParameters.count ?? 1)
          )
        ),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(items.slice(0, queryStringParameters.count ?? 1)),
      };
    }
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
    const result = await dynamo.scan({ TableName: tableName }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  }
}

async function handlePut(event, context) {
  try {
    const { body } = event;
    const requestJSON = JSON.parse(body);
    const post = await dynamo
      .put({
        TableName: tableName,
        Item: {
          // id should be generated to avoid collisions
          id: Date.now(),
          content: requestJSON.content ?? "",
          timestamp: requestJSON.timestamp ?? Date.now(), // default to current time if not provided
          votes: requestJSON.votes ?? 0, // default to 0 if not provided
        },
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify(post),
    };
  } catch (error) {
    return {
      statusCode: 512,
      body: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };
  }
}

async function handlePatch(event, context) {
  const { body, queryStringParameters } = event;

  if (queryStringParameters && queryStringParameters.id) {
    const { id } = queryStringParameters;
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
        Key: { id },
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
  const { queryStringParameters } = event;
  if (queryStringParameters && queryStringParameters.id) {
    const { id } = queryStringParameters;
    await dynamo
      .delete({
        TableName: tableName,
        Key: { id },
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
