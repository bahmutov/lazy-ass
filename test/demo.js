var cute = require('cute-stack');


function myPlugin(frame) {
  var exists = require('fs').existsSync;
  var read = require('fs').readFileSync;

  function getLine(filename, line) {
    var source = read(filename, 'utf-8').split('\n');
    return source[line - 1];
  }
  function isRelative(frame) {
    var startsWithDot = /^\./;
    return frame.file &&
      startsWithDot.test(frame.file) &&
      typeof frame.line === 'number' &&
      exists(frame.file);
  }
  if (isRelative(frame)) {
    console.log('relative frame');
    console.log(frame);
    var line = getLine(frame.file, frame.line);
    if (line) {
      frame.name = line.trim() + '\n  in ' + frame.id();
    }
    return cute.ui.default(frame);
  } else {
    return cute.ui.default(frame);
  }
}

cute.ui.myPlugin = myPlugin;

cute('myPlugin');

require('..');
/* global lazyAss */
function bad(foo, bar) {
  lazyAss(false, 'this fails, foo =', foo, 'bar =', bar);
}
bad('foo', 'bar');
