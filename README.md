# lazy-ass

> Lazy assertions without performance penalty

[![NPM][lazy-ass-icon] ][lazy-ass-url]

[![Build status][lazy-ass-ci-image] ][lazy-ass-ci-url]
[![Coverage Status][lazy-ass-coverage-image]][lazy-ass-coverage-url]
[![dependencies][lazy-ass-dependencies-image] ][lazy-ass-dependencies-url]
[![devdependencies][lazy-ass-devdependencies-image] ][lazy-ass-devdependencies-url]

## Example

Regular assertions evaluate all arguments and concatenate message
EVERY time, even if the condition is true.

```js
console.assert(typeof foo === 'object',
  'expected ' + JSON.stringify(foo, null, 2) + ' to be an object');
```

Lazy assertion function evaluates its arguments and forms
a message ONLY IF the condition is false

```js
lazyAss(typeof foo === 'object', 'expected', foo, 'to be an object');
```

Concatenates strings, stringifies objects, calls functions - only if
condition is false.

```js
function environment() {
  // returns string
}
var user = {} // an object
lazyAsync(condition, 'something went wrong for', user, 'in', environment);
// throws an error with message equivalent of
// 'something went wrong for ' + JSON.stringify(user) + ' in ' + environment()
```

## Why?

* Passing an object reference to a function is about
[2000-3000 times faster](http://jsperf.com/object-json-stringify)
than serializing an object and passing it as a string.
* Concatenating 2 strings before passing to a function is about
[30% slower](http://jsperf.com/string-concat-vs-pass-string-reference)
than passing 2 separate strings.

## Install

Node: `npm install lazy-ass --save` then `var lazyAss = require('lazy-ass');`

Browser: `bower install lazy-ass --save`, makes function available as `window.lazyAss`.

## Notes

You can pass as many arguments to *lazyAss* after the condition. The condition
will be evaluated every time (this is required for any assertion). The rest of arguments
will be concatenated according to rules

* string will be left unchanged.
* function will be called and its output will be concatenated.
* any array or object will be JSON stringified.

There will be single space between the individual parts.

## Lazy async assertions

Sometimes you do not want to throw an error synchronously, breaking the entire
execution stack. Instead you can throw an error asynchronously using `lazyAssync`,
which internally implements logic like this:

```js
if (!condition) {
  setTimeout(function () {
    throw new Error('Conditions is false!');
  }, 0);
}
```

This allows the execution to continue, while your global error handler (like
my favorite [Sentry](http://bahmutov.calepin.co/know-unknown-unknowns-with-sentry.html))
can still forward the error with all specified information to your server.

```js
lazyAssync(false, 'foo');
console.log('after assync');
// output
after assync
Uncaught Error: foo
```

In this case, there is no meaningful error stack, so use good message
arguments - there is no performance penalty!

### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/lazy-ass/issues) on Github

## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[lazy-ass-icon]: https://nodei.co/npm/lazy-ass.png?downloads=true
[lazy-ass-url]: https://npmjs.org/package/lazy-ass
[lazy-ass-ci-image]: https://travis-ci.org/bahmutov/lazy-ass.png?branch=master
[lazy-ass-ci-url]: https://travis-ci.org/bahmutov/lazy-ass
[lazy-ass-coverage-image]: https://coveralls.io/repos/bahmutov/lazy-ass/badge.png
[lazy-ass-coverage-url]: https://coveralls.io/r/bahmutov/lazy-ass
[lazy-ass-dependencies-image]: https://david-dm.org/bahmutov/lazy-ass.png
[lazy-ass-dependencies-url]: https://david-dm.org/bahmutov/lazy-ass
[lazy-ass-devdependencies-image]: https://david-dm.org/bahmutov/lazy-ass/dev-status.png
[lazy-ass-devdependencies-url]: https://david-dm.org/bahmutov/lazy-ass#info=devDependencies
