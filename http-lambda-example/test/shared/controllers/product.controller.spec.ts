import { ProductsController } from '@shared/controllers/products.controller';
import { ProductService } from '@shared/services/products.service';

jest.mock('@shared/services/products.service');

const mockGetProducts = jest.fn();
const mockCreateProduct = jest.fn();
const mockGetProduct = jest.fn();
const mockDeleteProduct = jest.fn();
const mockValidateProductId = jest.fn();
const mockValidateProduct = jest.fn();

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
    controller = new ProductsController(service);

    service.getProducts = mockGetProducts;
    service.createProduct = mockCreateProduct;
    service.getProduct = mockGetProduct;
    service.deleteProduct = mockDeleteProduct;
    service.validateProductId = mockValidateProductId;
    service.validateProduct = mockValidateProduct;

    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    test('should return all products', async () => {
      const expectedProducts = [
        { product_id: '1', email: ' [email protected]', display_name: 'Product 1' },
        { product_id: '2', email: ' [email protected]', display_name: 'Product 2' },
      ];

      mockGetProducts.mockResolvedValueOnce(expectedProducts);

      const products = await controller.getProducts();

      expect(products).toEqual(expectedProducts);
    });
  });
  describe('createProduct', () => {
    test('should create a new product', async () => {
      const product = { email: ' [email protected]', display_name: 'Product 1' };

      mockCreateProduct.mockResolvedValueOnce(product);

      const newProduct = await controller.createProduct(product);

      expect(newProduct).toEqual(product);
    });
  });
  describe('getProduct', () => {
    test('should return a product', async () => {
      const expectedProduct = { product_id: '1', email: ' [email protected]', display_name: 'Product 1' };

      mockGetProduct.mockResolvedValueOnce(expectedProduct);

      const product = await controller.getProduct('1');

      expect(product).toEqual(expectedProduct);
    });

    test('should throw an error if product is not found', async () => {
      mockGetProduct.mockResolvedValueOnce(null);

      await expect(controller.getProduct('1')).rejects.toThrow();
    });
  });
  describe('deleteProduct', () => {
    test('should delete a product', async () => {
      mockValidateProductId.mockReturnValueOnce('1');
      mockDeleteProduct.mockResolvedValueOnce(true);

      const expectedProduct = { product_id: '1', email: ' [email protected]', display_name: 'Product 1' };

      mockGetProduct.mockResolvedValueOnce(expectedProduct);

      const result = await controller.deleteProduct('1');

      expect(result).toBe('1');
    });

    test('should throw an error if product is not found', async () => {
      mockValidateProductId.mockReturnValueOnce('1');
      mockGetProduct.mockResolvedValueOnce(null);

      await expect(controller.deleteProduct('1')).rejects.toThrow();
    });
  });
  describe('updateProduct', () => {
    test('should update a product', async () => {
      const product = { email: ' [email protected]', display_name: 'Product 1' };

      mockCreateProduct.mockResolvedValueOnce(product);
      mockValidateProduct.mockReturnValueOnce(product);
      mockValidateProductId.mockReturnValueOnce('1');
      mockGetProduct.mockResolvedValueOnce(product);

      const result = await controller.updateProduct('1', product);

      expect(result).toBe('1');
    });

    test('should throw an error if product is not found', async () => {
      const product = { email: ' [email protected]', display_name: 'Product 1' };

      mockCreateProduct.mockResolvedValueOnce(product);
      mockValidateProduct.mockReturnValueOnce(product);
      mockValidateProductId.mockReturnValueOnce('1');
      mockGetProduct.mockResolvedValueOnce(null);

      await expect(controller.updateProduct('1', product)).rejects.toThrow();
    });
  });
});
