const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")

//html
const htmlmin = require('gulp-htmlmin');
function HtmlTest() {
    return src('project/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist/ass'))
}
exports.html = HtmlTest;

//css
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
function cssTest() {
    return src("project/css/**/*.css")
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(dest('dist/ass'))
}
exports.css = cssTest;

// images
const imagemin = require('gulp-imagemin');
function imgTest() {
    return gulp.src('project/pics/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/ass/images'));
}
exports.imag = imgTest;


//js
const terser = require('gulp-terser');

function jsTest() {
    return src('project/js/**/*.js',{sourcemaps:true}) 
        .pipe(concat('all.min.js'))
        .pipe(terser())
        .pipe(dest('dist/ass',{sourcemaps:'.'}))
}
exports.js = jsTest;




//watch
function watchTask() {
    watch('project/*.html',series(HtmlTest,reloadTask))
    watch('project/js/**/*.js',series(jsTest,reloadTask))
    watch("project/css/**/*.css",series(cssTest,reloadTask));
    watch("project/pics/*",series(imgTest,reloadTask));
}

//serve

var browserSync = require('browser-sync');
function serve (done){
  browserSync({
    server: {
      baseDir: 'dist/ass'
    }
  });
  done()
}

function reloadTask(done1) {
    browserSync.reload()
    done1()
  }
exports.default = series(parallel(HtmlTest, jsTest, cssTest ,imgTest ),serve,watchTask)