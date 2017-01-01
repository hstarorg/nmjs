const gulp = require('gulp4');
const ts = require('gulp-typescript');
const notifier = require('node-notifier');
const devServer = require('gulp-develop-server');

const tsProject = ts.createProject('tsconfig.json');

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

gulp.task('compileTs', () => {
  return tsProject.src()
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
  gulp.watch([
    './index.ts',
    './lib/**/*.ts',
    './examples/**/*.ts'
  ], gulp.series('compileTs', 'restart'));
  done();
});

gulp.task('default', gulp.series(
  'compileTs',
  gulp.parallel('serve', 'watch')
));
