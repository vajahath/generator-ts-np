import { join } from 'upath';

export const BASE_STRUCTURE_ROOT_GLOB = join(
  __dirname,
  '..',
  '..',
  'base-structure'
);

export const GENERATOR_META_CODE_LOC_GLOB = join(
  __dirname,
  '..',
  '..',
  'generator',
  'src',
  'app'
);

export const RAW_TEMPLATE_LOC_GLOB = join(__dirname, '..', 'raw-template');

export const HK_OUTPUT_DEST_GLOB = join(
  __dirname,
  '..',
  '..',
  'generator',
  'template'
);
