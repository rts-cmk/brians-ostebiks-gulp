const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");

sass.compiler = require("node-sass");

function html(done) {
	gulp.src("src/html/templates/*.ejs")
		.pipe(ejs().on("error", err => console.log(err)))
		.pipe(rename(function(path) {
			if (path.basename != "index") {
				path.dirname = path.basename;
				path.basename = "index";
			}
			path.extname = ".html";
		}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
	done();
}

function watchHtml() {
	gulp.watch("src/html/**/*.ejs", { ignoreInitial: false }, html);
}

function scss(done) {
	gulp.src("src/css/**/*.scss")
		.pipe(sass().on("error", err => console.log(err)))
		.pipe(gulp.dest("dist/assets/css"))
		.pipe(connect.reload());
	done();
}

function watchScss() {
	gulp.watch("src/css/**/*.scss", { ignoreInitial: false }, scss);
}

function javascript(done) {
	gulp.src("./src/javascript/**/*.js")
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(gulp.dest("./dist/assets/javascript"))
		.pipe(connect.reload());
	done();
}

function watchJavascript() {
	gulp.watch("./src/javascript/**/*.js", { ignoreInitial: false }, javascript);
}

function json(done) {
	gulp.src("./src/json/*.json")
		.pipe(gulp.dest("./dist/data"))
		.pipe(connect.reload());
	done();
}

function watchJson() {
	gulp.watch("./src/json/*.json", { ignoreInitial: false }, json);
}

function images(done) {
	gulp.src("./src/images/*")
		.pipe(imagemin())
		.pipe(gulp.dest("./dist/assets/images"))
		.pipe(connect.reload());
	done();
}

function watchImages() {
	gulp.watch("./src/images/*", { ignoreInitial: false }, images);
}

gulp.task("dev", function(done) {
	watchHtml();
	watchScss();
	watchJavascript();
	watchJson();
	watchImages();
	connect.server({
		livereload: true,
		root: "dist"
	});
	done();
});

gulp.task("build", function(done) {
	html();
	scss();
	javascript();
	json();
	images();
	done();
});