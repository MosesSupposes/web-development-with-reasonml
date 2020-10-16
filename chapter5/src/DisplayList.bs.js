// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");

function intReducer(accumulator, item) {
  return accumulator + (String(item) + ", ");
}

function stringOfIntList(items) {
  return "[" + (Belt_List.reduce(items, "", intReducer) + "]");
}

var items = {
  hd: 10,
  tl: {
    hd: 11,
    tl: {
      hd: 12,
      tl: {
        hd: 13,
        tl: {
          hd: 14,
          tl: {
            hd: 15,
            tl: /* [] */0
          }
        }
      }
    }
  }
};

console.log(stringOfIntList(items));

function floatReducer(accumulator, item) {
  return accumulator + (item.toString() + ", ");
}

function stringOfFloatList(items) {
  return "[" + (Belt_List.reduce(items, "", floatReducer) + "]");
}

var floatItems = {
  hd: 3.6,
  tl: {
    hd: 7.9,
    tl: {
      hd: 8.25,
      tl: {
        hd: 41.0,
        tl: /* [] */0
      }
    }
  }
};

console.log(stringOfFloatList(floatItems));

function displayList(items, stringify) {
  var elementReducer = function (accumulator, item) {
    return accumulator + (Curry._1(stringify, item) + ", ");
  };
  return "[" + (Belt_List.reduce(items, "", elementReducer) + "]");
}

console.log(displayList(items, (function (prim) {
            return String(prim);
          })));

console.log(displayList(floatItems, (function (prim) {
            return prim.toString();
          })));

exports.intReducer = intReducer;
exports.stringOfIntList = stringOfIntList;
exports.items = items;
exports.floatReducer = floatReducer;
exports.stringOfFloatList = stringOfFloatList;
exports.floatItems = floatItems;
exports.displayList = displayList;
/*  Not a pure module */
