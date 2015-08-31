(function initLazyAss() {

  function isArrayLike(a) {
    return a && typeof a.length === 'number';
  }

  function toStringArray(arr) {
    return 'array with ' + arr.length + ' items.\n[' +
      arr.map(toString).join(',') + ']\n';
  }

  function isPrimitive(arg) {
    return typeof arg === 'string' ||
      typeof arg === 'number' ||
      typeof arg === 'boolean';
  }

  function toString(arg, k) {
    if (isPrimitive(arg)) {
      return JSON.stringify(arg);
    }
    if (arg instanceof Error) {
      return arg.name + ' ' + arg.message;
    }

    if (Array.isArray(arg)) {
      return toStringArray(arg);
    }
    if (isArrayLike(arg)) {
      return toStringArray(Array.prototype.slice.call(arg, 0));
    }
    var argString;
    try {
      argString = JSON.stringify(arg, null, 2);
    } catch (err) {
      argString = '{ cannot stringify arg ' + k + ', it has type "' + typeof arg + '"';
      if (typeof arg === 'object') {
        argString += ' with keys ' + Object.keys(arg).join(', ') + ' }';
      } else {
        argString += ' }';
      }
    }
    return argString;
  }

  function formMessage(args) {
    var msg = args.reduce(function (total, arg, k) {
      if (k) {
        total += ' ';
      }
      if (typeof arg === 'string') {
        return total + arg;
      }
      if (typeof arg === 'function') {
        var fnResult;
        try {
          fnResult = arg();
        } catch (err) {
          // ignore the error
          fnResult = '[function ' + arg.name + ' threw error!]';
        }
        return total + fnResult;
      }
      var argString = toString(arg, k);
      return total + argString;
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
    var registered;
    if (typeof window === 'object') {
      /* global window */
      window[name] = value;
      registered = true;
    }
    if (typeof global === 'object') {
      global[name] = value;
      registered = true;
    }

    if (!registered) {
      throw new Error('Do not know how to register ' + name);
    }
  }

  register(lazyAss, 'lazyAss');
  register(lazyAss, 'la');
  register(lazyAssync, 'lazyAssync');
  register(lazyAssync, 'lac');

}());
