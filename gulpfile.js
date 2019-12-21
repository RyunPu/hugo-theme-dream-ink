const { src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const merge = require('merge-stream')

sass.compiler = require('node-sass')

const StylesEntry = './src/sass/**/*.*'
const StylesOutput = './static/css'
const JsVendorEntry = './src/js/vendor/*.js'
const JsMainEntry = './src/js/*.js'
const JsOutput = './static/js'

const sassDev = () =>
  src(StylesEntry)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(StylesOutput))

const sassWatch = () => watch(StylesEntry, sassDev)

const sassProd = () =>
  src(StylesEntry)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest(StylesOutput))

const jsDev = () =>
  src(JsMainEntry)
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(concat('main.js'))
    .pipe(dest(JsOutput))

const jsWatch = () => watch(JsMainEntry, jsDev)

const jsProd = () => {
  const vendor = src(['./src/js/vendor/jquery.min.js', JsVendorEntry])
    .pipe(concat('vendor.js'))
    .pipe(dest(JsOutput))

  const main = src(JsMainEntry)
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest(JsOutput))

  return merge(vendor, main)
}

exports.watch = parallel(sassWatch, jsWatch)

exports.prod = parallel(sassProd, jsProd)
