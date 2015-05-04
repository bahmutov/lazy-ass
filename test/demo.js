require('..');
/* global lazyAss */
function bad(foo, bar) {
  lazyAss(false, 'this fails, foo =', foo, 'bar =', bar);
}
bad('foo', 'bar');
