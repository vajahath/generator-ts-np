const gulp = require('gulp');
const del = require('del');

exports['copy-src-assets'] = () => {
  return gulp
    .src(['./src/**/*', '!./src/**/*.ts'])
    .pipe(gulp.dest('generators/'));
};

exports['copy-tests-assets'] = () => {
  return gulp
    .src(['./tests/**/*', '!./tests/**/*.ts'])
    .pipe(gulp.dest('tests-dist/'));
};

exports['clean-builds'] = () => {
  return del(['generators/**/*', 'tests-dist/**/*']);
};
