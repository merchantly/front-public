module.exports = {
  "presets": [
    "@babel/react",
    "@babel/env"
  ],
  "plugins": [
     ["@babel/plugin-transform-spread", {
          "loose": true
     }],
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-classes",
    "add-module-exports",
    ["module-resolver", {
      "root": ["./", "./node_modules/@bower_components/"],
      "alias": {
        "scripts": "./app/scripts",
        "r": "./app/scripts/react",
        "rc": "./app/scripts/react/components",
        "test": "./test",
        "styles": "./app/stylesheets",
      }
    }]
  ]
}
