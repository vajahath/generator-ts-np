/* tslint:disable:no-console */

const del = require('del');
const log = require('fancy-log');
const gulp = require('gulp');
const gulpTslint = require('gulp-tslint');
const gulpTs = require('gulp-typescript');
const gulpRunSequence = require('run-sequence');
const tslint = require('tslint');

const prettierPlugin = require('gulp-prettier-plugin');

function pipeErrHandler(err) {
  log(err);
  process.exit(1);
}

const PRETTIER_SRC = ['src/**/*.ts', 'typings/**/*.ts', 'test/**/*.ts'];
const PRETTIER_IGNORE = [
  '!**/package.json',
  '!**/generators/**/*.*',
  '!**/src/views/**/*.*',
  '!**/src/public/**/*.*',
  '!**/node_modules/**/*.*',
  '!**/temp/**/*.*',
  '!**/*.yaml',
  '!**/*.yml',
  '!**/*.sh',
  '!**/*.html',
  '!**/*.lock',
  '!**/*.ejs',
  '!**/*.*-',
  '!**/*.sql',
  '!**/*.txt',
];

const PRETTIER_CONFIG = {
  trailingComma: 'all',
  useTabs: false,
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  printWidth: 80,
};

gulp.task('clean-build', () => {
  return del.sync(['generators/**/*', 'generators/**/.*', 'test-dist/**/*']);
});

// build process

gulp.task('prettier-noFix', () =>
  gulp
    .src([...PRETTIER_SRC, ...PRETTIER_IGNORE])
    .pipe(prettierPlugin(PRETTIER_CONFIG, { filter: true, validate: true }))
    .on('error', pipeErrHandler),
);

gulp.task('tslint-noFix', () => {
  const lintProgram = tslint.Linter.createProgram('./tsconfig.json');
  /**
   * this pipe is exit code ready
   */
  return gulp
    .src(['src/**/*.ts', 'tests/**/*.ts', ...PRETTIER_IGNORE])
    .pipe(
      gulpTslint({
        program: lintProgram,
      }),
    )
    .pipe(gulpTslint.report());
});

gulp.task('compile-code', () => {
  const appCodeTsProject = gulpTs.createProject('tsconfig.json');
  return appCodeTsProject
    .src()
    .pipe(appCodeTsProject())
    .on('error', pipeErrHandler)
    .pipe(gulp.dest(appCodeTsProject.options.outDir));
});

gulp.task('compile-test', () => {
  const testCodeTsProject = gulpTs.createProject('ts-spec-config.json');
  return testCodeTsProject
    .src()
    .pipe(testCodeTsProject())
    .on('error', pipeErrHandler)
    .pipe(gulp.dest(testCodeTsProject.options.outDir));
});

gulp.task('lint-noFix', cb => {
  gulpRunSequence(['prettier-noFix', 'tslint-noFix'], cb);
});

gulp.task('build', cb => {
  gulpRunSequence(
    'clean-build',
    ['prettier-noFix', 'tslint-noFix'],
    ['compile-code', 'compile-test'],
    cb,
  );
});
