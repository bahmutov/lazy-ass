const {lazyAss: la} = require('..')

describe('commonjs interface', function () {
  it('can be loaded', function () {
    console.assert(typeof la === 'function');
  });

  it('works', function () {
    la(true, 'everything is ok');
  });
});
