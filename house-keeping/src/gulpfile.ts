import * as gulp from 'gulp';
import replace = require('gulp-replace');
import del = require('del');

import {
  BASE_STRUCTURE_ROOT,
  BASE_STRUCTURE_META_JSON,
  HK_OUTPUT_DEST
} from './config';
import { IBaseStructureMapping } from './utils/base-structure-name-mapping';
import { verifyMapping } from './utils/verify-mapping';

const metaJson: IBaseStructureMapping = require(BASE_STRUCTURE_META_JSON);

function excludePaths() {
  const exp: string[] = [
    '/node_modules/**',
    '/_meta/**',
    '/coverage/**',
    '/dist/**',
    '/tests-dist/**'
  ];
  return exp.map(val => '!' + BASE_STRUCTURE_ROOT + val);
}

export function gBuild() {
  let gulpChain = gulp.src([
    BASE_STRUCTURE_ROOT + '/**/*',
    BASE_STRUCTURE_ROOT + '/**/.*',
    BASE_STRUCTURE_ROOT + '/**/.*/**/*',
    BASE_STRUCTURE_ROOT + '/**/.*/**/.*',
    ...excludePaths()
  ]);

  for (const key in metaJson) {
    gulpChain = gulpChain.pipe(replace(metaJson[key].key, `<%= ${key} %>`));
  }

  return gulpChain.pipe(gulp.dest(HK_OUTPUT_DEST));
}

export function gVerifyMeta() {
  return verifyMapping();
}

export function gClearDest() {
  return del(HK_OUTPUT_DEST + '/**', { force: true });
}

export default (function() {
  return gulp.series(gClearDest, gVerifyMeta, gBuild);
})();
