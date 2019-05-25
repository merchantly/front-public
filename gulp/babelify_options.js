exports.default = {
  presets: [
    "@babel/react",
    "@babel/env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    "@babel/plugin-proposal-class-properties",
    ["module-resolver", {
      "root": ["./", "./node_modules/"],
      "alias": {
        "scripts": "./app/scripts",
        "r": "./app/scripts/react",
        "rc": "./app/scripts/react/components",
        "test": "./test",
        "styles": "./app/stylesheets"
      }
    }]
  ],
  // ignore: [/(node_modules|bower_components|prerender.bundle\.js)/],
};


