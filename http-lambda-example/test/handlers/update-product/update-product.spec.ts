import { handler } from '@handlers/update-product/update-product';

const mockUpdateProduct = jest.fn();

jest.mock('@shared/controllers/products.controller', () => {
  return {
    ...jest.requireActual('@shared/controllers/products.controller'),
    ProductsController: jest.fn().mockImplementation(() => ({
      updateProduct: mockUpdateProduct,
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

    mockUpdateProduct.mockResolvedValueOnce('1234');

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

    mockUpdateProduct.mockRejectedValueOnce(new Error('Internal Server Error'));

    // @ts-ignore
    const response = await handler(event, context);

    expect(response.statusCode).toBe(500);
  });
});
