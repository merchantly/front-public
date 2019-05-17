const src = './app';
const build = './build';
const dist = './dist';
const test = './test';

export default {
  clean: {
    dest: [build, dist]
  },
  browserSync: {
    port: 9000,
    open: false,
    server: {
      baseDir: [build, src]
    },
    files: [build + '/**']
  },
  scripts: {
    static: {
      client: {
        entries: src + '/scripts/render.static.js',
        dest: build + '/scripts',
        outputName: 'client.js',
        extensions: ['.jsx', '.cjsx', '.coffee']
      },
      vendor: {
        baseDir: src + '/bower_components',
        dest: build + '/scripts',
        outputName: 'vendor.js',
        extensions: ['.coffee']
      },
      widget: {
        baseDir: src + '/bower_components',
        dest: build + '/scripts',
        outputName: 'widget.js',
        extensions: ['.coffee']
      },
      test: {
        entries: test + '/index.js',
        dest: build + '/scripts/',
        outputName: 'test.js',
        extensions: ['.jsx', '.cjsx', '.coffee']
      }
    },
    development: {
      components: {
        entries: src + '/scripts/prerender.development.js',
        extensions: ['.jsx', '.cjsx', '.coffee'],
        dest: dist + '/scripts/',
        outputName: 'public.prerender.development.js',
      },
    },
    production: {
      bundle: {
        entries: src + '/scripts/render.production.js',
        extensions: ['.jsx', '.cjsx', '.coffee'],
        dest: dist + '/scripts/',
        outputName: 'vendorBundle.js',
      },
      components: {
        entries: src + '/scripts/prerender.production.js',
        extensions: ['.jsx', '.cjsx', '.coffee'],
        dest: dist + '/scripts/',
        outputName: 'public.prerender.production.js',
      },
    },
  },
  styles: {
    static: {
      src: src + '/stylesheets/local.scss',
      dest: build + '/stylesheets',
      outputName: 'local.css'
    },
    production: {
      src: src + '/stylesheets/production.scss',
      dest: dist + '/stylesheets',
      outputName: 'vendorBundle.css'
    }
  },
  haml: {
    static: {
      src: 'app/haml/**/*.haml',
      dest: build
    }
  },
  html: {
    static: {
      src: 'app/haml/**/*.html',
      dest: build
    }
  },
  fonts: {
    static: {
      src: src + '/**/*.{eot,svg,ttf,woff,woff2}',
      dest: build + '/fonts'
    },
    production: {
      src: [
        src + '/**/*.{eot,svg,ttf,woff,woff2}',
        '!' + src + '/images/**/*'
      ],
      dest: dist + '/fonts'
    }
  },
  images: {
    static: {
      src: src + '/images/**/*',
      dest: build + '/images'
    },
    production: {
      src: src + '/images/**/*',
      dest: dist + '/images'
    }
  }
}
