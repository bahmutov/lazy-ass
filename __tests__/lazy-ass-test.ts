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
})
