import Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

export function verifyMappingFromBaseStructure(
  schema: {
    [key: string]: any;
  },
  jsonFileContent: {
    [key: string]: any;
  }
) {
  const isValidJson = ajv.validate(schema, jsonFileContent);

  if (!isValidJson) {
    throw new Error('The meta repo info is not correct.');
  }

  return isValidJson;
}
