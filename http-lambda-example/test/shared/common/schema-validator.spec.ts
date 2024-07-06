import { Type } from '@sinclair/typebox';
import { SchemaValidator } from '@shared/common/schema-validator';

describe('SchemaValidator', () => {
  const personSchema = Type.Object({
    name: Type.String(),
    age: Type.Number(),
  });

  const validator = new SchemaValidator();
  const validData = {
    name: 'John Doe',
    age: 30,
  };

  const invalidData = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  beforeEach(() => {
    SchemaValidator.clearValidators();
  });

  test('should clear the validators cache', () => {
    SchemaValidator.clearValidators();
    expect(SchemaValidator.validators.get(personSchema)).toBeUndefined();
  });

  test('should add validators to the cache when a schema is passed to the constructor', () => {
    new SchemaValidator([personSchema]);

    expect(SchemaValidator.validators.get(personSchema)).toBeDefined();
  });

  describe('validate', () => {
    test('should add validators to the cache', () => {
      validator.validate({}, personSchema);

      expect(SchemaValidator.validators.get(personSchema)).toBeDefined();
    });

    test('should validate data against a valid schema', () => {
      const result = validator.validate(validData, personSchema) as any;

      expect(result.error).toBeNull();
      expect(result.data).toEqual(validData);
    });

    test('should return an error for invalid data', () => {
      const result = validator.validate(invalidData, personSchema) as any;

      expect(result.error).not.toBeNull();
      expect(result.data).toBeUndefined();
    });
  });

  describe('validateThrow', () => {
    test('should return data', () => {
      expect(validator.validateThrow(validData, personSchema)).toEqual(validData);
    });
    test('should throw an error for invalid data validateThrow', () => {
      expect(() => validator.validateThrow(invalidData, personSchema)).toThrow();
    });
  });
});
