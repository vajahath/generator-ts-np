import { getBaseStructureNamingJsonSchema } from '../../dist/utils/base-structure-name-mapping';

describe('Testing get-base-structure-naming-schema', () => {
  test('The getBaseStructureNamingJsonSchema should return a valid schema', async () => {
    const sch = await getBaseStructureNamingJsonSchema();
    expect(sch['$schema']).toBe('http://json-schema.org/draft-07/schema#');
  }, 14000);
});
