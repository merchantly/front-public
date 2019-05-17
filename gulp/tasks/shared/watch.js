import { task, watch, series } from 'gulp';

task('[Shared] Watch', series(['[Shared] BrowserSync'], () => {
  watch('app/haml/**/*.haml', ['[Static] Haml']);
  watch('app/haml/**/*.html', ['[Static] Html']);
  watch('app/stylesheets/**/*.s?ss', ['[Static] Styles']);
  watch('app/images/**/*', ['[Static] Images']);
  watch('build/scripts/*.js', ['[Shared] Test']);
}));
