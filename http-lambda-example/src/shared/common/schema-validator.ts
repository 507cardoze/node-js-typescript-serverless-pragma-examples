import { Static, TAnySchema, TObject } from '@sinclair/typebox/';
import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler';

export type SchemaParserReturnType<D, E> =
  | {
      data: D;
      error: null;
    }
  | {
      error: E;
    };

export class SchemaValidator {
  private static _validators: WeakMap<TAnySchema, TypeCheck<TAnySchema>> = new WeakMap();

  constructor(schemas?: TObject[]) {
    if (schemas) {
      SchemaValidator.addValidators(schemas);
    }
  }
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

  validateThrow<T extends TAnySchema, B = Static<T>>(data: unknown, schema: T): B {
    const validator = SchemaValidator.getValidator(schema);

    if (!validator.Check(data)) {
      const errorObject = validator.Errors(data).First();

      throw new Error(`${errorObject?.message ?? 'Invalid Object'} at ${errorObject?.path ?? 'root'}`);
    }

    return data as B;
  }

  static getValidator(schema: TAnySchema): TypeCheck<TAnySchema> {
    let validator = this._validators.get(schema);

    if (!validator) {
      validator = TypeCompiler.Compile(schema);
      this._validators.set(schema, validator);
    }

    return validator;
  }

  static addValidators(validators: TAnySchema[]) {
    validators.forEach((validator) => {
      this._validators.set(validator, TypeCompiler.Compile(validator));
    });
  }

  static clearValidators() {
    this._validators = new WeakMap();
  }

  static get validators() {
    return this._validators;
  }
}
