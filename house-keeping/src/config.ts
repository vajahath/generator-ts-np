import { join as pathJoin } from 'path';

export const BASE_STRUCTURE_ROOT = pathJoin(
  __dirname,
  '..',
  '..',
  'base-structure'
);

export const BASE_STRUCTURE_META_JSON = pathJoin(
  BASE_STRUCTURE_ROOT,
  '_meta',
  'name-mapping.json'
);

export const HK_OUTPUT_DEST = pathJoin(
  __dirname,
  '..',
  '..',
  'generator',
  'template'
);
