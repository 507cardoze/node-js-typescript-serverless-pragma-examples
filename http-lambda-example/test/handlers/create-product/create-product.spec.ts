import { handler } from '@handlers/create-product/create-product';

const mockCreateProduct = jest.fn();

jest.mock('@shared/controllers/products.controller', () => {
  return {
    ...jest.requireActual('@shared/controllers/products.controller'),
    ProductsController: jest.fn().mockImplementation(() => ({
      createProduct: mockCreateProduct,
    })),
  };
});

describe('createProduct handler', () => {
  test('should respond with status code 201', async () => {
    const event = {
      body: {},
    };

    const context = {
      awsRequestId: '1234',
    };

    mockCreateProduct.mockResolvedValueOnce({});

    // @ts-ignore
    const response = await handler(event, context);

    expect(response.statusCode).toBe(201);
  });

  test('should respond with status code 500', async () => {
    const event = {
      body: {},
    };

    const context = {
      awsRequestId: '1234',
    };

    mockCreateProduct.mockRejectedValueOnce(new Error('Internal Server Error'));

    // @ts-ignore
    const response = await handler(event, context);

    expect(response.statusCode).toBe(500);
  });
});
