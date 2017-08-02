const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browser = require('browser-sync').create();
const webpack = require('webpack');
const del = require('del');
const rename = require('gulp-rename');

gulp.task('default', ['setup-dist', 'sass', 'javascript'], () => {
    browser.init({
        port: 7000,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });
    gulp.watch('src/**/*.html').on('change', browser.reload);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['javascript'], browser.reload);     
});

gulp.task('sass', () => {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        })
            .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%']
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browser.reload({ stream: true }));
});

gulp.task('javascript', (callback) => {
    webpack(require('./webpack.config.js'), (err, stats) => {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());

        callback();
    });
});

gulp.task('setup-dist', ['clean-dist', 'copy-pages', 'copy-normalize']);

gulp.task('copy-pages', () => {
    return gulp.src('src/**/*.html')
                .pipe(gulp.dest('./dist'));
});

gulp.task('copy-normalize', () => {
    return gulp.src('node_modules/normalize.css/normalize.css')
                .pipe(rename('_normalize.scss'))
                .pipe(gulp.dest('src/scss/vendor'));
});

gulp.task('clean-dist', () => {
    return del('./dist');
})