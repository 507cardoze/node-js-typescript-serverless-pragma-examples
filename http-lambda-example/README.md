## http-lambda-example: A Serverless API with DynamoDB

This project deploys a serverless API built with AWS Lambda and DynamoDB. It provides functionalities to manage products in a DynamoDB table.

**Note:** This is a basic example made for pragmatic programmers in order to guidethrough the creation of REST API with AWS serverless lambdas and Typescript. You might need to modify it based on your specific requirements and install addicional dependencies.

## The project is structured as follows:

**`src` folder:** Contains all source code.
* **`handlers` folder:** Houses handler files for each Lambda function.
* **`shared` folder:** Stores code that's shared across multiple Lambdas.

**Logical Separation:**
Your separation of handlers, controllers, and services into distinct folders promotes maintainability.

**Granular shared Folder Structure:**
Consider creating subfolders within shared to categorize shared code based on functionality (e.g., `shared/database`, `shared/utils`). This enhances organization and reusability.

If code within shared is truly specific to a single Lambda, it might be better to move it directly into that Lambda's folder (e.g., `src/handlers/myLambdaHandler/myLambdaService.ts`). This reduces redundancy and keeps related code together.

## Here are some key benefits when advocating for this folder structure and documentation approach for your Node.js serverless Lambda codebase in AWS with TypeScript:

**Clear Separation of Concerns:** Separating handlers, controllers, and services into distinct folders enhances code organization and understanding. Developers can easily locate specific functionalities within a Lambda.

**Reduced Complexity:** Granular shared folder structure with subfolders promotes easier navigation and identification of reusable code across different Lambdas.

**Reduced Redundancy:** Placing Lambda-specific code directly within its folder avoids unnecessary duplication in the shared folder. This streamlines code management and reduces the risk of inconsistencies.

**Consistent Structure:** A well-defined folder structure guides developers on code placement, fostering consistency and reducing onboarding time for new team members.

**Improved Code Reusability:** Clear categorization within the shared folder facilitates sharing of common functionalities across Lambdas, promoting code reuse and reducing development effort.

**Faster Debugging:** Logical code organization allows developers to pinpoint issues more quickly, streamlining debugging processes.

**Enhanced Collaboration:** A standardized folder structure and documentation enable better collaboration among team members, as everyone follows a consistent approach to code organization.

**Simplified Unit Testing:** Separation of concerns makes unit testing of individual components (handlers, controllers, services) more straightforward. This leads to more effective testing strategies and better code coverage.

### Features

* List all products
* Get a specific product by ID
* Create a new product
* Update an existing product
* Delete a product

### API Endpoints

The API provides the following endpoints:

* **GET /api/http-example/products:** List all products.
* **GET /api/http-example/products/{product_id}:** Get a specific product by ID.
* **POST /api/http-example/products:** Create a new product. (Request body should contain product details)
* **PUT /api/http-example/products/{product_id}:** Update an existing product. (Request body should contain product updates)
* **DELETE /api/http-example/products/{product_id}:** Delete a product.

**CORS configuration allows requests from:**

* [https://my-company-domain.com](https://my-company-domain.com)  (Replace with your allowed origin)

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

## Local Development:

* **(Optional)**
    * Will need to have the AWS CLI installed and configured with your credentials. Although valid credentials are not necessary if you are testing locally.
    * Also need to have the Serverless Framework installed globally: `npm install -g serverless` or `yarn global add serverless` (Version 3 is currently been used.).
    * It is also recommend to have `Eslint` and `prettier` installed in your code editor to keep the code clean and consistent.

1. It will be required to have node installed in your machine. (You can download it from [here](https://nodejs.org/en/download/) if you don't have it installed already.) Version 18.18.0 is recommended, but any version above that might work. To ensure compatibility, use version 18.18.0 or, if you're using the nvm package, simply run `nvm use` and it will select the correct version automatically.
2. Install dependencies: `npm install` or `yarn install`
3. Start the local development server with DynamoDB: `npm run offline` or `yarn offline` (This will start the server on `http://localhost:3000`)
4. Make sure to run `npm run create-dynamodb-table` or `yarn create-dynamodb-table` to create the DynamoDB table in order to test it locally. (This will create a table with the name `products-dev` in the local DynamoDB instance)

## Making changes to the code:

1. Make changes to the code.
2. Run `git add .` to add files.
3. Run `git commit -m "some changes"` (This will automatically prettify and check for lint errors before committing.)
4. Run `git push` to push changes to the repository. A pre-push hook enforces running unit tests automatically before pushing. If the tests fail, the hook will stop you from pushing the code. Coverage is not necessarily checked by the pre-push hook, though.

All this is done automatically by the `husky` package.

The end goal is to have a clean and consistent codebase and prevent errors from being pushed to the repository.

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
