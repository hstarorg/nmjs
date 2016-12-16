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
  console.log(msg);
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
  devServer.listen({ path: './dist/examples/index.js' });
  done();
});

gulp.task('watch', done => {
  gulp.watch([
    './index.ts',
    './lib/**/*.ts',
    './examples/**/*.ts'
  ], gulp.series('compileTs', devServer.restart));
  done();
});

gulp.task('default', gulp.series(
  'compileTs',
  gulp.parallel('serve', 'watch')
));