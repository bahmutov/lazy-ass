if (typeof lazyAss === 'undefined') {
  var lazyAss = require('..');
}
if (typeof expect === 'undefined') {
  var expect = require('expect.js');
}

describe('lazyAss', function () {
  describe('lazyAss function itself', function () {
    it('is a function', function () {
      expect(lazyAss).not.to.be(undefined);
      expect(lazyAss).to.be.a('function');
    });
  });
});
