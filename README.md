# Serverless, Anonymous Post Board

This is a serverless, anonymous post board. It is built with [AWS Lambda](https://aws.amazon.com/lambda/), [Amazon API Gateway](https://aws.amazon.com/api-gateway/), [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), and [NextJS](https://nextjs.org/) on [Vercel](https://vercel.com).

The post board is a simple web application that allows users to post messages to a board. The messages are stored in DynamoDB tables. The web application is hosted on Vercel and uses API Gateway to call the Lambda functions to interact with the DynamoDB tables.

## Architecture

The post board is composed of the following components:

- Cloud Backend

  - **DynamoDB tables**: The DynamoDB tables are used to store the posts and replies. The tables are partitioned by the post and reply ID. The table is also configured to automatically delete posts after 30 days with a TTL set by the lambda functions. The replies table has a secondary index on the post ID to allow for fast retrieval of replies for a post. The tables are configured to use on-demand capacity to allow for the table to scale automatically. The tables are configured to use server-side encryption with AWS KMS to encrypt the data at rest.
  - **Lambda functions**: Lambda functions are used to create, read, update, and delete posts. The Lambda functions are called by the API Gateway. The Lambda functions are written in Node.js and use the AWS SDK to interact with DynamoDB. The source code for the Lambda functions is in the [api/lambda](api/lambda) directory.
  - **API Gateway**: API Gateway is used to create the HTTP API for the post board. It is used to call the Lambda functions and to serve the web application. The schema for the api is in the [api/schemas](api/schemas) directory. HTTP API is used instead of REST API because it is cheaper and traffic will be low. This API Gateway is configured to use a custom domain name: [api.postboard.martinmiglio.dev](https://api.postboard.martinmiglio.dev). The AWS API Gateway with a custom domain also provides load balancing with minimal configuration.
  - **AWS Certificate Manager**: AWS Certificate Manager is used to create the TLS certificate for the custom domain name. The certificate is configured to renew automatically.
  - **Google Domains**: Google Domains is used to manage the domain name. The domain name is configured to point to the API Gateway custom domain name.
  - **AWS CloudWatch**: AWS CloudWatch is used to monitor the Lambda functions, DynamoDB tables, and API Gateway. The logs are configured to expire after 30 days. A public dashboard is available [here](https://cloudwatch.amazonaws.com/dashboard.html?dashboard=CS351-Project-API&context=eyJSIjoidXMtZWFzdC0xIiwiRCI6ImN3LWRiLTUwMTEyMzM0NzYzOCIsIlUiOiJ1cy1lYXN0LTFfUmd3SnMyaENxIiwiQyI6IjZwaXVoYXAwYXY3dWt2aG0ydGhncWZhcDdjIiwiSSI6InVzLWVhc3QtMTpkMDZjMWQyYS1kNzBlLTQ5ZDAtODc3OS1jMTE1OTU3ZjJiMjIiLCJNIjoiUHVibGljIn0=).

- Web Application
  - **Vercel**: Vercel is used to host the web application.
  - **NextJS**: NextJS is used to create the web application to interact with the API Gateway. The source code for the web application is in the [anonymous-post-board](anonymous-post-board) directory.
  - **Google Domains**: Google Domains is used to manage the domain name for the web application. The domain name is configured to point to the Vercel deployment. Vercel manages the TLS certificate for the domain name.

## Deployment

- **AWS Resources**: The AWS resources are deployed using the AWS Console. The resources are deployed in the us-east-1 region. The lambda functions are updated using either the AWS Console or the AWS CLI in the development environment.

- **Web Application**: The web application is deployed using Vercel. The web application is automatically deployed on every push to the main branch, and preview deployments are created on every branch and pull request. The web application is hosted on [postboard.martinmiglio.dev](https://postboard.martinmiglio.dev).

## Testing

- **API Testing**: The Live API is tested with Node.js, Mocha and Chai. The tests are in the [api/tests](api/tests) directory. The tests are run in a GitHub Action on every push to the main branch and on every pull request.

- **Web Application Testing**: The web application is tested with a mock build of the NextJS application. This test is run in a GitHub Action on every push to the main branch and on every pull request.

- **Load Testing**: The deployed web application and API are load tested in different scenarios. The load tests are ran manually using the Jupyter Notebook in the [load-testing](load-testing) directory. The results of the load tests are stored in the notebook, plotted using matplotlib.

## Information

This is a project for CS351: Cloud Computing at Kettering University. This project current does not have a license, but may be licensed in the future.
