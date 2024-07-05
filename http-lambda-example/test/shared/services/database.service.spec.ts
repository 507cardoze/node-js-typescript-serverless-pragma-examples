import { DatabaseService } from '@shared/services/database.service';

jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    ...jest.requireActual('@aws-sdk/client-dynamodb'),
    DynamoDBClient: jest.fn().mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({
        $metadata: {
          httpStatusCode: 200,
        },
      }),
    })),
  };
});

describe('DatabaseService', () => {
  test('Testing putItem method', async () => {
    const response = await DatabaseService.putItem({
      TableName: 'test-table',
      Item: {
        id: { S: 'test-id' },
        name: { S: 'test-name' },
      },
    });

    expect(response).toBe(true);
  });
});
