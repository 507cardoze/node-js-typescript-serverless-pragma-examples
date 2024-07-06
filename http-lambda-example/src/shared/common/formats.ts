import dayjs from 'dayjs';
import 'dayjs/locale/es';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const enum DateFormats {
  DDMMYYYY = 'DDMMYYYY',
  'DD-MMM-YYYY' = 'DD-MMM-YYYY',
  'h:mm a' = 'h:mm a',
  'DD-MM-YYYY' = 'DD-MM-YYYY',
  'DD/MM/YYYY' = 'DD/MM/YYYY',
  'MM/DD/YYYY' = 'MM/DD/YYYY',
  YYYYMMDD = 'YYYYMMDD',
  'YYYY-MM-DD' = 'YYYY-MM-DD',
  'YYYY/MM/DD' = 'YYYY/MM/DD',
  'YYYY-MM-DDTHH:mm:ss' = 'YYYY-MM-DDTHH:mm:ss',
  'YYYY-MM-DDTHH:mm:ss.SSSZ' = 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  'DD-MM' = 'DD-MM',
  'dayjs' = 'dayjs',
  'date' = 'date',
  'YYYYMMDDHHmmssSSS' = 'YYYYMMDDHHmmssSSS',
  'YYYY-MM-DD-HH.mm.ss.SSSSSS' = 'YYYY-MM-DD-HH.mm.ss.SSSSSS',
  'ISO-String' = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
}

type dateEnumType = {
  [key in Exclude<DateFormats, 'dayjs' | 'date'>]: string;
} & {
  dayjs: dayjs.Dayjs;
} & {
  date: Date;
};

const dayjsToFormat = <G extends DateFormats>(date: dayjs.Dayjs, format: G): dateEnumType[G] => {
  if (format === DateFormats['dayjs']) return date as dateEnumType[G];
  if (format === DateFormats['date']) return date.toDate() as dateEnumType[G];

  return date.format(format) as dateEnumType[G];
};

/**
 * Returns the current date in the specified timezone and specified format.
 * @returns date in the specified format.
 */
export const getCurrentDate = <G extends DateFormats>(format?: G, tz?: string) => {
  const date = dayjs().tz(tz);

  return dayjsToFormat(date, format ?? DateFormats['YYYY-MM-DDTHH:mm:ss.SSSZ']) as dateEnumType[G];
};

/**
 * Returns the current date for notifications in the specified timezone.
 * @returns date in the specified format.
 */
export const getCurrentDateNotifications = (tz?: string) => {
  const datetimeTZ = dayjs().tz(tz);
  const date = datetimeTZ.locale('es').format('DD-MMM-YYYY');
  const time = datetimeTZ.format('h:mm a');
  const complement = datetimeTZ.hour() === 1 || datetimeTZ.hour() === 13 ? 'a la' : 'a las';

  return `${date} ${complement} ${time}`;
};

/**
 * Formats a date from one format to another.
 *
 * @param {dayjs.ConfigType} date - The date to be formatted. It can be a string, a number(Unix timestamp), a Date object, or a dayjs object.
 * @param {DateFormats} inputFormat - The format of the input date. Should be one of the values defined in the `DateFormats` enum.
 * @param {DateFormats} outputFormat - The desired format of the output date. Should be one of the values defined in the `DateFormats` enum.
 * @returns {string} The formatted date as a string when date is valid or literal 'Invalid Date' when it isn't.
 */
export const formatDate = <G extends DateFormats>(date: dayjs.ConfigType, inputFormat: DateFormats, outputFormat: G) => {
  return dayjsToFormat(dayjs(date, inputFormat, true), outputFormat) as dateEnumType[G];
};

/**
 * The 'formatAmount' function takes in a number or string as input and returns a string representation of that number formatted with two decimal places.
 *
 * @param amount - The number or string to be formatted.
 * @returns The formatted string representation of the input number with two decimal places.
 */
export const formatAmount = (amount: number | string): string => {
  const amountNumber: number = Number(amount);
  const amountFormatted: string = amountNumber.toFixed(2);

  return amountFormatted;
};
/**
 * urlRemoveTrailingSlash
 * @description remove trailing slash from url
 * @param url
 * @returns url without trailing slash
 */
export const urlRemoveTrailingSlash = (url: string) => {
  if (url.endsWith('/')) {
    return url.slice(0, -1);
  }
  return url;
};

/**
 * creditCardNumberMask
 * @description mask credit card number with asterisks
 * @param value
 * @returns masked credit card number
 */
export const creditCardNumberMask = (value: string) => {
  return value.slice(value.length - 4, value.length);
};

/**
 * Returns a substring of the input value, starting from the last 'cutBy' characters.
 *
 *
 * @param value - The input string.
 * @param cutBy - The number of characters to be included in the substring. Default value is 4.
 * @returns The substring of the input value, starting from the last 'cutBy' characters.
 * @example
 * const value = "123456789";
 * const result = splitAccountnumber(value, 4);
 * console.log(result); // Output: "6789"
 */
export const splitAccountnumber = (value: string, cutBy: number = 4) => {
  return value.slice(value.length - cutBy, value.length);
};

/**
 * Removes accents from a given string.
 *
 * @param {string} text - The input text that may contain accented characters.
 * @returns {string} - A new string with all accents removed from the input text.
 *
 * @example
 * const text = "Café";
 * const result = removeAccent(text);
 * console.log(result); // Output: "Cafe"
 */
export const removeAccent = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Truncates a string if it exceeds the length given characters in length.
 *
 * @param text - The input string to be truncated.
 * @param length - The length of the truncated string. Default value is 40.
 * @returns The truncated version of the input string, if it exceeds 40 characters in length.
 *
 * @example
 * const input = "This is a long string that needs to be truncated";
 * const output = truncateString(input, 40);
 * console.log(output); // "This is a long string that needs to be trunca"
 */
export const truncateString = (text: string, length: number = 40) => {
  return text.length <= length ? text : text.slice(0, length);
};

/**
 * Checks if a given method is valid based on a list of allowed methods.
 *
 * @param method - The method to be checked.
 * @param allowedMethods - The list of allowed methods.
 * @returns True if the method is found in the allowedMethods array (case-insensitive), false otherwise.
 *
 * @example
 * const method = 'GET';
 * const allowedMethods = ['GET', 'POST', 'PUT'];
 * const isValid = isMethodValid(method, allowedMethods);
 * console.log(isValid); // true
 */
export const isMethodValid = (method: string, allowedMethods: string[]) => {
  return allowedMethods.some((allowMethod) => allowMethod.toLowerCase() === method.toLowerCase());
};
