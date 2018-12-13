require('shelljs/global');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const notifier = require('node-notifier');
const devServer = require('gulp-develop-server');

const tsProject = ts.createProject('./tsconfig.json', { declaration: true });

const notify = (msg, opt) => {
  notifier.notify({
    title: '',
    message: msg || '',
    sound: true,
    wait: false,
    timeout: 2
  });
};

const errHander = err => {
  err && console.error(err);
};

gulp.task('clean', done => {
  rm('-rf', 'dist');
  done();
});

gulp.task('compileTs', () => {
  return gulp
    .src(['/.examples/**/*.ts','./packages/nmjs/**/*.ts'])
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
    .on('end', () => {
      notify('Compile successfully.');
    });
});

gulp.task('serve', done => {
  devServer.listen({ path: 'index.js', cwd: './dist/examples' }, errHander);
  done();
});

gulp.task('restart', done => {
  devServer.restart(errHander);
  done();
});

gulp.task('watch', done => {
  gulp.watch(['./examples/**/*.ts'], gulp.series('clean', 'compileTs', 'restart'));
  done();
});

gulp.task('default', gulp.series('clean', 'compileTs', gulp.parallel('serve', 'watch')));
