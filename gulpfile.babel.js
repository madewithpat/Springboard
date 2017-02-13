// To-Dos
//
//  -Add final build
//      -Minification (css, js)
//      -Imagemin
//  -Templating engine?
//  -Linting
//      -javascript
//      -scss

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browser from 'browser-sync';
import webpack from 'webpack';

gulp.task('default', ['sass', 'javascript'], () => {
    browser.init({
        port: 7000,
        notify: false,
        server: {
            baseDir: 'src'
        }
    });
    gulp.watch('src/**/*.html').on('change', browser.reload);
    gulp.watch('src/assets/scss/**/*.scss', ['sass']);
    gulp.watch('src/assets/js/**/*.js', ['javascript'], browser.reload);     
});

gulp.task('sass', () => {
    return gulp.src('./src/assets/scss/style.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        })
            .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%']
        }))
        .pipe(gulp.dest('src/temp/css'))
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