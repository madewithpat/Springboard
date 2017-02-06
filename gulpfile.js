var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var webpack = require('webpack');

var sassPaths = [
    'app/node_modules/normalize-scss/sass/'
];


gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'expanded'
        })
          .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('app/build/css'));
});

gulp.task('cssInject', ['sass'], function() {
    return gulp.src('app/build/css/style.css')
        .pipe(browserSync.stream());
});

gulp.task('js', function(callback) {
    webpack(require('webpack.config.js'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());

        callback();
    });
});

gulp.task('serve', function() {

    browserSync.init({
        port: 3000,
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    gulp.watch('app/*.html').on('change', browserSync.reload );
    gulp.watch('app/scss/**/*.scss').on('change', cssInject);

});

gulp.task('default', ['serve']);