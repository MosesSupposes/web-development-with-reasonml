// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

var items = [
  10,
  11,
  12,
  13,
  14,
  15,
  16
];

function arrayTake(amount, array) {
  return Belt_Array.slice(array, 0, amount);
}

console.log(Belt_Array.slice(items, 0, 3));

function arrayDrop(amount, array) {
  return Belt_Array.slice(array, amount, array.length - 1 | 0);
}

console.log(arrayDrop(3, items));

function arraySplitAt(index, array) {
  var firstHalf = Belt_Array.slice(array, 0, index);
  var secondHalf = Belt_Array.slice(array, index, array.length - 1 | 0);
  return [
          firstHalf,
          secondHalf
        ];
}

console.log(arraySplitAt(3, items));

exports.items = items;
exports.arrayTake = arrayTake;
exports.arrayDrop = arrayDrop;
exports.arraySplitAt = arraySplitAt;
/*  Not a pure module */
