import { parseTextToNumber } from './parser.utils';

describe('parserTextToNumber', () => {
  it('should return 0 when text is NaN and no default value', () => {
    expect(parseTextToNumber('asdasd')).toEqual(0);
  });

  it('should return defaultValue when text is NaN', () => {
    expect(parseTextToNumber('asdasd', 101)).toEqual(101);
  });

  it('should return a number when it is valid', () => {
    expect(parseTextToNumber('100')).toEqual(100);
  });
});
