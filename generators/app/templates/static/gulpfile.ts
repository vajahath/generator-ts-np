import gulp from 'gulp';
import del from 'del';

// copy json files from src to dist
gulp.task("copy-json", () => {
	return gulp.src("src/**/*.json").pipe(gulp.dest("dist/"));
});

gulp.task("clean-build", () => {
	return del.sync(["dist/**/*", "dist/**/.*"]);
});
