import { add } from '../src';

describe('testing add function', () => {
  test('2+9 should be 11', () => {
    expect(add(2, 9)).toBe(11);
  });
});
