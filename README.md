# Serverless, Anonymous Post Board

This is a serverless, anonymous post board. It is built with [AWS Lambda](https://aws.amazon.com/lambda/), [Amazon API Gateway](https://aws.amazon.com/api-gateway/), [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), and [NextJS](https://nextjs.org/) on [Vercel](https://vercel.com).

The post board is a simple web application that allows users to post messages to a board. The messages are stored in a DynamoDB table. The web application is hosted on GitHub Pages and uses API Gateway to call the Lambda functions.

## Architecture

The post board is composed of the following components:

- Cloud Backend

  - **DynamoDB table**: The DynamoDB table is used to store the posts and replies. The table is partitioned by the post ID. The table is also configured to automatically delete posts after 30 days.
  - **Lambda functions**: Lambda functions are used to create, read, update, and delete posts. The Lambda functions are called by the API Gateway.
  - **API Gateway**: API Gateway is used to create the HTTP API for the post board. It is used to call the Lambda functions and to serve the web application. HTTP API is used instead of REST API because it is cheaper and traffic will be low.

- Web Application
  - **Vercel**: Vercel is used to host the web application.
  - **NextJS**: NextJS is used to create the web application to interact with the API Gateway.

## Resources

- [Serverless Chat Application](https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-chat-app.html)

  - This is a chat application that uses API Gateway and Lambda functions. It is a good example of how to use API Gateway and Lambda functions together. Note that this application uses WebSockets, rather this application uses RESTful API calls.

- [Behind the scenes of Lambda](https://www.bschaatsbergen.com/behind-the-scenes-lambda/)

  - This is a blog post that explains how Lambda functions are called by API Gateway. It is a good resource to understand the underlying architencture of Lambda functions.

- [NextJS App on Github Pages](https://github.com/marmig0404/portfolio)

  - This is a repository of a NextJS App hosted on Github Pages by Martin Miglio.
