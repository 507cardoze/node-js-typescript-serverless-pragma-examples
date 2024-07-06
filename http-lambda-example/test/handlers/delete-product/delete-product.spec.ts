import { handler } from '@handlers/delete-product/delete-product';

const mockDeleteProduct = jest.fn();

jest.mock('@shared/controllers/products.controller', () => {
  return {
    ...jest.requireActual('@shared/controllers/products.controller'),
    ProductsController: jest.fn().mockImplementation(() => ({
      deleteProduct: mockDeleteProduct,
    })),
  };
});

describe('deleteProduct handler', () => {
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

    mockDeleteProduct.mockResolvedValueOnce('1234');

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

    mockDeleteProduct.mockRejectedValueOnce(new Error('Internal Server Error'));

    // @ts-ignore
    const response = await handler(event, context);

    expect(response.statusCode).toBe(500);
  });
});
