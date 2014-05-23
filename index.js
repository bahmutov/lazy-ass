(function initLazyAss() {

  function formMessage(args) {
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
    return msg;
  }

  var lazyAss = function lazyAss(condition) {
    if (!condition) {
      var args = [].slice.call(arguments, 1);
      throw new Error(formMessage(args));
    }
  };

  var lazyAssync = function lazyAssync(condition) {
    if (!condition) {
      var args = [].slice.call(arguments, 1);
      setTimeout(function () {
        throw new Error(formMessage(args));
      }, 0);
    }
  };

  function register(value, name) {
    if (typeof window === 'object') {
      /* global window */
      window[name] = value;
    } else if (typeof global === 'object') {
      global[name] = value;
    } else {
      throw new Error('Do not know how to register ' + name);
    }
  }

  register(lazyAss, 'lazyAss');
  register(lazyAssync, 'lazyAssync');

}());
