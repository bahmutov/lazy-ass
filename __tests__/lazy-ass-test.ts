import { lazyAss as la } from '../src';

describe('lazy-ass', () => {
  it('does not throw if condition is true', () => {
    la(true)
  })

  it('does not throw when there is a message', () => {
    la(true, 'text', 42, 'more text')
  })

  it('throws nice message', () => {
    expect(() => {
      la(false, 'text', 42, 'more text')
    }).toThrowErrorMatchingSnapshot()
  })

  it('does not evaluate function if condition is true', () => {
    function foo() {
      throw new Error('Foo has been called');
    }
    la(true, foo)
  })

  it('calls functions to form message', function () {
    var called = 0;
    function foo() {
      called += 1;
      return 'foo';
    }
    expect(function () {
      la(false, foo, 'bar', foo);
    }).toThrowErrorMatchingSnapshot()
    // foo was called twice
    expect(called).toBe(2)
  });

  it('handles exception if thrown from function', function () {
    var called = 0;
    function foo() {
      called += 1;
      throw new Error('Oh no!');
    }
    expect(function () {
      la(false, foo, 'bar', foo);
    }).toThrowErrorMatchingSnapshot()
    expect(called).toBe(2)
  });

  it('JSON stringifies arrays', function () {
    expect(function () {
      la(false, [1, 2, 3]);
    }).toThrowErrorMatchingSnapshot()
  });

  it('JSON stringifies objects', function () {
    var obj = { foo: 'foo' };
    expect(function () {
      la(false, obj);
    }).toThrowErrorMatchingSnapshot()
  });

  it('JSON.stringify skip undefined property', function () {
    var obj = {
      foo: 'foo',
      bad: undefined
    };
    var str = JSON.stringify(obj);
    expect(str).toMatchSnapshot()
  });

  it('JSON.stringify with custom replacer', function () {
    var obj = {
      foo: 'foo',
      bad: undefined
    };
    function replacer(key, value) {
      if (value === undefined) {
        return 'null';
      }
      return value;
    }
    var str = JSON.stringify(obj, replacer);
    expect(str).toMatchSnapshot()
  });

  it('nested JSON.stringify with custom replacer', function () {
    var obj = {
      foo: 'foo',
      bar: {
        baz: 'value'
      }
    };
    function replacer(key, value) {
      if (value === undefined) {
        return null;
      }
      return value;
    }
    var str = JSON.stringify(obj, replacer);
    expect(str).toMatchSnapshot()
  });

  it('JSON stringifies undefined value of a property', function () {
    var obj = {
      foo: 'foo',
      bad: undefined
    };
    expect(function () {
      la(false, obj);
    }).toThrowErrorMatchingSnapshot()
  });

  it('takes error name and message', function () {
    expect(function () {
      la(false, new Error('hi there'));
    }).toThrowErrorMatchingSnapshot()
  });

  it('does adds spaces between arguments', function () {
    expect(function () {
      la(false, 'foo', 'bar', 42);
    }).toThrowErrorMatchingSnapshot()
  });

  it('does not add space if previous one has newline', function () {
    expect(function () {
      la(false, 'foo\n', 'bar', 42);
    }).toThrowErrorMatchingSnapshot()
  });
})
