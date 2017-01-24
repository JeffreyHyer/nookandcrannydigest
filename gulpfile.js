var gulp    = require('gulp'),
    es      = require('event-stream'),
    gutil   = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
	       pattern: ['gulp-*', 'gulp.*'],
	          replaceString: /\bgulp[\-.]/
    });

gulp.task('css', function() {
	var sassFiles = gulp.src('./themes/nook_and_cranny/assets/scss/**/*.scss')
	                    .pipe(plugins.sass({
                            outputStyle:    'compressed'
                        }))
                        .on('error', function(error) {
                            console.log("Error");
                        });

	return es.concat(sassFiles)
             .pipe(plugins.concat('style.min.css'))
             .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4'))
             .pipe(plugins.cssmin())
             .pipe(plugins.size())
             .pipe(gulp.dest('./themes/nook_and_cranny/static/css/'));
});

// gulp.task('scripts', function() {
// 	gulp.src('./themes/nook_and_cranny/assets/js/app.js')
// 		.pipe(plugins.uglify())
// 		.pipe(plugins.size())
// 		.pipe(gulp.dest('./themes/nook_and_cranny/static/js/app.min.js'));
// });

// gulp.task('default', ['css', 'scripts']);

gulp.task('watch', function() {
    gulp.watch('./themes/nook_and_cranny/assets/scss/**/*.scss', ['css']);
});

gulp.task('default', ['css']);
