import * as gulp from 'gulp';

gulp.task('copy-src-assets', () => {
  return gulp.src(['./src/**/*', '!./src/**/*.ts']).pipe(gulp.dest('dist/'));
});

gulp.task('copy-tests-assets', () => {
  return gulp
    .src(['./tests/**/*', '!./tests/**/*.ts'])
    .pipe(gulp.dest('tests-dist/'));
});

gulp.task('clean-builds', () => {
  return del(['dist/**/*', 'tests-dist/**/*']);
});
