//не требуют установки
const { src, dest, parallel, series, watch } = require('gulp');
//***
//html
const htmlmin = require('gulp-htmlmin');
//стили
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
//скрипты
const uglify = require('gulp-uglify-es').default;
//конкатенация
const concat = require('gulp-concat');
//автопрефиксер
const autoPrefixer = require('gulp-autoprefixer');
//очистка папки с билдом
const clean = require('gulp-clean');
//конвертация шрифтов
const fonter = require('gulp-fonter-unx');
const ttf2woff2 = require('gulp-ttf2woff2');



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
    .pipe(concat('style.min.css'))
    .pipe(autoPrefixer(['last 2 versions']))
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(dest('build/styles/'))
}

function images() {
  return src('src/images/*')
    .pipe(dest('build/static/images'))
}

function cleanBuild() {
  return src('build')
    .pipe(clean())
}

function fonts() {
  return src('src/static/fonts/*')
    .pipe(fonter({
      formats: ['woff', 'ttf', 'eot']
    }))
    .pipe(dest('src/static/fonts'))
}
function fontsWoff2() {
  return src('src/static/fonts/*')
    .pipe(ttf2woff2())
    .pipe(dest('src/static/fonts'))
}


//перед работой сконвертировать шрифты
exports.fonts = fonts
exports.fontsWoff2 = fontsWoff2
//для тестов
exports.images = images
exports.cleanBuild = cleanBuild
//build
exports.build = series(parallel(html,images, styles, scripts))