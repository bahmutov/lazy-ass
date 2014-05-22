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

Lazy assertion function only evaluates its arguments and forms
a message if condition is false

```js
lazyAss(typeof foo === 'object', 'expected', foo, 'to be an object');
```

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
