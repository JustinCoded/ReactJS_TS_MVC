/// <binding BeforeBuild='default' Clean='clean' />

/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
var gulp = require("gulp");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var paths = {
    components: ["Content/**/*.tsx", "Content/**/*.ts"],
    npmJsLibs: [
        'node_modules/react/dist/react-with-addons.js',
        'node_modules/react-dom/dist/react-dom.js',
        'node_modules/redux/dist/redux.js'
    ],
    build: ["build/"]
};

// Delete the dist directory
gulp.task("clean", function () {
    return gulp.src(paths.build)
    .pipe(clean());
});

gulp.task("default", ["scripts", "libs"]);

gulp.task("scripts", function () {
    return gulp.src(paths.components)
		.pipe(ts(tsProject))
        .pipe(concat('bundle.js'))
		.pipe(gulp.dest("build/js"));
});

gulp.task("libs", function () {
    return gulp.src(paths.npmJsLibs)
        .pipe(concat('libs.js'))
		.pipe(gulp.dest("build/js"));
});