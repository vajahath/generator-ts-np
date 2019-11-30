import * as gulp from 'gulp';
import replace = require('gulp-replace');
import del = require('del');

import {
  BASE_STRUCTURE_ROOT,
  HK_OUTPUT_DEST,
  GENERATOR_META_CODE_LOC
} from './config';
import { getEjsMapping } from './mappings';

const { scopedPackageNameKey, queries } = getEjsMapping();

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

  for (const item of queries) {
    if (!item._key) {
      continue;
    }

    gulpChain = gulpChain.pipe(replace(item._key, `<%= ${item.name} %>`));
  }

  // scoped package name
  gulpChain = gulpChain.pipe(
    replace(scopedPackageNameKey, `<%= scopedPackageName %>`)
  );

  return gulpChain.pipe(gulp.dest(HK_OUTPUT_DEST));
}

export function gClearDest() {
  return del(HK_OUTPUT_DEST + '/**', { force: true });
}

export function copyMeta() {
  return gulp
    .src([
      BASE_STRUCTURE_ROOT + '/_meta/**/*',
      '../src/mappings/get-full-prompts.ts'
    ])
    .pipe(gulp.dest(GENERATOR_META_CODE_LOC));
}
export default (function() {
  return gulp.series(gClearDest, gBuild, copyMeta);
})();
