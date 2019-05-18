import { task, series, parallel } from 'gulp';
import requireDir from 'require-dir';

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

task('test', series(['[Shared] Test with build'], (cb) => {
  //runSequence(
  //[
  //'[Shared] Clean',
  //]
  //);
}));

task('dist', series(['[Static] Vendor scripts'], (cb) => {
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
}));

task('build',
     series(
            '[Shared] Clean',
            parallel(
                     '[Static] Client scripts',
                     '[Static] Vendor scripts',
                     '[Static] Test scripts',
                     '[Static] Haml',
                     '[Static] Html',
                     '[Static] Styles',
                     '[Static] Fonts',
                     '[Static] Images'
            )
     )
);

//gulp.task('server', series('[Shared] SetWatch', 'build', () => {
//gulp.start('[Shared] Watch');
//}));

//gulp.task('default', ['server']);
