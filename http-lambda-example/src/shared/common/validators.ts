import { FormatRegistry } from '@sinclair/typebox';
const validatorsTemp = {} as const;

type validatorsObjectType = {
  [key in `${'isValid'}${Capitalize<keyof typeof validatorsTemp>}`]: (value: string) => boolean;
};

export const validators = new Proxy(
  {},
  {
    get: (_target, prop) => {
      const isValid = prop.toString().substring(0, 7);
      const format = prop.toString().substring(7);

      if (isValid !== 'isValid') {
        throw new Error('Invalid property');
      }
      const name = Object.keys(validatorsTemp).find((key) => key.toLocaleLowerCase() === format.toLocaleLowerCase());

      if (!name) {
        throw new Error('Invalid format');
      }

      return (value: string) => FormatRegistry.Get(name)?.(value) ?? false;
    },
  },
) as validatorsObjectType;
