/* global lazyAss */
if (typeof window === 'undefined') {
  require('..'); // Node
}
if (typeof lazyAss === 'undefined') {
  throw new Error('Cannot find lazyAss global varible');
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

    it('does not throw if condition is true', function () {
      expect(function () {
        lazyAss(true);
      }).not.to.throwError();
    });

    it('does not evaluate function if condition is true', function () {
      function foo() {
        throw new Error('Foo has been called');
      }
      lazyAss(true, foo);
    });

    it('throws error with string', function () {
      expect(function () {
        lazyAss(false, 'foo');
      }).to.throwException(/^foo$/);
    });

    it('adds spaces', function () {
      expect(function () {
        lazyAss(false, 'foo', 'bar');
      }).to.throwException(/^foo bar$/);
    });

    it('calls functions to form message', function () {
      var called = 0;
      function foo() {
        called += 1;
        return 'foo';
      }
      expect(function () {
        lazyAss(false, foo, 'bar', foo);
      }).to.throwException(/^foo bar foo$/);
    });

    it('calls function each time', function () {
      var called = 0;
      function foo() {
        called += 1;
        return 'foo';
      }
      expect(function () {
        lazyAss(false, foo, 'bar', foo);
      }).to.throwException(function () {
        expect(called).to.equal(2);
      });
    });

    it('JSON stringifies arrays', function () {
      expect(function () {
        lazyAss(false, [1, 2, 3]);
      }).to.throwException(/^\[1,2,3\]$/);
    });

    it('JSON stringifies objects', function () {
      var obj = { foo: 'foo' };
      expect(function () {
        lazyAss(false, obj);
      }).to.throwException(JSON.stringify(obj, null, 2));
    });
  });
});
