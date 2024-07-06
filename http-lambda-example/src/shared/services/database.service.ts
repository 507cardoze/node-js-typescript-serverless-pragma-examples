import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import environment from '@shared/environment';

export class DatabaseService {
  static instance: DynamoDBClient;

  public static getInstance(): DynamoDBClient {
    if (!DatabaseService.instance) {
      const config = environment.DYNAMODB.IS_OFFLINE
        ? { region: environment.DYNAMODB.LOCAL_REGION, endpoint: environment.DYNAMODB.LOCAL_ENDPOINT }
        : { region: environment.DYNAMODB.STAGE };

      DatabaseService.instance = new DynamoDBClient(config);
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
