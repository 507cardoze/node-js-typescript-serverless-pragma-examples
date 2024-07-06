import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommandInput,
  ScanCommand,
  DeleteItemCommand,
  DeleteItemCommandInput,
  GetItemCommandInput,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb';
import environment from '@shared/environment';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export class DatabaseService {
  static instance: DynamoDBClient | null = null;

  public static getInstance(): DynamoDBClient {
    if (!DatabaseService.instance) {
      const localConfigs = {
        region: environment.DYNAMODB.LOCAL_REGION,
        endpoint: environment.DYNAMODB.LOCAL_ENDPOINT,
        accessKeyId: environment.DYNAMODB.LOCAL_AWS_ACCESS_KEY,
        secretAccessKey: environment.DYNAMODB.LOCAL_AWS_SECRET_ACCESS_KEY,
      };

      const config = environment.DYNAMODB.IS_OFFLINE ? localConfigs : { region: environment.DYNAMODB.REGION };

      DatabaseService.instance = new DynamoDBClient(config);
    }

    return DatabaseService.instance;
  }

  public static async getAllItems(params: ScanCommandInput) {
    const client = DatabaseService.getInstance();
    const queryCommand = new ScanCommand(params);
    const response = await client.send(queryCommand);

    const items = response.Items ? response.Items.map((item) => unmarshall(item)) : [];

    return items;
  }

  public static async getItem(params: GetItemCommandInput) {
    const client = DatabaseService.getInstance();
    const queryCommand = new GetItemCommand(params);
    const response = await client.send(queryCommand);

    const item = response.Item ? unmarshall(response.Item) : null;

    return item;
  }

  public static async deleteItem(params: DeleteItemCommandInput) {
    const client = DatabaseService.getInstance();
    const queryCommand = new DeleteItemCommand(params);
    const response = await client.send(queryCommand);

    if (response.$metadata.httpStatusCode !== 200) throw new Error('Error deleting item');
    return true;
  }

  public static async putItem(params: PutItemCommandInput) {
    const client = DatabaseService.getInstance();
    const queryCommand = new PutItemCommand(params);
    const response = await client.send(queryCommand);

    if (response.$metadata.httpStatusCode !== 200) throw new Error('Error putting item');
    return true;
  }
}
