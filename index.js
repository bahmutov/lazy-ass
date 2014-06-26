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

  function lazyAssLogic(condition) {
    var fn = typeof condition === 'function' ? condition : null;

    if (fn) {
      condition = fn();
    }
    if (!condition) {
      var args = [].slice.call(arguments, 1);
      if (fn) {
        args.unshift(fn.toString());
      }
      return new Error(formMessage(args));
    }
  }

  var lazyAss = function lazyAss() {
    var err = lazyAssLogic.apply(null, arguments);
    if (err) {
      throw err;
    }
  };

  var lazyAssync = function lazyAssync() {
    var err = lazyAssLogic.apply(null, arguments);
    if (err) {
      setTimeout(function () {
        throw err;
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
