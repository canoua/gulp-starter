//не требует установки
const { src, dest, parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function scripts() {
  return src('src/scripts/*.js')
    .pipe(dest('build/scripts'))
}

function styles() {
  return src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('build/styles/'))
}

// exports.js = js
exports.styles = styles
exports.build = parallel(styles, scripts);