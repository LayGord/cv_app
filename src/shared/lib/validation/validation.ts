export const isEmpty = (value?: string) => !value?.trim();
export const isShorterThan = (value: string, length: number) => value.trim().length < length;
export const isValidEmail = (value: string) => value.match(/^[a-zA-Z0-9-_]+@[a-z]+[.][a-z]{2,3}$/);
export const isValidPhoneNumber = (value: string) => value.match(/^\+?[0-9]+(-[0-9]+)*$/);
export const isValidLink = (value: string) => value.match(/(www|http:|https:)+\/{2}[^\s]+[\w]/)
export const isNumber = (value: string) => !isNaN(Number(value));