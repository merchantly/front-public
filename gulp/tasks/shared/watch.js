import gulp from 'gulp';

gulp.task('[Shared] Watch', ['[Shared] BrowserSync'], () => {
  gulp.watch('app/haml/**/*.haml', ['[Static] Haml']);
  gulp.watch('app/haml/**/*.html', ['[Static] Html']);
  gulp.watch('app/stylesheets/**/*.s?ss', ['[Static] Styles']);
  gulp.watch('app/images/**/*', ['[Static] Images']);
  gulp.watch('build/scripts/*.js', ['[Shared] Test']);
});