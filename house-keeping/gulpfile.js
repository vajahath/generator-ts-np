const gulp = require('gulp');
const del = require('del');

gulp.task('copy-src-assets', () => {
  return gulp.src(['./src/**/*', '!./src/**/*.ts']).pipe(gulp.dest('dist/'));
});

gulp.task('copy-meta-assets', () => {
  return gulp
    .src(['../base-structure/_meta/**/*'])
    .pipe(gulp.dest('./src/mappings/'));
});

gulp.task('copy-tests-assets', () => {
  return gulp
    .src(['./tests/**/*', '!./tests/**/*.ts'])
    .pipe(gulp.dest('tests-dist/'));
});

gulp.task('clean-builds', () => {
  return del(['dist/**/*', 'tests-dist/**/*']);
});
