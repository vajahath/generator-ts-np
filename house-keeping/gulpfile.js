const gulp = require('gulp');
const del = require('del');

gulp.task('copy-src-assets', () => {
  return gulp
    .src(['./src/**/*', '!./src/**/*.ts'], { dot: true })
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-meta-assets', () => {
  return gulp
    .src(['../base-structure/_meta/**/*'], { dot: true })
    .pipe(gulp.dest('./src/mappings/'));
});

gulp.task('copy-tests-assets', () => {
  return gulp
    .src(['./tests/**/*', '!./tests/**/*.ts'], { dot: true })
    .pipe(gulp.dest('tests-dist/'));
});

gulp.task('clean-builds', () => {
  return del(['dist/**/*', 'tests-dist/**/*'], { dot: true });
});
