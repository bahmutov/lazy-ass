function isArrayLike(a) {
  return a && typeof a.length === 'number'
}

function toStringArray(arr) {
  return (
    'array with ' +
    arr.length +
    ' items.\n[' +
    arr.map(toString).join(',') +
    ']\n'
  )
}

function isPrimitive(arg) {
  return (
    typeof arg === 'string' ||
    typeof arg === 'number' ||
    typeof arg === 'boolean'
  )
}

function isError(e) {
  return e instanceof Error
}

/*
  custom JSON.stringify replacer to make sure we do not
  hide properties that have value "undefined"
  var o = {
    foo: 42,
    bar: undefined
  }

  standard JSON.stringify returns
    '{"foo": 42}'
  this replacer returns
    '{"foo": 42, "bar": null}'
*/
function replacer(key, value) {
  if (value === undefined) {
    return null
  }
  return value
}

function toString(arg, k) {
  if (arg === null) {
    return 'null'
  }
  if (arg === undefined) {
    return 'undefined'
  }
  if (isPrimitive(arg)) {
    return JSON.stringify(arg)
  }
  if (arg instanceof Error) {
    return arg.name + ' ' + arg.message
  }

  if (Array.isArray(arg)) {
    return toStringArray(arg)
  }
  if (isArrayLike(arg)) {
    return toStringArray(Array.prototype.slice.call(arg, 0))
  }
  var argString
  try {
    argString = JSON.stringify(arg, replacer, 2)
  } catch (err) {
    argString =
      '{ cannot stringify arg ' + k + ', it has type "' + typeof arg + '"'
    if (typeof arg === 'object') {
      argString += ' with keys ' + Object.keys(arg).join(', ') + ' }'
    } else {
      argString += ' }'
    }
  }
  return argString
}

function endsWithNewLine(s) {
  return /\n$/.test(s)
}

function formMessage(args) {
  var msg = args.reduce(function(total, arg, k) {
    if (k && !endsWithNewLine(total)) {
      total += ' '
    }
    if (typeof arg === 'string') {
      return total + arg
    }
    if (typeof arg === 'function') {
      var fnResult
      try {
        fnResult = arg()
      } catch (err) {
        // ignore the error
        fnResult = '[function ' + arg.name + ' threw error!]'
      }
      return total + fnResult
    }
    var argString = toString(
      arg,
      k
    )
    return total + argString
  }, '')
  return msg
}

function lazyAssLogic(condition: any, ...args: any[]) {
  if (isError(condition)) {
    return condition
  }

  var fn = typeof condition === 'function' ? condition : null

  if (fn) {
    condition = fn()
  }
  if (!condition) {
    // var args = [].slice.call(arguments, 1);
    if (fn) {
      args.unshift(fn.toString())
    }
    return new Error(formMessage(args))
  }
}

interface LazyAss {
  (condition: any, ...args: any[]): void
  async: (condition: any, ...args: any[]) => void
}

export const lazyAss: LazyAss = <LazyAss>(
  function lazyAss(condition: any, ...args: any[]) {
    var err = lazyAssLogic(condition, ...args)
    if (err) {
      throw err
    }
  }
)

export const lazyAssync = function lazyAssync(condition: any, ...args: any[]) {
  var err = lazyAssLogic(condition, ...args)
  if (err) {
    setTimeout(function() {
      throw err
    }, 0)
  }
}

lazyAss.async = lazyAssync

export default lazyAss
