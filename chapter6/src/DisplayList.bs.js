// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

function stringOfList(items, stringify) {
  var helper = function (_accumulator, _theList) {
    while(true) {
      var theList = _theList;
      var accumulator = _accumulator;
      if (!theList) {
        return accumulator;
      }
      var xs = theList.tl;
      var x = theList.hd;
      if (!xs) {
        return accumulator + Curry._1(stringify, x);
      }
      _theList = xs;
      _accumulator = accumulator + (Curry._1(stringify, x) + ",");
      continue ;
    };
  };
  return helper("[", items) + "]";
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

exports.items = items;
exports.floatItems = floatItems;
exports.stringOfList = stringOfList;
/* No side effect */
