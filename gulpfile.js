const gulp = require('gulp4');
const ts = require('gulp-typescript');
const notifier = require('node-notifier');

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

gulp.task('compileTs', done => {
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
  notify('Compile successfully.');
  done();
});

gulp.task('watch', done => {
  gulp.watch([
    './index.ts',
    './lib/**/*.ts'
  ], gulp.series('compileTs'));
  done();
});

gulp.task('default', gulp.series('compileTs', 'watch'));