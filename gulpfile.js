let project_css_file = "otm_newdesign.css";

let gulp        = require('gulp');
let browserSync = require('browser-sync').create();
let sass        = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let csso = require('gulp-csso');
let rename = require('gulp-rename');


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({browserlist: ["last 2 version", "> 1%", "maintained node versions", "not dead"]}))
        .pipe(csso({
            comments:false
        }))
        .pipe(rename(project_css_file))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

//copy fa fonts
gulp.task('fa', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest("src/css/fonts"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: "./src"
    });
});

gulp.task('watch', function () {
    gulp.watch(['src/scss/*.scss'], gulp.parallel('sass'));
    gulp.watch("src/*.html");
});

gulp.task('default', gulp.series('sass', 'fa', 'js', gulp.parallel('browserSync', 'watch')));
