import Ajv = require('ajv');

import { getBaseStructureNamingJsonSchema } from './base-structure-name-mapping';
import { BASE_STRUCTURE_META_JSON } from '../config';

const metaJson = require(BASE_STRUCTURE_META_JSON);

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

export async function verifyMapping() {
  const schema = await getBaseStructureNamingJsonSchema();
  verifyMappingFromBaseStructure(schema, metaJson);
}
