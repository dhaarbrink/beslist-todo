var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var env = process.env.GULP_ENV;

var jsFiles = ['bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'src/AppBundle/static/js/**/*.js'
];

var cssFiles = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'src/AppBundle/static/css/**/*.css'
];

var fontFiles = [
    'bower_components/bootstrap/dist/fonts/*'
];

//JAVASCRIPT TASK: write one minified js file out of jquery.js, bootstrap.js and all of my custom js files
gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(concat('javascript.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/js'));
});

//CSS TASK: write one minified css file out of bootstrap.less and all of my custom less files
gulp.task('css', function () {
    return gulp.src(cssFiles)
        .pipe(gulpif(/[.]less/, less()))
        .pipe(concat('styles.css'))
        .pipe(gulpif(env === 'prod', uglifycss()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/css'));
});

gulp.task('fonts', function() {
    return gulp.src(fontFiles)
        .pipe(gulp.dest('web/fonts'));
});

//IMAGE TASK: Just pipe images from project folder to public web folder
gulp.task('img', function() {
    return gulp.src('app/Resources/public/img/**/*.*')
        .pipe(gulp.dest('web/img'));
});

//WATCH TASK: Keep a watch on the js and css files: when changed, process them again
gulp.task('watch', function() {
    gulp.watch(jsFiles, ['js']);
    gulp.watch(cssFiles, ['css']);
});

//define executable tasks when running "gulp" command
gulp.task('default', ['js', 'css', 'fonts', 'img', 'watch']);
