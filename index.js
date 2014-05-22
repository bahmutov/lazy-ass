(function initLazyAss() {

  var lazyAss = function (condition) {
    var args = [].slice.call(arguments, 1);
    if (!condition) {
      var msg = args.reduce(function (total, arg, k) {
        if (k) {
          total += ' ';
        }
        if (typeof arg === 'string') {
          return total + arg;
        }
        if (typeof arg === 'function') {
          return total + arg();
        }
        if (Array.isArray(arg)) {
          return total + JSON.stringify(arg);
        }
        return total + JSON.stringify(arg, null, 2);
      }, '');
      throw new Error(msg);
    }
  };

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

  register(lazyAss, 'lazyAss');

}());
