import { join as pathJoin } from 'path';

export const BASE_STRUCTURE_ROOT = pathJoin(
  __dirname,
  '..',
  '..',
  'base-structure'
);

export const GENERATOR_META_CODE_LOC = pathJoin(
  __dirname,
  '..',
  '..',
  'generator',
  'src',
  'app'
);

export const HK_OUTPUT_DEST = pathJoin(
  __dirname,
  '..',
  '..',
  'generator',
  'template'
);
