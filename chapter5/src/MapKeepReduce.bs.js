// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Belt_List = require("bs-platform/lib/js/belt_List.js");
var ShirtSize$Chapter5 = require("./ShirtSize.bs.js");

var orderList = {
  hd: [
    7,
    /* Medium */1
  ],
  tl: {
    hd: [
      5,
      /* XLarge */{
        _0: 3
      }
    ],
    tl: {
      hd: [
        4,
        /* Small */0
      ],
      tl: {
        hd: [
          6,
          /* Large */2
        ],
        tl: {
          hd: [
            8,
            /* Small */0
          ],
          tl: {
            hd: [
              2,
              /* Large */2
            ],
            tl: {
              hd: [
                9,
                /* Medium */1
              ],
              tl: {
                hd: [
                  3,
                  /* XLarge */{
                    _0: 2
                  }
                ],
                tl: /* [] */0
              }
            }
          }
        }
      }
    }
  }
};

function onePrice(param) {
  return param[0] * ShirtSize$Chapter5.price(param[1]);
}

var priceList = Belt_List.map(orderList, onePrice);

function isMedium(param) {
  return param[1] === /* Medium */1;
}

var mediums = Belt_List.keep(orderList, isMedium);

function addPriceLogged(runningTotal, orderItem) {
  var price = onePrice(orderItem);
  return runningTotal + price;
}

var totalPrice = Belt_List.reduce(orderList, 0.0, addPriceLogged);

console.log("Total price: " + totalPrice);

function addPriceToTotal(runningTotal, price) {
  return runningTotal + price;
}

var __x = Belt_List.map(orderList, onePrice);

var totalPrice2 = Belt_List.reduce(__x, 0.0, (function (runningTotal, price) {
        return runningTotal + price;
      }));

console.log("Total price: " + totalPrice2);

var mediumTotal = Belt_List.reduce(Belt_List.map(Belt_List.keep(orderList, isMedium), onePrice), 0.0, addPriceToTotal);

exports.orderList = orderList;
exports.onePrice = onePrice;
exports.priceList = priceList;
exports.isMedium = isMedium;
exports.mediums = mediums;
exports.addPriceLogged = addPriceLogged;
exports.totalPrice = totalPrice;
exports.addPriceToTotal = addPriceToTotal;
exports.totalPrice2 = totalPrice2;
exports.mediumTotal = mediumTotal;
/* priceList Not a pure module */