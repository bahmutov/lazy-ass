require('cute-stack')();
require('..');
/* global lazyAss */
var foo = 'foo', bar = 'bar';
lazyAss(false, 'this fails, foo =', foo, 'bar =', bar);
