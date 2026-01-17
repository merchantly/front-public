(function (window, document) {
  function load(src, cb) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');

    cb = cb || function() {};

    script.async = true;
    script.src = src;
    script.onload = function () {
      this.onload = null;
      cb();
    };

    head.appendChild(script);
  }

  window.mrch = window.mrch || {
    widgets: {},
    registerWidget: function(name, widget) {
      this.widgets[name] = widget;
    },
  };

  mrch.showProduct = function(vendorID, productCardID, selector, config) {
    mrch.config = config = config || {};
    var node = document.querySelector(selector);

    if (node) {
      load(process.env.WIDGETS_URL + '/ProductCard.js', function() {
        var widget = mrch.widgets['ProductCard'];

        if (widget) {
          widget.render({ productCardID: productCardID, vendorID: vendorID }, node);
        }
      });
    }
  };
})(window, document);