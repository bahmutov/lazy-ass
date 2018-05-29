import la from '../src';

describe('lazy-ass.async', () => {
  it('it is a function', () => {
    expect(typeof la.async).toBe('function')
  })

  it('throws async error', () => {
    jest.useFakeTimers()
    la.async(false, 'foo')
    // just confirm setTimeout was called
    // ? how to confirm the argument to the `setTimeout`
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0)
  })
})
