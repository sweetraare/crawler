export const parseTextToNumber = (
  text: string,
  defaultValue?: number,
): number => {
  const parsedValue = parseInt(text);
  const isTextNaN = isNaN(parsedValue);

  if (isTextNaN) return defaultValue || 0;

  return parsedValue;
};
