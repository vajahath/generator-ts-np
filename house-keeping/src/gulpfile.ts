import * as gulp from 'gulp';
import replace = require('gulp-replace');
import del = require('del');
import rename = require('gulp-rename');
import { convertToTemplateName } from './name-conversion';
import { sep } from 'path';

import {
  BASE_STRUCTURE_ROOT_GLOB,
  HK_OUTPUT_DEST_GLOB,
  GENERATOR_META_CODE_LOC_GLOB,
  RAW_TEMPLATE_LOC_GLOB,
} from './config';
import { getEjsMapping } from './mappings';

const { scopedPackageNameKey, queries, versionKey } = getEjsMapping();

function excludePaths() {
  const exp: string[] = [
    '/node_modules/**',
    '/_meta/**',
    '/coverage/**',
    '/dist/**',
    '/tests-dist/**',
    '/package-lock.json',
  ];
  return exp.map((val) => '!' + BASE_STRUCTURE_ROOT_GLOB + val);
}

export function gBuild() {
  let gulpChain = gulp.src(
    [BASE_STRUCTURE_ROOT_GLOB + '/**/*', ...excludePaths()],
    {
      dot: true,
    }
  );

  for (const item of queries) {
    if (!item._key) {
      continue;
    }

    gulpChain = gulpChain.pipe(replace(item._key, `<%- ${item.name} %>`));
  }

  // scoped package name
  gulpChain = gulpChain.pipe(
    replace(scopedPackageNameKey, `<%- scopedPackageName %>`)
  );

  // version
  gulpChain = gulpChain.pipe(replace(versionKey, `<%- tsnpVersion %>`));

  return gulpChain.pipe(gulp.dest(RAW_TEMPLATE_LOC_GLOB));
}

export function gClearDest() {
  const templatePath = HK_OUTPUT_DEST_GLOB + '/**/*';
  const rawTemplatePath = RAW_TEMPLATE_LOC_GLOB + '/**/*';

  return del([templatePath, rawTemplatePath], { force: true, dot: true });
}

export function copyMeta() {
  return gulp
    .src(
      [
        BASE_STRUCTURE_ROOT_GLOB + '/_meta/**/*',

        // moving a directory backward to account build process
        // the build will make the js file in dist folder
        // so we need to move a step back to get this file.
        '../src/mappings/get-full-prompts.ts',
        '../src/name-conversion.ts',
      ],
      { dot: true }
    )
    .pipe(gulp.dest(GENERATOR_META_CODE_LOC_GLOB));
}

export function convertName() {
  return (
    gulp
      .src(RAW_TEMPLATE_LOC_GLOB + '/**/*', { dot: true })
      // rename
      .pipe(
        rename((filePath) => {
          if (filePath.basename || filePath.extname) {
            filePath.basename = convertToTemplateName(
              (filePath.basename || '') + (filePath.extname || '')
            );
          }

          if (filePath.dirname && filePath.dirname !== '.') {
            filePath.dirname = filePath.dirname
              .split(sep)
              .map((val) => convertToTemplateName(val))
              .join(sep);
          }

          filePath.extname = '';
        })
      )
      .pipe(gulp.dest(HK_OUTPUT_DEST_GLOB))
  );
}

export default (function () {
  return gulp.series(gClearDest, gBuild, copyMeta, convertName);
})();
