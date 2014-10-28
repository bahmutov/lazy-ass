/* global lazyAss, la */
(function (root) {
  if (typeof window === 'undefined') {
    require('..'); // Node
  }
  if (typeof lazyAss === 'undefined') {
    throw new Error('Cannot find lazyAss global varible');
  }
  if (typeof root.expect === 'undefined') {
    root.expect = require('expect.js');
  }

  var expect = root.expect;

  describe('lazyAss', function () {
    describe('lazyAss function itself', function () {
      it('is a function', function () {
        expect(lazyAss).not.to.be(undefined);
        expect(lazyAss).to.be.a('function');
      });

      it('has alias', function () {
        expect(la).to.be.a('function');
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

      it('handles exception if thrown from function', function () {
        var called = 0;
        function foo() {
          called += 1;
          throw new Error('Oh no!');
        }
        expect(function () {
          lazyAss(false, foo, 'bar', foo);
        }).to.throwException(function (err) {
          expect(called).to.equal(2);
          expect(err.message).to.contain('bar');
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

      it('takes error name and message', function () {
        expect(function () {
          lazyAss(false, new Error('hi there'));
        }).to.throwException(function (err) {
          expect(err.message).to.contain('Error');
          expect(err.message).to.contain('hi there');
        });
      });
    });

    describe('function as condition', function () {
      it('evaluates the function', function () {
        var called;
        function condition() { called = true; return true; }

        lazyAss(condition);
        expect(called).to.be(true);
      });

      it('no result is failure', function () {
        function noreturn() {}

        expect(function () {
          lazyAss(noreturn);
        }).to.throwError();
      });

      it('adds condition function source to message', function () {
        function myCondition() {}
        expect(function () {
          lazyAss(myCondition);
        }).to.throwException(/myCondition/);
      });

      it('allows anonymous functions', function () {
        var called;
        lazyAss(function() { return true; });
        lazyAss(function() { return true; }, 'everything is ok');
        lazyAss(function() { called = true; return true; }, 'everything is ok');
        expect(called).to.be(true);

        expect(function () {
          lazyAss(function () {});
        }).to.throwError();
      });

      it('has access via closure', function () {
        var foo = 2, bar = 3;
        expect(function () {
          lazyAss(function () { return foo + bar === 6; }, 'addition');
        }).to.throwException(function (err) {
          expect(err.message).to.contain('foo + bar');
          expect(err.message).to.contain('addition');
        });
      });

      it('example', function () {
        var foo = 2, bar = 2;
        function isValidPair() {
          return foo + bar === 4;
        }
        lazyAss(isValidPair, 'foo', foo, 'bar', bar);
      });
    });

    describe('serializes circular objects', function () {
      var foo = {
        bar: 'bar'
      };
      foo.foo = foo;

      it('can handle circular object', function () {
        var msg = 'foo has circular reference';
        expect(function () {
          lazyAss(false, msg, foo);
        }).to.throwException(function (err) {
          expect(err.message).to.contain(msg);
        });
      });
    });

    describe('serialize arguments', function () {
      function foo() {
        la(false, arguments);
      }
      it('serializes arguments object', function () {
        expect(function () {
          foo('something');
        }).to.throwException(/something/);
      });
    });
  });
}(this));
