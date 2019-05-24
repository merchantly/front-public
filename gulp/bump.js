import bump from 'gulp-bump';
import fs from 'fs';
import gulp from 'gulp';
import replace from 'gulp-replace';
import semver from 'semver';
import handleErrors from 'gulp/util/handleErrors';

function getPackageJson() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

exports.default = (cb) => {
  const pkg = getPackageJson();
  const newVer = semver.inc(pkg.version, 'patch');

  gulp.src('./app/scripts/react/application.js')
  .pipe(replace(/'[\d\.]+'/g, `'${newVer}'`))
  .pipe(gulp.dest((file) => file.base));

  gulp.src('./package.json')
  .pipe(bump({ version: newVer }))
  .pipe(gulp.dest((file) => file.base));
  cb();
};
