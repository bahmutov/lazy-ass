import { lazyAss } from '../src';

describe('function as condition', function() {
  it('evaluates the function', function() {
    var called;
    function condition() {
      called = true;
      return true;
    }

    lazyAss(condition);
    expect(called).toBe(true)
  });

  it('no result is failure', function() {
    function noreturn() {}

    expect(function() {
      lazyAss(noreturn);
    }).toThrowError()
  });

  it('adds condition function source to message', function() {
    function myCondition() {}
    expect(function() {
      lazyAss(myCondition);
    }).toThrowError(/myCondition/);
  });

  it('allows anonymous functions', function() {
    var called;
    lazyAss(function() {
      return true;
    });
    lazyAss(function() {
      return true;
    }, 'everything is ok');
    lazyAss(function() {
      called = true;
      return true;
    }, 'everything is ok');
    expect(called).toBe(true);

    expect(function() {
      lazyAss(function() {});
    }).toThrowError();
  });

  it('has access via closure', function() {
    var foo = 2,
      bar = 3;
    expect(function() {
      lazyAss(function() {
        return foo + bar === 6;
      }, 'addition');
    }).toThrowErrorMatchingSnapshot()
  });

  it('example', function() {
    var foo = 2,
      bar = 2;
    function isValidPair() {
      return foo + bar === 4;
    }
    lazyAss(isValidPair, 'foo', foo, 'bar', bar);
  });
});
