// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

function isPalindrome(_s) {
  while(true) {
    var s = _s;
    var len = s.length;
    if (len <= 1) {
      return true;
    }
    if (s[0] !== s[len - 1 | 0]) {
      return false;
    }
    _s = s.slice(1, len - 1 | 0);
    continue ;
  };
}

console.log(isPalindrome("civic"));

console.log(isPalindrome("deed"));

console.log(isPalindrome("runner"));

function repeatWithReduce(s, n) {
  return Belt_Array.reduce(Belt_Array.range(0, n - 1 | 0), "", (function (accumulator, _item) {
                return accumulator + s;
              }));
}

function repeatRec(s, _accumulator, _n) {
  while(true) {
    var n = _n;
    var accumulator = _accumulator;
    if (n === 0) {
      return accumulator;
    }
    _n = n - 1 | 0;
    _accumulator = accumulator + s;
    continue ;
  };
}

console.log(repeatRec("ha", "", 4));

function repeat(s, n) {
  var _accumulator = "";
  var _counter = n;
  while(true) {
    var counter = _counter;
    var accumulator = _accumulator;
    if (counter === 0) {
      return accumulator;
    }
    _counter = counter - 1 | 0;
    _accumulator = accumulator + s;
    continue ;
  };
}

console.log(repeat("ha", 4));

var testString = repeat("a", 50000);

function repeatTest(n) {
  var _times = n;
  var _accumulatedTime = 0.0;
  while(true) {
    var accumulatedTime = _accumulatedTime;
    var times = _times;
    if (times === 0) {
      return accumulatedTime;
    }
    var startTime = Date.now();
    isPalindrome(testString);
    var endTime = Date.now();
    _accumulatedTime = accumulatedTime + (endTime - startTime);
    _times = times - 1 | 0;
    continue ;
  };
}

var totalTime = repeatTest(1000);

console.log("Average time in seconds: ", totalTime / 1000.0);

exports.isPalindrome = isPalindrome;
exports.repeatWithReduce = repeatWithReduce;
exports.repeatRec = repeatRec;
exports.repeat = repeat;
exports.testString = testString;
exports.repeatTest = repeatTest;
exports.totalTime = totalTime;
/*  Not a pure module */
