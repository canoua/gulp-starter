//не требует установки
const { src, dest, parallel, series, watch } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const autoPrefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

function html() {
  return src('src/**.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('build'))
}

function scripts() {
  return src('src/scripts/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('build/scripts'))
}

function styles() {
  return src('src/styles/*.scss')
    .pipe(concat('style.gulpcss'))
    .pipe(autoPrefixer(['last 2 versions']))
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(dest('build/styles/'))
}

function cleanBuild() {
  return src('build')
    .pipe(clean())
}

// exports.js = js
// exports.cleanBuild = cleanBuild
exports.html = html
exports.styles = styles
exports.build = series(cleanBuild, parallel(styles, scripts))