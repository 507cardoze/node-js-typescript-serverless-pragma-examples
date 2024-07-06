import { Static, TAnySchema, TObject } from '@sinclair/typebox/';
import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler';

/**
 * The return type of the SchemaValidator.validate method.
 */

export type SchemaParserReturnType<D, E> =
  | {
      data: D;
      error: null;
    }
  | {
      error: E;
    };

/**
 * The SchemaValidator class is used to validate objects against a schema.
 */

export class SchemaValidator {
  private static _validators: WeakMap<TAnySchema, TypeCheck<TAnySchema>> = new WeakMap();

  /**
   *
   * Creates an instance of the `SchemaValidator` class.
   * @param schemas optional schemas to be added to the cache.
   *
   */
  constructor(schemas?: TObject[]) {
    if (schemas) {
      SchemaValidator.addValidators(schemas);
    }
  }

  /**
   * Validates an object against a schema.
   * @param data The object to be validated.
   * @param schema The schema to validate the object against.
   * @returns An object containing the validated data or an error message.
   * @example
   * const schema = Type.Object({
   *    name: Type.String(),
   *    age: Type.Number(),
   * });
   * const data = {
   *    name: 'John Doe',
   *    age: 30,
   * };
   * const validator = new SchemaValidator();
   * const result = validator.validate(data, schema);
   * if (result.error) {
   *    console.log(result.error);
   * } else {
   *    console.log(result.data); // Output: { name: 'John Doe', age: 30 }
   * }
   */
  validate<T extends TAnySchema, B = Static<T>>(data: unknown, schema: T): SchemaParserReturnType<B, string> {
    const validator = SchemaValidator.getValidator(schema);

    if (!validator.Check(data)) {
      const errorObject = validator.Errors(data).First();

      return {
        error: `${errorObject?.message ?? 'Invalid Object'} at ${errorObject?.path ?? 'root'}`,
      };
    }

    return {
      data: data as B,
      error: null,
    };
  }

  /**
   * Validates an object against a schema. Throws a BanistmoError with status code 400 if the object is invalid.
   * @param data The object to be validated.
   * @param schema The schema to validate the object against.
   * @returns An object containing the validated data or an error message.
   * @example
   * const schema = Type.Object({
   *   name: Type.String(),
   *   age: Type.Number(),
   * });
   *
   * const data = {
   *  name: 'John Doe',
   *  age: 30,
   * };
   * const validator = new SchemaValidator();
   * const result = validator.validateThrow(data, schema);
   *
   * console.log(result); // Output: { name: 'John Doe', age: 30 }
   *
   * @throws {BanistmoError} - If the object is invalid.
   */
  validateThrow<T extends TAnySchema, B = Static<T>>(data: unknown, schema: T): B {
    const validator = SchemaValidator.getValidator(schema);

    if (!validator.Check(data)) {
      const errorObject = validator.Errors(data).First();

      throw new Error(`${errorObject?.message ?? 'Invalid Object'} at ${errorObject?.path ?? 'root'}`);
    }

    return data as B;
  }
  /**
   *  Gets the validator for a given schema and caches it.
   *
   * @param schema The schema to get the validator for.
   * @returns The validator for the given schema.
   *
   */

  static getValidator(schema: TAnySchema): TypeCheck<TAnySchema> {
    let validator = this._validators.get(schema);

    if (!validator) {
      validator = TypeCompiler.Compile(schema);
      this._validators.set(schema, validator);
    }

    return validator;
  }

  /**
   *
   * Adds validators to the cache.
   * @param validators The validators to be added to the cache.
   *
   */
  static addValidators(validators: TAnySchema[]) {
    validators.forEach((validator) => {
      this._validators.set(validator, TypeCompiler.Compile(validator));
    });
  }

  /**
   * Clears the validators cache.
   *
   */
  static clearValidators() {
    this._validators = new WeakMap();
  }

  /**
   * Gets cached validators.
   * @returns The cached validators.
   */
  static get validators() {
    return this._validators;
  }
}
