import { ProductValidatorService } from '@shared/services/product-validator.service';

describe('ProductValidatorService', () => {
  let service: ProductValidatorService;

  beforeEach(() => {
    service = new ProductValidatorService();
  });

  describe('validateProduct', () => {
    test('should validate the product schema', () => {
      const expectedValue = {
        display_name: 'John Doe',
        email: 'test@email.com',
      };

      const validatedProduct = service.validateProduct(expectedValue);

      expect(validatedProduct).toEqual(expectedValue);
    });

    test('should throw an error when the product schema is invalid', () => {
      const invalidProduct = {
        display_name: 'John Doe',
      };

      expect(() => service.validateProduct(invalidProduct)).toThrow();
    });
  });
  describe('validateProductId', () => {
    test('should validate the product id schema', () => {
      const expectedId = '6f93d6a8-bd38-464d-8e85-2bc44ae9bd30';

      const validatedProductId = service.validateProductId(expectedId);

      expect(validatedProductId).toEqual(expectedId);
    });

    test('should throw an error when the product id schema is invalid', () => {
      const invalidId = '6f93d6a8-bd38-464d-8e85';

      expect(() => service.validateProductId(invalidId)).toThrow();
    });
  });
});
