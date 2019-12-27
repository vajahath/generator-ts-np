import { getEjsMapping } from '../dist/mappings';

describe('testing get for full ejs mapping', () => {
  test('the function should internally mock generator', () => {
    const result = getEjsMapping();

    expect(result.queries.length).not.toBe(0);
    expect(result.scopedPackageNameKey).not.toBe('x');
  });
});
