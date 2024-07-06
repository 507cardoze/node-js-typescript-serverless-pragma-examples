import { SchemaValidator } from '@shared/common/schema-validator';
import { ProductKeySchema, ProductSchema } from '@shared/schemas/product.schema';
import { TAnySchema } from '@sinclair/typebox';

export class ProductValidatorService {
  private validate<T>(payload: unknown, schema: TAnySchema): T {
    const validated = new SchemaValidator().validate(payload, schema);

    if (validated.error !== null) throw new Error(validated.error);

    return validated.data as T;
  }
  public validateProduct(product: unknown) {
    return this.validate<ProductSchema>(product, ProductSchema);
  }

  public validateProductId(productId: unknown) {
    return this.validate<ProductKeySchema>(productId, ProductKeySchema);
  }
}
