## http-lambda-example: A Serverless API with DynamoDB

This project deploys a serverless API built with AWS Lambda and DynamoDB. It provides functionalities to manage products in a DynamoDB table.

### Features

* List all products
* Get a specific product by ID
* Create a new product
* Update an existing product
* Delete a product

### Technologies

* **Serverless Framework:** Used to define and deploy the serverless application.
* **AWS Lambda:** Serverless compute service to run the API functions.
* **DynamoDB:** NoSQL database service for product data.
* **API Gateway:** Service for handling HTTP requests to the API.
* **Serverless Plugins:**
    * `serverless-esbuild`: Bundles and minifies the Lambda code.
    * `serverless-tscpaths`: Resolves TypeScript paths for code organization.
    * `serverless-plugin-resource-tagging`: Adds tags to deployed resources.
    * `serverless-prune-plugin`: Automatically removes old deployments.
    * `serverless-offline`: Enables local development with an offline API.
    * `serverless-dynamodb-local`: Provides a local DynamoDB instance for development.

### Deployment

This project uses environment variables to configure the deployment.

* `REGION`: The AWS region for deployment (e.g., `us-east-1`).
* `STAGE`: The deployment stage (e.g., `dev`, `prod`).
* `ACCOUNT_ID`: Your AWS account ID.
* `DEPLOYMENT_BUCKET`: The S3 bucket name for deployments (replace with a unique name).
* `VPC_SECURITY_GROUP_ID`: The ID of the VPC Security Group (replace with your security group ID).
* `VPC_SUBNET_ID`: The ID of the VPC Subnet (replace with your subnet ID).
* `API_GATEWAY_ROOT_RESOURCE_ID`: (Import value from another stack if applicable).
* `API_GATEWAY_ID`: (Import value from another stack if applicable).
* `API_GATEWAY_RESOURCE_ID`: (Import value from another stack if applicable).
* `PRODUCTS_TABLE_NAME`: The name of the DynamoDB table (use a unique name with stage prefix).
* `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
* `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.

**Local Development:**

1. Install dependencies: `npm install`
2. Start the local development server with DynamoDB: `npm run offline` (ensure DynamoDB is running locally)
3. Make sure to run `npm run create-dynamodb-table` to create the DynamoDB table in order to test it locally.

### API Endpoints

The API provides the following endpoints:

* **GET /api/http-example/products:** List all products.
* **GET /api/http-example/products/{product_id}:** Get a specific product by ID.
* **POST /api/http-example/products:** Create a new product. (Request body should contain product details)
* **PUT /api/http-example/products/{product_id}:** Update an existing product. (Request body should contain product updates)
* **DELETE /api/http-example/products/{product_id}:** Delete a product.

**CORS configuration allows requests from:**

* [https://my-company-domain.com](https://my-company-domain.com)  (Replace with your allowed origin)

**Note:** This is a basic example made for pragmatic programmers in order to guidethrough the creation of REST API with AWS serverless lambdas and Typescript. You might need to modify it based on your specific requirements and install addicional dependencies.
