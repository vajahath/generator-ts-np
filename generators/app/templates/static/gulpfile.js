"use strict";

const gulp = require("gulp");

// copy json files from src to dist
gulp.task("copy-json", () => {
	return gulp.src("src/**/*.json").pipe(gulp.dest("dist/"));
});
