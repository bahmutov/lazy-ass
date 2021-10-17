import { lazyAss } from '../src'

describe('serializes circular objects', function() {
  var foo: any = {
    bar: 'bar'
  }
  foo.foo = foo

  it('can handle one circular object', function() {
    var msg = 'foo has circular reference'
    expect(function() {
      lazyAss(false, msg, foo)
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('serialize arguments', function() {
  const foo: any = function foo() {
    lazyAss(false, arguments)
  }
  it('serializes arguments object', function() {
    expect(function() {
      foo('something')
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('gives context to non-serializable objects', function() {
  it('prints keys in non-serializable objects', function() {
    var foo: any = {
      bar: 'bar'
    }
    foo.foo = foo
    expect(function() {
      lazyAss(false, foo)
    }).toThrowErrorMatchingSnapshot()
  })

  it('handles several objects', function() {
    var foo: any = {
      bar: 'bar'
    }
    foo.foo = foo

    var bar = {
      foo: foo
    }

    expect(function() {
      lazyAss(false, foo, bar)
    }).toThrowErrorMatchingSnapshot()
  })

  it('can handle array with circular objects', function() {
    var foo: any = {
      bar: 'bar'
    }
    foo.foo = foo

    expect(function() {
      lazyAss(false, 'problem with foo', [foo])
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('null is different from undefined', function() {
  const foo: any = function foo() {
    const a = undefined
    const b = null
    lazyAss(a === b, a, '!==', b)
  }

  it('null in the message', function() {
    expect(function() {
      foo()
    }).toThrowError(`undefined !== null`)
  })
})
