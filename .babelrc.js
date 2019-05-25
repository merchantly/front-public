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
    "@babel/plugin-proposal-class-properties",
     "add-module-exports",
    ["module-resolver", {
      "root": ["./", "./node_modules/@bower_components/"],
      "alias": {
        "scripts": "./app/scripts",
        "r": "./app/scripts/react",
        "rc": "./app/scripts/react/components",
        "test": "./test",
        "styles": "./app/stylesheets",
        //'jQuery.mmenu': './node_modules/@bower_components/jQuery.mmenu/src/js/jquery.mmenu.min.all',
        //'bootstrap': 'node_modules/@bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
        //'fancybox': './node_modules/@bower_components/fancybox/source/jquery.fancybox',
        //'fancybox.wannabe': './node_modules/@bower_components/fancybox-wannabe-fix/index',
        //'jquery': './node_modules/@bower_components/jquery/dist/jquery',
        //'owlCarousel': './node_modules/@bower_components/OwlCarousel/owl-carousel/owl.carousel',
        //'jquery.role': './node_modules/@bower_components/jquery.role/lib/jquery.role',
        //'sticky-kit': './node_modules/@bower_components/sticky-kit/jquery.sticky-kit'
      }
    }]
  ]
}
