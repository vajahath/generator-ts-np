const gulp = require('gulp');
const del = require('del');

exports['copy-src-assets'] = () => {
  return gulp
    .src(['./src/**/*', '!./src/**/*.ts'], { dot: true })
    .pipe(gulp.dest('dist/'));
};

exports['copy-meta-assets'] = () => {
  return gulp
    .src(['../base-structure/_meta/**/*'], { dot: true })
    .pipe(gulp.dest('./src/mappings/'));
};

exports['copy-tests-assets'] = () => {
  return gulp
    .src(['./tests/**/*', '!./tests/**/*.ts'], { dot: true })
    .pipe(gulp.dest('tests-dist/'));
};

exports['clean-builds'] = () => {
  return del(['dist/**/*', 'tests-dist/**/*'], { dot: true });
};
