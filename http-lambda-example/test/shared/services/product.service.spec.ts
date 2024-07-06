import { ProductService } from '@shared/services/products.service';
import { DatabaseService } from '@shared/services/database.service';

jest.mock('@shared/services/database.service');

const mockGetAllItems = jest.fn();
const mockGetItem = jest.fn();
const mockDeleteItem = jest.fn();
const mockUpdateItem = jest.fn();

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    DatabaseService.getAllItems = mockGetAllItems;
    DatabaseService.getItem = mockGetItem;
    DatabaseService.putItem = mockUpdateItem;
    DatabaseService.deleteItem = mockDeleteItem;
  });

  describe('getProducts', () => {
    test('should return all products', async () => {
      const expectedProducts = [
        { product_id: '1', email: ' [email protected]', display_name: 'Product 1' },
        { product_id: '2', email: ' [email protected]', display_name: 'Product 2' },
      ];

      mockGetAllItems.mockResolvedValue(expectedProducts);

      const products = await productService.getProducts();

      expect(products).toEqual(expectedProducts);
    });
  });
  describe('createProduct', () => {
    test('should create a new product', async () => {
      const product = { email: ' [email protected]', display_name: 'Product 1' };

      mockUpdateItem.mockResolvedValue(product);

      const newProduct = await productService.createProduct(product);

      expect(newProduct).toEqual(product);
    });
  });
  describe('getProduct', () => {
    test('should return a product', async () => {
      const expectedProduct = { product_id: '1', email: ' [email protected]', display_name: 'Product 1' };

      mockGetItem.mockResolvedValue(expectedProduct);

      const product = await productService.getProduct('1');

      expect(product).toEqual(expectedProduct);
    });
  });
  describe('deleteProduct', () => {
    test('should delete a product', async () => {
      mockDeleteItem.mockResolvedValue(true);

      const result = await productService.deleteProduct('1');

      expect(result).toBe(true);
    });
  });
  describe('updateProduct', () => {
    test('should update a product', async () => {
      const product = { email: ' [email protected]', display_name: 'Product 1' };

      mockUpdateItem.mockResolvedValue(product);

      const updatedProduct = await productService.updateProduct('1', product);

      expect(updatedProduct).toEqual(product);
    });
  });

  describe('getProductById', () => {
    test('should return a product', async () => {
      const expectedProduct = { product_id: '1', email: ' [email protected]', display_name: 'Product 1' };

      mockGetItem.mockResolvedValue(expectedProduct);

      const product = await productService.getProductById('1');

      expect(product).toEqual(expectedProduct);
    });
  });
});
