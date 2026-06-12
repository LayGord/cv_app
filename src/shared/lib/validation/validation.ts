export const isEmpty = (value?: string) => !value?.trim();
export const isShorterThan = (value: string, length: number) => value.trim().length < length;