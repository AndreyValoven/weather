const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglifyjs'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlbeautify = require('gulp-html-beautify'),
    cssbeautify = require('gulp-cssbeautify'),
    babel = require('gulp-babel'),
    minify = require('gulp-minify'),
    webpack = require('webpack-stream'),
    path = require('path');


gulp.task('sass', function () {
    return gulp.src('src/sass/main.sass')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssbeautify())
        .pipe(sourcemaps.write('./maps', { addComment: false }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('views', function buildHTML() {
    var options = { indentSize: 2 };
    return gulp.src('./src/pug/index.pug')
        .pipe(pug())
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

// min js
gulp.task('js-min', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(babel())
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['-min.js']
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('docs/js'));
});


// min css
gulp.task('cssmin', function () {
    return gulp.src('src/css/main.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('docs/css'));
});

// image min task
gulp.task('img', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'));
});

// html
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('docs'));
})


// bild project to docs
gulp.task('bild-docs', ['html', 'cssmin', 'js-min', 'img']);


gulp.task('watch', ['views', 'sass', 'browser-sync'], function () {
    gulp.watch('src/sass/**/*.+(scss|sass)', ['sass']);
    gulp.watch('src/pug/*.pug', ['views']);
    gulp.watch('src/js/**/*.js', browserSync.reload());
});