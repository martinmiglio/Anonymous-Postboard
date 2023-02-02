# Serverless, Anonymous Post Board

This is a serverless, anonymous post board. It is built with [AWS Lambda](https://aws.amazon.com/lambda/), [Amazon API Gateway](https://aws.amazon.com/api-gateway/), [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), and [Amazon S3](https://aws.amazon.com/s3/).

The post board is a simple web application that allows users to post messages to a board. The messages are stored in a DynamoDB table. The web application is hosted on S3 and uses API Gateway to call the Lambda functions.

## Architecture

The post board is composed of the following components:

- **API Gateway**: API Gateway is used to create the RESTful API for the post board. It is used to call the Lambda functions and to serve the web application.
- **Lambda functions**: Lambda functions are used to create, read, update, and delete posts. The Lambda functions are also used to create and delete the DynamoDB table.
- **DynamoDB table**: The DynamoDB table is used to store the posts.
- **S3 bucket**: The S3 bucket is used to host the web application.

## Resources

- [Serverless Chat Application](https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-chat-app.html)

  - This is a chat application that uses API Gateway and Lambda functions. It is a good example of how to use API Gateway and Lambda functions together.

- [ReactJS App on S3](https://www.cloudthat.com/resources/blog/step-by-step-guide-to-deploy-reactjs-app-on-aws-s3)

  - This is a guide on how to host a ReactJS application on S3. It is a good example of how to host a web application on S3.
