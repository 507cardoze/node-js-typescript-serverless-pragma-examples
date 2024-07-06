import environment from '@shared/environment';
import { ProductService } from '@shared/services/products.service';

export class ProductsController {
  constructor(private service: ProductService) {
    this.service = service;
  }

  async getProducts() {
    return await this.service.getProducts();
  }

  async createProduct(product: unknown) {
    const validatedProduct = this.service.validateProduct(product);

    return await this.service.createProduct(validatedProduct);
  }

  async getProduct(productId: unknown) {
    const validatedProductId = this.service.validateProductId(productId);

    const product = await this.service.getProduct(validatedProductId);

    if (!product) throw new Error(environment.CODES.STATUS.RESOURCE_NOT_FOUND);

    return product;
  }

  async deleteProduct(productId: unknown) {
    const validatedProductId = this.service.validateProductId(productId);

    const productIdExists = await this.service.getProduct(validatedProductId);

    if (!productIdExists) throw new Error(environment.CODES.STATUS.RESOURCE_NOT_FOUND);

    await this.service.deleteProduct(validatedProductId);

    return validatedProductId;
  }

  async updateProduct(productId: unknown, product: unknown) {
    const validatedProductId = this.service.validateProductId(productId);
    const validatedProduct = this.service.validateProduct(product);

    const productIdExists = await this.service.getProduct(validatedProductId);

    if (!productIdExists) throw new Error(environment.CODES.STATUS.RESOURCE_NOT_FOUND);

    await this.service.updateProduct(validatedProductId, validatedProduct);

    return validatedProductId;
  }
}
