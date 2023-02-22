# The API for the Anonymous Postboard

This directory contains the API for the Anonymous Postboard. The API is documented using the OpenAPI specification in `schema/openapi.yml`. The API is implemented using the AWS API Gateway and AWS Lambda.

## Schema

The schema is documented using the OpenAPI specification. The schema is located in `schema/openapi.yml`. The schema is used to document the API Gateway and Lambda resources.

## Lambda

This directory contains the Lambda functions that implement the API. The Lambda functions are implemented using the AWS SAM framework. The functions are written in Node.js. There are two functions: `CS351-Project-Posts` and `CS351-Project-Replies`. The functions handle HTTP Requests for the `/posts` and `/replies` endpoints respectively.

## Postman

This directory contains collections to be used with Postman. The collections are used to test the API. The collections are generated from the OpenAPI schema using the OpenAPI Postman Generator. The collections can be used on [Postman's web interface](https://www.postman.com/) or the [Postman desktop application](https://www.postman.com/downloads/).
