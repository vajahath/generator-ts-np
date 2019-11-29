import {
  verifyMappingFromBaseStructure,
  verifyMapping
} from '../../dist/utils/verify-mapping';

const schema = {
  $ref: '#/definitions/IBaseStructureMapping',
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    IBaseStructureMapping: {
      additionalProperties: {
        additionalProperties: false,
        properties: {
          default: {},
          description: { type: 'string' },
          key: { type: 'string' },
          name: { type: 'string' }
        },
        required: ['key', 'name', 'description', 'default'],
        type: 'object'
      },
      type: 'object'
    }
  }
};

describe('testing meta-json validator', () => {
  test('testing with good data', () => {
    const data = {
      npmScope: {
        name: 'NPM scope',
        key: '__tsnp__npm_scope',
        description: 'npm scope with @',
        default: null
      }
    };

    expect(verifyMappingFromBaseStructure(schema, data)).toBe(true);
  });
  test('testing with bad data - 1', () => {
    const data = {
      npmScope: {
        // name: 'NPM scope',
        key: '__tsnp__npm_scope',
        description: 'npm scope with @',
        default: null
      }
    };

    expect(() => verifyMappingFromBaseStructure(schema, data)).toThrow();
  });
  test('testing with bad data - 2', () => {
    const data = {
      npmScope: {
        name: 'NPM scope',
        key: '__tsnp__npm_scope',
        // description: 'npm scope with @',
        default: null
      }
    };

    expect(() => verifyMappingFromBaseStructure(schema, data)).toThrow();
  });
  test('testing with bad data - 3', () => {
    const data = {
      npmScope: {
        name: 'NPM scope',
        key: '__tsnp__npm_scope',
        description: 'npm scope with @',
        descriptionExtra: 'npm scope with @',
        default: null
      }
    };

    expect(() => verifyMappingFromBaseStructure(schema, data)).toThrow();
  });
});

describe('testing integrated verifyMapping', () => {
  test('Base structure should have good meta file', async () => {
    await verifyMapping();
  }, 15000);
});
