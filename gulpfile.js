var gulp = require('gulp'),
    babel = require('gulp-babel'),
    less = require('gulp-less')

/* Paths */
const paths = {
  source : {
    js: 'dev/**/*.js',
    less: 'dev/public/css/**/*.less'
  },
  output : {
    js : 'output/',
    css : 'output/public/css/'
  }
};

/* Main tasks */
gulp.task('default', ['watch'])

/*                       D E V E L O P M E N T                            */
/* js es6 => es5 */
gulp.task('js', function() {
  return gulp.src(paths.source.js)
     .pipe(babel({presets: ['babel-preset-es2015']}))
     .pipe(gulp.dest(paths.output.js))
});

/* less to css */
gulp.task('css', function() {
  return gulp.src(paths.source.less)
    .pipe(less())
    .pipe(gulp.dest(paths.output.css))
})

/* Watching for changes */
gulp.task('watch', ['js', 'css'], function() {
  gulp.watch(paths.source.js, ['js'])
  gulp.watch(paths.source.less, ['css'])
})
