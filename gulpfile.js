'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

const reload = browserSync.reload;


//Compile SASS files to CSS
gulp.task('sass', function () {
  return gulp.src('./assets/css/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./site/css'))
    .pipe(browserSync.reload({stream:true}));
});

// Compile PUG files to HTML
gulp.task('pug', () =>{
  return gulp.src('_pugfiles/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./_include'))
    .pipe(gulp.dest('./site'))
})

gulp.task('js', function () {
  gulp.src("./assets/js/function.js")
  .pipe(rename("js/function.js"))
  .pipe(gulp.dest("./site"));
});

// Working directory
gulp.task('browser-sync', ['sass', 'pug', 'js'], function() {
    browserSync.init({
        server: {
            baseDir: "./site"
        }
    });
});

// Watch files compiling
gulp.task('watch', function () {
  gulp.watch('./assets/css/*.sass', ['sass']);
  gulp.watch('./_pugfiles/*.pug', ['pug']);
  gulp.watch('./site/*.html').on('change', reload);
  gulp.watch('./assets/js/*.js', ['js']);
  gulp.watch('./site/js/*.js').on('change', reload);
});

gulp.task('default', ['watch', 'browser-sync']);
