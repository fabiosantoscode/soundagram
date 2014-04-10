'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');

gulp.task('styles', function () {
    return gulp.src('app/styles/*.scss')
        .pipe(sass({
            style: 'expanded'
        })).on('error', function (err) {
            gutil.log(err.plugin + ': ' + err.message);
        })
        .pipe(gulp.dest('app/styles'));
});

gulp.task('connect', function () {
    connect.server({
        root: ['app/'],
        port: 9000,
        livereload: { port: 9998 }
    });
});

gulp.task('serve', ['connect', 'styles'], function () {});

gulp.task('watch', ['connect', 'serve'], function () {
    gulp.watch([
        'app/styles/*.scss',
        'app/styles/*.css',
        'app/scripts/*.js',
        'app/*.html'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(connect.reload());
    });
    gulp.watch(['app/styles/*.scss'], ['styles']);
});

gulp.task('build', function () {
    // TODO
});

gulp.task('default', function () {
    gulp.start('watch');
});
