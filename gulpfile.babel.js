import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

gulp.task('dist', [], (cb) => {
  runSequence(
    [
      '[Shared] Clean',
      '[Shared] Bump',
    ], [
      '[Production] Styles',
      '[Production] Fonts',
      '[Production] Images',
    ], [
      '[Production] Scripts',
      '[Production] Components scripts',
      '[Development] Components scripts',
    ],
    cb);
});

gulp.task('build', ['[Shared] Clean'], (cb) => {
  runSequence([
    '[Static] Client scripts',
    '[Static] Vendor scripts',
    '[Static] Test scripts',
    '[Static] Haml',
    '[Static] Html',
    '[Static] Styles',
    '[Static] Fonts',
    '[Static] Images',
  ], cb);
});

gulp.task('test', ['[Shared] Test with build'], (cb) => {
  runSequence(
    [
      '[Shared] Clean',
      '[Shared] Bump',
    ], [
      '[Production] Styles',
      '[Production] Fonts',
      '[Production] Images',
    ], [
      '[Production] Scripts',
      '[Production] Components scripts',
      '[Development] Components scripts',
    ],
    cb);
});

gulp.task('deploy', ['build'], () => {
  gulp.start('[Shared] GithubPages');
});

gulp.task('deploy--without-build', () => {
  gulp.start('[Shared] GithubPages');
});

gulp.task('server', ['[Shared] SetWatch', 'build'], () => {
  gulp.start('[Shared] Watch');
});

gulp.task('default', ['server']);
