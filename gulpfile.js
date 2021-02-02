const gulp = require("gulp");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const del = require("del");
const autoprefixer = require("autoprefixer");
const cp = require("child_process");
const minifyCss = require("gulp-clean-css");

function clean(cb) {
	return del([
		"./public/css/dist/*.js", 
		"./public/js/dist/*.css"],
		{ dot: true },
		cb);
}

// CSS task
function css() {
	return gulp
		.src("./public/css/src/*.css")
		.pipe(minifyCss())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulp.dest("./public/css/dist"));
}
  
function scripts() {
	return gulp
		.src(["./public/js/src/**/*"])
		.pipe(gulp.dest("./public/js/dist/"));
}

// Watch files
function watch_files() {
	gulp.watch("./public/css/src/**/*", css);
	gulp.watch("./public/js/src/**/*", scripts);
}

function spawn_dev_server(cb) {
	const cmd = cp.spawn('npm', ['run', 'dev:server'], { stdio: 'inherit' });

	cmd.on('ready', function (err) {
	  cb(err);
	});
}

function exec_dev_server(cb) {
	cp.exec('npm run dev:server', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
}

const build = gulp.series(clean, gulp.parallel(css, scripts));
const dev = gulp.parallel(build, watch_files, spawn_dev_server);

// export tasks
exports.css = css;
exports.clean = clean;
exports.build = build;
exports.dev = dev;
exports.default = build;