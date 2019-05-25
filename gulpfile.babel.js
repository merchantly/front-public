import { task, series, parallel, dest } from 'gulp';
import fs from 'fs';
import requireDir from 'require-dir';
import del from 'del';
import bump from 'gulp/bump';

requireDir('./gulp/tasks', { recurse: true });

const app_version = require('./package.json').version;

const clean = (cb) => { return del(['./dist/*', './build/*'], cb); };

const dist = parallel(
  '[Static] Vendor scripts',
  '[Production] Styles',
  '[Production] Fonts',
  '[Production] Images'
);

exports.dist = dist;
exports.clean = clean;
exports.bump = bump;

exports.default = series(
  parallel(clean, bump),
  dist
);
