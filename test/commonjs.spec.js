function isNode() {
  return typeof global === 'object';
}
if (isNode()) {

  console.assert(typeof la === 'undefined',
    'there is no lazy-ass initially');

  describe('commonjs interface', function () {
    beforeEach(function () {
      delete global.la;
      delete global.lazyAss;
    });

    it('can be loaded', function () {
      var la = require('..');
      console.assert(typeof la === 'function');
    });

    it('works', function () {
      var la = require('..');
      la(true, 'everything is ok');
    });

    it('disappears', function () {
      console.assert(typeof la === 'undefined', typeof la);
    });
  });
}
