import { FormatRegistry } from '@sinclair/typebox';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { DateFormats } from '@shared/common/formats';
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

//this validators will be added to the FormatRegistry of typebox, so we can use them in the schemas
// 'isValid' will be added automatically, so you can use it like this: validators.isValidEmail
// you can pass a regex or a function that returns a boolean
const validatorsTemp = {
  UUID: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  userId: /^[a-zA-Z0-9-_.@]*$/,
  password: /^[a-zA-Z0-9!@"/=?¿¡[+,;><^{}#$%^&*()-_]*$/,
  date: (value: string) => dayjs(value, DateFormats['YYYY-MM-DDTHH:mm:ss.SSSZ'], true).isValid(),
} as const;

//this validators will not be added to the FormatRegistry of typebox,
// nothing will be added to the name, so you need to provide the full name
const extraValidators = {
  isBetweenDates: (date: Date, startDate: Date, endDate: Date) => {
    const firstDate = dayjs(date);
    const minDate = dayjs(startDate);
    const maxDate = dayjs(endDate);

    return firstDate.isBetween(minDate, maxDate);
  },
} as const;

const _registerFormats = () => {
  (Object.keys(validatorsTemp) as Array<keyof typeof validatorsTemp>).forEach((format) => {
    FormatRegistry.Set(format, (value) => {
      const temp = validatorsTemp[format];

      if (typeof temp === 'function') {
        return temp(value);
      }
      return temp.test(value);
    });
  });
};

_registerFormats();

type validatorsObjectType = {
  [key in `${'isValid'}${Capitalize<keyof typeof validatorsTemp>}`]: (value: string) => boolean;
} & {
  [key in keyof typeof extraValidators]: (typeof extraValidators)[key];
};

export const validators = new Proxy(
  {},
  {
    get: (target, prop) => {
      const extraValidator = Object.keys(extraValidators).find((key) => key.toLocaleLowerCase() === prop.toString().toLocaleLowerCase());

      if (extraValidator) {
        // @ts-expect-error this is a hack to make the types work
        return (...args: any[]) => extraValidators[extraValidator](...args);
      }

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
  }
) as validatorsObjectType;
