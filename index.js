(function () {

  function assemble() {

    function chain() {
      var args = Array.prototype.slice.call(arguments, 0);
      if (args.length) {
        var fns = args;
        return function (d) {
          fns.forEach(function (fn) {
            if (typeof fn === 'string') {
              if (typeof d[fn] === 'function') {
                d = d[fn].call(d, d);
              } else {
                d = d[fn];
              }
            } else if (typeof fn === 'function') {
              d = fn(d);
            } else {
              throw new Error('Cannot apply ' + JSON.stringify(fn, null, 2) +
                ' to value ' + d + ' not a property name or function');
            }
          });
          return d;
        };
      }
    }

    var helpers = {
      noop: function () {},
      no: function () { return false; },
      yes: function () { return true; },
      undef: function () { return; },
      pass: function (d) { return d; },
      datum: function () {
        var args = Array.prototype.slice.call(arguments, 0);
        return this.pass.apply(this, args);
      },
      d: function () {
        if (!arguments.length) { return this.pass; }

        var args = Array.prototype.slice.call(arguments, 0);
        var prebuiltChain = chain.apply(null, args);
        return function (d) {
          return prebuiltChain(d);
        };
      },
      index: function (d, i) { return i; },
      value: function (val) {
        return function () {
          return val;
        };
      },
      property: function (name) {
        var fns = Array.prototype.slice.call(arguments, 1);
        return function (d) {
          var value = d[name];
          fns.forEach(function (fn) {
            value = fn(value);
          });
          return value;
        };
      },
      newDate: function (d) {
        return new Date(d);
      },
      i: function () {
        if (!arguments.length) { return this.index; }

        var args = Array.prototype.slice.call(arguments, 0);
        var prebuiltChain = chain.apply(null, args);
        return function (d, i) {
          return prebuiltChain(i);
        };
      }
    };

    function extend(destination, source) {
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          destination[prop] = source[prop];
        }
      }
      return destination;
    }

    extend(chain, helpers);

    return chain;
  }

  function register(value, name) {
    if (typeof window === 'object') {
      /* global window */
      window[name] = value;
    } else if (typeof module === 'object') {
      module.exports = value;
    } else {
      throw new Error('Do not know how to register ' + name);
    }
  }

  var d3h = assemble();
  register(d3h, 'd3h');

}());
