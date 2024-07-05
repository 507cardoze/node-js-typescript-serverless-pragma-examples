import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';

export class DatabaseService {
  static instance: DynamoDBClient;

  public static getInstance(): DynamoDBClient {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DynamoDBClient();
    }

    return DatabaseService.instance;
  }

  public static async putItem(params: PutItemCommandInput) {
    const client = DatabaseService.getInstance();
    const queryCommand = new PutItemCommand(params);
    const response = await client.send(queryCommand);

    return response.$metadata.httpStatusCode === 200;
  }
}
