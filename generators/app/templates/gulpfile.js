var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  gulp.src('src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });

  gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['styles']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'serve']);