var cute = require('cute-stack');
cute.ui.badLine = require('bad-line');
cute('badLine');

require('..');
/* global lazyAss */
function bad(foo, bar) {
  lazyAss(false, 'this fails, foo =', foo, 'bar =', bar);
}
bad('foo', 'bar');
