import { DatabaseService } from '@shared/services/database.service';

jest.mock('@shared/environment', () => ({
  DYNAMODB: {
    LOCAL_REGION: 'local-region',
    LOCAL_ENDPOINT: 'http://localhost:8000',
    LOCAL_AWS_ACCESS_KEY: 'local-access-key',
    LOCAL_AWS_SECRET_ACCESS_KEY: 'local-secret',
    REGION: 'prod-region',
    IS_OFFLINE: true,
  },
}));

const mockSend = jest.fn();

jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    ...jest.requireActual('@aws-sdk/client-dynamodb'),
    DynamoDBClient: jest.fn().mockImplementation(() => ({
      send: mockSend,
    })),
  };
});

const singleDBItem = {
  id: { S: 'test-id' },
  name: { S: 'test-name' },
};

const singleJSItem = {
  id: 'test-id',
  name: 'test-name',
};

describe('DatabaseService', () => {
  beforeEach(() => {
    DatabaseService.instance = null;
    mockSend.mockResolvedValue({
      $metadata: {
        httpStatusCode: 200,
      },
      Items: [singleDBItem, singleDBItem],
      Item: singleDBItem,
    });
    jest.clearAllMocks();
  });

  test('should return the existing DynamoDBClient instance if one already exists', () => {
    const firstInstance = DatabaseService.getInstance();
    const secondInstance = DatabaseService.getInstance();

    expect(secondInstance).toBe(firstInstance);
  });

  describe('getAllItems', () => {
    test('it should return an array of items', async () => {
      const response = await DatabaseService.getAllItems({
        TableName: 'test-table',
      });

      expect(response).toEqual([singleJSItem, singleJSItem]);
    });

    test("it should return an empty array if there's no items", async () => {
      mockSend.mockResolvedValue({
        $metadata: {
          httpStatusCode: 200,
        },
        Items: null,
      });

      const response = await DatabaseService.getAllItems({
        TableName: 'test-table',
      });

      expect(response).toEqual([]);
    });
  });
  describe('getItem', () => {
    test('it should return an single item', async () => {
      const response = await DatabaseService.getItem({
        TableName: 'test-table',
        Key: {
          id: { S: 'test-id' },
        },
      });

      expect(response).toEqual(singleJSItem);
    });

    test('it should return null if there is no item', async () => {
      mockSend.mockResolvedValue({
        $metadata: {
          httpStatusCode: 200,
        },
        Item: null,
      });

      const response = await DatabaseService.getItem({
        TableName: 'test-table',
        Key: {
          id: { S: 'test-id' },
        },
      });

      expect(response).toBe(null);
    });
  });
  describe('deleteItem', () => {
    test('it should return true when delete is completed', async () => {
      const response = await DatabaseService.deleteItem({
        TableName: 'test-table',
        Key: {
          id: { S: 'test-id' },
        },
      });

      expect(response).toBe(true);
    });

    test('it should throw an error when delete is not completed', async () => {
      mockSend.mockResolvedValue({
        $metadata: {
          httpStatusCode: 400,
        },
      });

      await expect(
        DatabaseService.deleteItem({
          TableName: 'test-table',
          Key: {
            id: { S: 'test-id' },
          },
        }),
      ).rejects.toThrow('Error deleting item');
    });
  });
  describe('putItem', () => {
    test('it should return true when put is completed', async () => {
      const response = await DatabaseService.putItem({
        TableName: 'test-table',
        Item: {
          id: { S: 'test-id' },
          name: { S: 'test-name' },
        },
      });

      expect(response).toBe(true);
    });

    test('it should throw an error when put is not completed', async () => {
      mockSend.mockResolvedValue({
        $metadata: {
          httpStatusCode: 400,
        },
      });

      await expect(
        DatabaseService.putItem({
          TableName: 'test-table',
          Item: {
            id: { S: 'test-id' },
            name: { S: 'test-name' },
          },
        }),
      ).rejects.toThrow('Error putting item');
    });
  });
});
