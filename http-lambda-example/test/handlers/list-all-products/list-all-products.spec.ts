import { handler } from '@handlers/list-all-products/list-all-products';

const mockGetProduct = jest.fn();

jest.mock('@shared/controllers/products.controller', () => {
  return {
    ...jest.requireActual('@shared/controllers/products.controller'),
    ProductsController: jest.fn().mockImplementation(() => ({
      getProducts: mockGetProduct,
    })),
  };
});

describe('listAllProducts handlers', () => {
  test('should respond with status code 200', async () => {
    const event = {
      body: {},
      path: {
        product_id: '1234',
      },
    };

    const context = {
      awsRequestId: '1234',
    };

    mockGetProduct.mockResolvedValueOnce([{ id: '1234' }]);

    // @ts-ignore
    const response = await handler(event, context);

    expect(response.statusCode).toBe(200);
  });

  test('should respond with status code 500', async () => {
    const event = {
      body: {},
    };

    const context = {
      awsRequestId: '1234',
    };

    mockGetProduct.mockRejectedValueOnce(new Error('Internal Server Error'));

    // @ts-ignore
    const response = await handler(event, context);

    expect(response.statusCode).toBe(500);
  });
});
