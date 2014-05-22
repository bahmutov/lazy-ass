if (typeof d3 === 'undefined') {
  var d3 = require('d3');
}
if (typeof d3h === 'undefined') {
  var d3h = require('..');
}
if (typeof expect === 'undefined') {
  var expect = require('expect.js');
}

describe('d3h d3-helpers', function () {
  function triple(x) { return 3 * x; }
  function add2(x) { return x + 2; }

  describe('d3h function itself', function () {
    it('is a function', function () {
      expect(d3h).not.to.be(undefined);
      expect(d3h).to.be.a('function');
    });

    it('function composition by default', function () {
      expect(d3h(triple, add2)(5)).to.equal(17);
    });

    it('can extract property and apply functions', function () {
      var foo = {
        age: '11'
      };
      expect(d3h('age', triple, add2)(foo)).to.equal(35);
    });

    it('can apply function and extract property', function () {
      var foo = {
        name: 'foo'
      };
      function concatSelf(x) { return x + x; }
      expect(d3h('name', concatSelf, 'length', add2)(foo)).to.equal(8);

      function explicit(obj) {
        return add2(concatSelf(obj.name).length);
      }
      expect(explicit(foo)).to.equal(8);
    });

    it('can call functions', function () {
      var data = {
        name: function () {
          return 'foo';
        }
      };
      expect(d3h('name')(data)).to.equal('foo');
    });

    it('method, get property, execute function', function () {
      var data = {
        self: function () {
          return this;
        },
        age: 10
      };
      expect(d3h('self', 'age', add2)(data)).to.equal(12);
    });
  });

  it('is a collection of functions', function () {
    expect(Object.keys(d3h).length).to.be.above(3);
  });

  describe('noop', function () {
    it('is a function', function () {
      expect(d3h.noop).to.be.a('function');
    });

    it('expect nothing, returns nothing', function () {
      expect(d3h.noop.length).to.equal(0);
      expect(d3h.noop()).to.be(undefined);
    });
  });

  describe('undef', function () {
    it('always returns undefined', function () {
      expect(d3h.undef()).to.be(undefined);
      expect(d3h.undef(true)).to.be(undefined);
    });
  });

  describe('yes and no', function () {
    it('yes always returns true', function () {
      expect(d3h.yes()).to.be(true);
      expect(d3h.yes(false)).to.be(true);
    });

    it('no always returns true', function () {
      expect(d3h.no()).to.be(false);
      expect(d3h.no(true)).to.be(false);
    });
  });

  describe('pass', function () {
    it('returns whatever passed', function () {
      expect(d3h.pass(101)).to.be(101);
      var foo = {};
      expect(d3h.pass(foo)).to.be(foo);
    });

    it('works as this logic', function () {
      var fn = function (x) {
        return triple(x);
      };
      expect(fn(2)).to.equal(6);
    });

    it('can wrap returned value in given function', function () {
      function triple(x) { return 3 * x; }
      var fn = d3h.pass(triple);
      expect(fn).to.be.a('function');
      expect(fn(2)).to.equal(6);
    });
  });

  describe('datum and index', function () {
    it('datum returns first arg, usually d', function () {
      expect(d3h.datum(101, 3)).to.be(101);
    });

    it('index returns second arg, usually i', function () {
      expect(d3h.index(101, 3)).to.be(3);
    });
  });

  describe('value', function () {
    it('can return empty string', function () {
      var fn = d3h.value('');
      expect(fn).to.be.a('function');

      expect(fn()).to.be.a('string');
      expect(fn()).to.equal('');
    });
  });

  describe('property', function () {
    it('grabs given property', function () {
      var point = {
        x: 10,
        y: 20
      };
      var getX = d3h.property('x');
      expect(getX).to.be.a('function');
      expect(getX.length).to.equal(1);
      expect(getX(point)).to.equal(10);

      var getY = d3h.property('y');
      expect(getY(point)).to.equal(20);
    });

    it('returns undefined for non existing property', function () {
      var point = {
        x: 10,
        y: 20
      };
      var getZ = d3h.property('z');
      expect(getZ(point)).to.be(undefined);
    });

    it('runs optional function after access', function () {
      var person = { age: '10' };
      expect(d3h.property('age')(person)).to.be.a('string');
      expect(d3h.property('age', Number)(person)).to.be.a('number');
    });
  });

  describe('example with combined functions', function () {
    // notice age property is string,
    // so we need to convert to number first
    var people = [{
      age: '10'
    }, {
      age: '20'
    }, {
      age: '5'
    }];

    it('can be done in complex way', function () {
      var youngest = d3.min(people, function (d) { return +d.age; });
      expect(youngest).to.be.a('number');
      expect(youngest).to.equal(5);
    });

    it('can be done using d3h', function () {
      var youngest = d3.min(people, d3h.property('age', Number));
      expect(youngest).to.be.a('number');
      expect(youngest).to.equal(5);
    });
  });

  describe('property with function composition', function () {
    var people = [{
      age: '10'
    }, {
      age: '20'
    }, {
      age: '5'
    }];
    var youngest = d3.min(people,
      d3h.property('age', Number, triple, add2));
    expect(youngest).to.equal(17);
  });

  describe('parse date', function () {
    var d = {
      date: new Date('2014/03/02')
    };
    expect(d.date).to.be.a(Date);
    expect(d3h.property('date')(d)).to.equal(d.date);
    var x = d3.time.scale()
      .domain([new Date('2012/10/10'), new Date('2018/10/10')])
      .range([0, 100]);
    var t0 = d3h.property('date', x)(d);
    expect(t0).to.be.a('number');
    expect(t0).to.be.above(0);
    expect(t0).to.be.below(1000);
  });

  describe('newDate', function () {
    var d = {
      date: '2014/03/02'
    };
    expect(d.date).to.be.a('string');
    expect(d3h.newDate(d.date)).to.be.a(Date);
    var value = d3h.property('date', d3h.newDate)(d);
    expect(value).to.be.a(Date);

    expect(d3h('date', d3h.newDate)(d)).to.be.a(Date);
  });

  describe('d3h.d and d3h.i', function () {
    it('has d and i functions', function () {
      expect(d3h.d).to.be.a('function');
      expect(d3h.i).to.be.a('function');
    });

    describe('d3h.i', function () {
      it('chains on index', function () {
        var fn = d3h.i('foo', 'length', triple);
        expect(fn).to.be.a('function');
        var data = { foo: 'super' };
        expect(fn(null, data)).to.equal(15);
      });

      it('returns index without anything', function () {
        expect(d3h.index(4, 5)).to.equal(5);

        var fn = d3h.i();
        expect(fn).to.be.a('function');
        expect(fn(4, 5)).to.equal(5);
      });
    });

    describe('d3h.d', function () {
      it('returns d without anything', function () {
        expect(d3h.datum(4, 5)).to.equal(4);

        var fn = d3h.d();
        expect(fn).to.be.a('function');
        expect(fn(4, 5)).to.equal(4);
      });

      it('chains methods on d', function () {
        var fn = d3h.d('foo', add2);
        var data = {
          foo: 'foo'
        };
        expect(fn(data)).to.equal('foo2');
      });
    });
  });
});
