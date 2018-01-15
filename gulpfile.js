const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin');


gulp.task('sass', function () {
    return gulp.src('src/sass/main.sass')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(sourcemaps.write('./maps', { addComment: false }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('concat', function () {
    return gulp.src(['src/sass/base/*.sass', 'src/sass/layout/*.sass', 'src/sass/module/*.sass', 'src/sass/state/*.sass'])
        .pipe(concat('main.sass'))
        .pipe(gulp.dest('src/sass'))
});

gulp.task('views', function buildHTML() {
    return gulp.src('./src/pug/index.pug')
        .pipe(pug())
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
        .pipe(uglify())
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
gulp.task('bild', ['html', 'cssmin', 'js-min', 'img']);


gulp.task('watch', ['views', 'sass', 'browser-sync'], function () {
    gulp.watch('src/sass/**/*.+(scss|sass)', ['concat', 'sass']);
    gulp.watch('src/pug/*.pug', ['views']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});