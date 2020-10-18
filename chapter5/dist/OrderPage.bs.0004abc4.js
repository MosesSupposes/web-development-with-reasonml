// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/bs-platform/lib/js/caml_array.js":[function(require,module,exports) {
'use strict';


function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  };
  return result;
}

function len(_acc, _l) {
  while(true) {
    var l = _l;
    var acc = _acc;
    if (!l) {
      return acc;
    }
    _l = l.tl;
    _acc = l.hd.length + acc | 0;
    continue ;
  };
}

function fill(arr, _i, _l) {
  while(true) {
    var l = _l;
    var i = _i;
    if (!l) {
      return ;
    }
    var x = l.hd;
    var l$1 = x.length;
    var k = i;
    var j = 0;
    while(j < l$1) {
      arr[k] = x[j];
      k = k + 1 | 0;
      j = j + 1 | 0;
    };
    _l = l.tl;
    _i = k;
    continue ;
  };
}

function caml_array_concat(l) {
  var v = len(0, l);
  var result = new Array(v);
  fill(result, 0, l);
  return result;
}

function set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  xs[index] = newval;
  
}

function get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return xs[index];
}

function caml_make_vect(len, init) {
  var b = new Array(len);
  for(var i = 0; i < len; ++i){
    b[i] = init;
  }
  return b;
}

function caml_make_float_vect(len) {
  var b = new Array(len);
  for(var i = 0; i < len; ++i){
    b[i] = 0;
  }
  return b;
}

function caml_array_blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for(var j = 0; j < len; ++j){
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }
    return ;
  }
  for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
    a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
  }
  
}

function caml_array_dup(prim) {
  return prim.slice(0);
}

exports.caml_array_dup = caml_array_dup;
exports.caml_array_sub = caml_array_sub;
exports.caml_array_concat = caml_array_concat;
exports.caml_make_vect = caml_make_vect;
exports.caml_make_float_vect = caml_make_float_vect;
exports.caml_array_blit = caml_array_blit;
exports.get = get;
exports.set = set;
/* No side effect */

},{}],"../node_modules/bs-platform/lib/js/curry.js":[function(require,module,exports) {
'use strict';

var Caml_array = require("./caml_array.js");

function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    }
    if (d >= 0) {
      return (function(f,args){
      return function (x) {
        return app(f, args.concat([x]));
      }
      }(f,args));
    }
    _args = Caml_array.caml_array_sub(args, arity, -d | 0);
    _f = f.apply(null, Caml_array.caml_array_sub(args, 0, arity));
    continue ;
  };
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    switch (arity) {
      case 1 :
          return o(a0);
      case 2 :
          return function (param) {
            return o(a0, param);
          };
      case 3 :
          return function (param, param$1) {
            return o(a0, param, param$1);
          };
      case 4 :
          return function (param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          };
      case 5 :
          return function (param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          };
      case 6 :
          return function (param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          };
      case 7 :
          return function (param, param$1, param$2, param$3, param$4, param$5) {
            return o(a0, param, param$1, param$2, param$3, param$4, param$5);
          };
      default:
        return app(o, [a0]);
    }
  }
}

function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return function (a0) {
      return _1(o, a0);
    };
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [a1]);
      case 2 :
          return o(a0, a1);
      case 3 :
          return function (param) {
            return o(a0, a1, param);
          };
      case 4 :
          return function (param, param$1) {
            return o(a0, a1, param, param$1);
          };
      case 5 :
          return function (param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          };
      case 6 :
          return function (param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          };
      case 7 :
          return function (param, param$1, param$2, param$3, param$4) {
            return o(a0, a1, param, param$1, param$2, param$3, param$4);
          };
      default:
        return app(o, [
                    a0,
                    a1
                  ]);
    }
  }
}

function __2(o) {
  var arity = o.length;
  if (arity === 2) {
    return o;
  } else {
    return function (a0, a1) {
      return _2(o, a0, a1);
    };
  }
}

function _3(o, a0, a1, a2) {
  var arity = o.length;
  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2
                    ]);
      case 2 :
          return app(o(a0, a1), [a2]);
      case 3 :
          return o(a0, a1, a2);
      case 4 :
          return function (param) {
            return o(a0, a1, a2, param);
          };
      case 5 :
          return function (param, param$1) {
            return o(a0, a1, a2, param, param$1);
          };
      case 6 :
          return function (param, param$1, param$2) {
            return o(a0, a1, a2, param, param$1, param$2);
          };
      case 7 :
          return function (param, param$1, param$2, param$3) {
            return o(a0, a1, a2, param, param$1, param$2, param$3);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2
                  ]);
    }
  }
}

function __3(o) {
  var arity = o.length;
  if (arity === 3) {
    return o;
  } else {
    return function (a0, a1, a2) {
      return _3(o, a0, a1, a2);
    };
  }
}

function _4(o, a0, a1, a2, a3) {
  var arity = o.length;
  if (arity === 4) {
    return o(a0, a1, a2, a3);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [a3]);
      case 4 :
          return o(a0, a1, a2, a3);
      case 5 :
          return function (param) {
            return o(a0, a1, a2, a3, param);
          };
      case 6 :
          return function (param, param$1) {
            return o(a0, a1, a2, a3, param, param$1);
          };
      case 7 :
          return function (param, param$1, param$2) {
            return o(a0, a1, a2, a3, param, param$1, param$2);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3
                  ]);
    }
  }
}

function __4(o) {
  var arity = o.length;
  if (arity === 4) {
    return o;
  } else {
    return function (a0, a1, a2, a3) {
      return _4(o, a0, a1, a2, a3);
    };
  }
}

function _5(o, a0, a1, a2, a3, a4) {
  var arity = o.length;
  if (arity === 5) {
    return o(a0, a1, a2, a3, a4);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [a4]);
      case 5 :
          return o(a0, a1, a2, a3, a4);
      case 6 :
          return function (param) {
            return o(a0, a1, a2, a3, a4, param);
          };
      case 7 :
          return function (param, param$1) {
            return o(a0, a1, a2, a3, a4, param, param$1);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4
                  ]);
    }
  }
}

function __5(o) {
  var arity = o.length;
  if (arity === 5) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4) {
      return _5(o, a0, a1, a2, a3, a4);
    };
  }
}

function _6(o, a0, a1, a2, a3, a4, a5) {
  var arity = o.length;
  if (arity === 6) {
    return o(a0, a1, a2, a3, a4, a5);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [a5]);
      case 6 :
          return o(a0, a1, a2, a3, a4, a5);
      case 7 :
          return function (param) {
            return o(a0, a1, a2, a3, a4, a5, param);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5
                  ]);
    }
  }
}

function __6(o) {
  var arity = o.length;
  if (arity === 6) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5) {
      return _6(o, a0, a1, a2, a3, a4, a5);
    };
  }
}

function _7(o, a0, a1, a2, a3, a4, a5, a6) {
  var arity = o.length;
  if (arity === 7) {
    return o(a0, a1, a2, a3, a4, a5, a6);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5,
                      a6
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [
                      a5,
                      a6
                    ]);
      case 6 :
          return app(o(a0, a1, a2, a3, a4, a5), [a6]);
      case 7 :
          return o(a0, a1, a2, a3, a4, a5, a6);
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6
                  ]);
    }
  }
}

function __7(o) {
  var arity = o.length;
  if (arity === 7) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5, a6) {
      return _7(o, a0, a1, a2, a3, a4, a5, a6);
    };
  }
}

function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
  var arity = o.length;
  if (arity === 8) {
    return o(a0, a1, a2, a3, a4, a5, a6, a7);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [
                      a5,
                      a6,
                      a7
                    ]);
      case 6 :
          return app(o(a0, a1, a2, a3, a4, a5), [
                      a6,
                      a7
                    ]);
      case 7 :
          return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6,
                    a7
                  ]);
    }
  }
}

function __8(o) {
  var arity = o.length;
  if (arity === 8) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5, a6, a7) {
      return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
    };
  }
}

exports.app = app;
exports._1 = _1;
exports.__1 = __1;
exports._2 = _2;
exports.__2 = __2;
exports._3 = _3;
exports.__3 = __3;
exports._4 = _4;
exports.__4 = __4;
exports._5 = _5;
exports.__5 = __5;
exports._6 = _6;
exports.__6 = __6;
exports._7 = _7;
exports.__7 = __7;
exports._8 = _8;
exports.__8 = __8;
/* No side effect */

},{"./caml_array.js":"../node_modules/bs-platform/lib/js/caml_array.js"}],"../node_modules/bs-platform/lib/js/js_int.js":[function(require,module,exports) {
'use strict';


function equal(x, y) {
  return x === y;
}

var max = 2147483647;

var min = -2147483648;

exports.equal = equal;
exports.max = max;
exports.min = min;
/* No side effect */

},{}],"../node_modules/bs-platform/lib/js/js_math.js":[function(require,module,exports) {
'use strict';

var Js_int = require("./js_int.js");

function unsafe_ceil(prim) {
  return Math.ceil(prim);
}

function ceil_int(f) {
  if (f > Js_int.max) {
    return Js_int.max;
  } else if (f < Js_int.min) {
    return Js_int.min;
  } else {
    return Math.ceil(f);
  }
}

function unsafe_floor(prim) {
  return Math.floor(prim);
}

function floor_int(f) {
  if (f > Js_int.max) {
    return Js_int.max;
  } else if (f < Js_int.min) {
    return Js_int.min;
  } else {
    return Math.floor(f);
  }
}

function random_int(min, max) {
  return floor_int(Math.random() * (max - min | 0)) + min | 0;
}

var ceil = ceil_int;

var floor = floor_int;

exports.unsafe_ceil = unsafe_ceil;
exports.ceil_int = ceil_int;
exports.ceil = ceil;
exports.unsafe_floor = unsafe_floor;
exports.floor_int = floor_int;
exports.floor = floor;
exports.random_int = random_int;
/* No side effect */

},{"./js_int.js":"../node_modules/bs-platform/lib/js/js_int.js"}],"../node_modules/bs-platform/lib/js/caml_option.js":[function(require,module,exports) {
'use strict';


function isNested(x) {
  return x.BS_PRIVATE_NESTED_SOME_NONE !== undefined;
}

function some(x) {
  if (x === undefined) {
    return {
            BS_PRIVATE_NESTED_SOME_NONE: 0
          };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
    return {
            BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
          };
  } else {
    return x;
  }
}

function nullable_to_opt(x) {
  if (x == null) {
    return ;
  } else {
    return some(x);
  }
}

function undefined_to_opt(x) {
  if (x === undefined) {
    return ;
  } else {
    return some(x);
  }
}

function null_to_opt(x) {
  if (x === null) {
    return ;
  } else {
    return some(x);
  }
}

function valFromOption(x) {
  if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined)) {
    return x;
  }
  var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
  if (depth === 0) {
    return ;
  } else {
    return {
            BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
          };
  }
}

function option_get(x) {
  if (x === undefined) {
    return ;
  } else {
    return valFromOption(x);
  }
}

function option_unwrap(x) {
  if (x !== undefined) {
    return x.VAL;
  } else {
    return x;
  }
}

exports.nullable_to_opt = nullable_to_opt;
exports.undefined_to_opt = undefined_to_opt;
exports.null_to_opt = null_to_opt;
exports.valFromOption = valFromOption;
exports.some = some;
exports.isNested = isNested;
exports.option_get = option_get;
exports.option_unwrap = option_unwrap;
/* No side effect */

},{}],"../node_modules/bs-platform/lib/js/caml_primitive.js":[function(require,module,exports) {
'use strict';


function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_bool_compare(x, y) {
  if (x) {
    if (y) {
      return 0;
    } else {
      return 1;
    }
  } else if (y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_float_compare(x, y) {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else if (x > y || x === x) {
    return 1;
  } else if (y === y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_string_compare(s1, s2) {
  if (s1 === s2) {
    return 0;
  } else if (s1 < s2) {
    return -1;
  } else {
    return 1;
  }
}

function caml_bool_min(x, y) {
  if (x) {
    return y;
  } else {
    return x;
  }
}

function caml_int_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_nativeint_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_bool_max(x, y) {
  if (x) {
    return x;
  } else {
    return y;
  }
}

function caml_int_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_nativeint_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

var caml_nativeint_compare = caml_int_compare;

var caml_int32_compare = caml_int_compare;

exports.caml_int_compare = caml_int_compare;
exports.caml_bool_compare = caml_bool_compare;
exports.caml_float_compare = caml_float_compare;
exports.caml_nativeint_compare = caml_nativeint_compare;
exports.caml_string_compare = caml_string_compare;
exports.caml_int32_compare = caml_int32_compare;
exports.caml_bool_min = caml_bool_min;
exports.caml_int_min = caml_int_min;
exports.caml_float_min = caml_float_min;
exports.caml_string_min = caml_string_min;
exports.caml_nativeint_min = caml_nativeint_min;
exports.caml_int32_min = caml_int32_min;
exports.caml_bool_max = caml_bool_max;
exports.caml_int_max = caml_int_max;
exports.caml_float_max = caml_float_max;
exports.caml_string_max = caml_string_max;
exports.caml_nativeint_max = caml_nativeint_max;
exports.caml_int32_max = caml_int32_max;
/* No side effect */

},{}],"../node_modules/bs-platform/lib/js/belt_Array.js":[function(require,module,exports) {
'use strict';

var Curry = require("./curry.js");
var Js_math = require("./js_math.js");
var Caml_option = require("./caml_option.js");
var Caml_primitive = require("./caml_primitive.js");

function get(arr, i) {
  if (i >= 0 && i < arr.length) {
    return Caml_option.some(arr[i]);
  }
  
}

function getExn(arr, i) {
  if (!(i >= 0 && i < arr.length)) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            27,
            4
          ],
          Error: new Error()
        };
  }
  return arr[i];
}

function set(arr, i, v) {
  if (i >= 0 && i < arr.length) {
    arr[i] = v;
    return true;
  } else {
    return false;
  }
}

function setExn(arr, i, v) {
  if (!(i >= 0 && i < arr.length)) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            33,
            2
          ],
          Error: new Error()
        };
  }
  arr[i] = v;
  
}

function swapUnsafe(xs, i, j) {
  var tmp = xs[i];
  xs[i] = xs[j];
  xs[j] = tmp;
  
}

function shuffleInPlace(xs) {
  var len = xs.length;
  for(var i = 0; i < len; ++i){
    swapUnsafe(xs, i, Js_math.random_int(i, len));
  }
  
}

function shuffle(xs) {
  var result = xs.slice(0);
  shuffleInPlace(result);
  return result;
}

function reverseInPlace(xs) {
  var len = xs.length;
  var ofs = 0;
  for(var i = 0 ,i_finish = len / 2 | 0; i < i_finish; ++i){
    swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
  }
  
}

function reverse(xs) {
  var len = xs.length;
  var result = new Array(len);
  for(var i = 0; i < len; ++i){
    result[i] = xs[(len - 1 | 0) - i | 0];
  }
  return result;
}

function make(l, f) {
  if (l <= 0) {
    return [];
  }
  var res = new Array(l);
  for(var i = 0; i < l; ++i){
    res[i] = f;
  }
  return res;
}

function makeByU(l, f) {
  if (l <= 0) {
    return [];
  }
  var res = new Array(l);
  for(var i = 0; i < l; ++i){
    res[i] = f(i);
  }
  return res;
}

function makeBy(l, f) {
  return makeByU(l, Curry.__1(f));
}

function makeByAndShuffleU(l, f) {
  var u = makeByU(l, f);
  shuffleInPlace(u);
  return u;
}

function makeByAndShuffle(l, f) {
  return makeByAndShuffleU(l, Curry.__1(f));
}

function range(start, finish) {
  var cut = finish - start | 0;
  if (cut < 0) {
    return [];
  }
  var arr = new Array(cut + 1 | 0);
  for(var i = 0; i <= cut; ++i){
    arr[i] = start + i | 0;
  }
  return arr;
}

function rangeBy(start, finish, step) {
  var cut = finish - start | 0;
  if (cut < 0 || step <= 0) {
    return [];
  }
  var nb = (cut / step | 0) + 1 | 0;
  var arr = new Array(nb);
  var cur = start;
  for(var i = 0; i < nb; ++i){
    arr[i] = cur;
    cur = cur + step | 0;
  }
  return arr;
}

function zip(xs, ys) {
  var lenx = xs.length;
  var leny = ys.length;
  var len = lenx < leny ? lenx : leny;
  var s = new Array(len);
  for(var i = 0; i < len; ++i){
    s[i] = [
      xs[i],
      ys[i]
    ];
  }
  return s;
}

function zipByU(xs, ys, f) {
  var lenx = xs.length;
  var leny = ys.length;
  var len = lenx < leny ? lenx : leny;
  var s = new Array(len);
  for(var i = 0; i < len; ++i){
    s[i] = f(xs[i], ys[i]);
  }
  return s;
}

function zipBy(xs, ys, f) {
  return zipByU(xs, ys, Curry.__2(f));
}

function concat(a1, a2) {
  var l1 = a1.length;
  var l2 = a2.length;
  var a1a2 = new Array(l1 + l2 | 0);
  for(var i = 0; i < l1; ++i){
    a1a2[i] = a1[i];
  }
  for(var i$1 = 0; i$1 < l2; ++i$1){
    a1a2[l1 + i$1 | 0] = a2[i$1];
  }
  return a1a2;
}

function concatMany(arrs) {
  var lenArrs = arrs.length;
  var totalLen = 0;
  for(var i = 0; i < lenArrs; ++i){
    totalLen = totalLen + arrs[i].length | 0;
  }
  var result = new Array(totalLen);
  totalLen = 0;
  for(var j = 0; j < lenArrs; ++j){
    var cur = arrs[j];
    for(var k = 0 ,k_finish = cur.length; k < k_finish; ++k){
      result[totalLen] = cur[k];
      totalLen = totalLen + 1 | 0;
    }
  }
  return result;
}

function slice(a, offset, len) {
  if (len <= 0) {
    return [];
  }
  var lena = a.length;
  var ofs = offset < 0 ? Caml_primitive.caml_int_max(lena + offset | 0, 0) : offset;
  var hasLen = lena - ofs | 0;
  var copyLength = hasLen < len ? hasLen : len;
  if (copyLength <= 0) {
    return [];
  }
  var result = new Array(copyLength);
  for(var i = 0; i < copyLength; ++i){
    result[i] = a[ofs + i | 0];
  }
  return result;
}

function sliceToEnd(a, offset) {
  var lena = a.length;
  var ofs = offset < 0 ? Caml_primitive.caml_int_max(lena + offset | 0, 0) : offset;
  var len = lena - ofs | 0;
  var result = new Array(len);
  for(var i = 0; i < len; ++i){
    result[i] = a[ofs + i | 0];
  }
  return result;
}

function fill(a, offset, len, v) {
  if (len <= 0) {
    return ;
  }
  var lena = a.length;
  var ofs = offset < 0 ? Caml_primitive.caml_int_max(lena + offset | 0, 0) : offset;
  var hasLen = lena - ofs | 0;
  var fillLength = hasLen < len ? hasLen : len;
  if (fillLength <= 0) {
    return ;
  }
  for(var i = ofs ,i_finish = ofs + fillLength | 0; i < i_finish; ++i){
    a[i] = v;
  }
  
}

function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
  if (srcofs2 <= srcofs1) {
    for(var j = 0; j < blitLength; ++j){
      a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
    }
    return ;
  }
  for(var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1){
    a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
  }
  
}

function blit(a1, ofs1, a2, ofs2, len) {
  var lena1 = a1.length;
  var lena2 = a2.length;
  var srcofs1 = ofs1 < 0 ? Caml_primitive.caml_int_max(lena1 + ofs1 | 0, 0) : ofs1;
  var srcofs2 = ofs2 < 0 ? Caml_primitive.caml_int_max(lena2 + ofs2 | 0, 0) : ofs2;
  var blitLength = Caml_primitive.caml_int_min(len, Caml_primitive.caml_int_min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));
  if (srcofs2 <= srcofs1) {
    for(var j = 0; j < blitLength; ++j){
      a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
    }
    return ;
  }
  for(var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1){
    a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
  }
  
}

function forEachU(a, f) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    f(a[i]);
  }
  
}

function forEach(a, f) {
  return forEachU(a, Curry.__1(f));
}

function mapU(a, f) {
  var l = a.length;
  var r = new Array(l);
  for(var i = 0; i < l; ++i){
    r[i] = f(a[i]);
  }
  return r;
}

function map(a, f) {
  return mapU(a, Curry.__1(f));
}

function getByU(a, p) {
  var l = a.length;
  var i = 0;
  var r;
  while(r === undefined && i < l) {
    var v = a[i];
    if (p(v)) {
      r = Caml_option.some(v);
    }
    i = i + 1 | 0;
  };
  return r;
}

function getBy(a, p) {
  return getByU(a, Curry.__1(p));
}

function getIndexByU(a, p) {
  var l = a.length;
  var i = 0;
  var r;
  while(r === undefined && i < l) {
    var v = a[i];
    if (p(v)) {
      r = i;
    }
    i = i + 1 | 0;
  };
  return r;
}

function getIndexBy(a, p) {
  return getIndexByU(a, Curry.__1(p));
}

function keepU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;
  for(var i = 0; i < l; ++i){
    var v = a[i];
    if (f(v)) {
      r[j] = v;
      j = j + 1 | 0;
    }
    
  }
  r.length = j;
  return r;
}

function keep(a, f) {
  return keepU(a, Curry.__1(f));
}

function keepWithIndexU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;
  for(var i = 0; i < l; ++i){
    var v = a[i];
    if (f(v, i)) {
      r[j] = v;
      j = j + 1 | 0;
    }
    
  }
  r.length = j;
  return r;
}

function keepWithIndex(a, f) {
  return keepWithIndexU(a, Curry.__2(f));
}

function keepMapU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;
  for(var i = 0; i < l; ++i){
    var v = a[i];
    var v$1 = f(v);
    if (v$1 !== undefined) {
      r[j] = Caml_option.valFromOption(v$1);
      j = j + 1 | 0;
    }
    
  }
  r.length = j;
  return r;
}

function keepMap(a, f) {
  return keepMapU(a, Curry.__1(f));
}

function forEachWithIndexU(a, f) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    f(i, a[i]);
  }
  
}

function forEachWithIndex(a, f) {
  return forEachWithIndexU(a, Curry.__2(f));
}

function mapWithIndexU(a, f) {
  var l = a.length;
  var r = new Array(l);
  for(var i = 0; i < l; ++i){
    r[i] = f(i, a[i]);
  }
  return r;
}

function mapWithIndex(a, f) {
  return mapWithIndexU(a, Curry.__2(f));
}

function reduceU(a, x, f) {
  var r = x;
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    r = f(r, a[i]);
  }
  return r;
}

function reduce(a, x, f) {
  return reduceU(a, x, Curry.__2(f));
}

function reduceReverseU(a, x, f) {
  var r = x;
  for(var i = a.length - 1 | 0; i >= 0; --i){
    r = f(r, a[i]);
  }
  return r;
}

function reduceReverse(a, x, f) {
  return reduceReverseU(a, x, Curry.__2(f));
}

function reduceReverse2U(a, b, x, f) {
  var r = x;
  var len = Caml_primitive.caml_int_min(a.length, b.length);
  for(var i = len - 1 | 0; i >= 0; --i){
    r = f(r, a[i], b[i]);
  }
  return r;
}

function reduceReverse2(a, b, x, f) {
  return reduceReverse2U(a, b, x, Curry.__3(f));
}

function reduceWithIndexU(a, x, f) {
  var r = x;
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    r = f(r, a[i], i);
  }
  return r;
}

function reduceWithIndex(a, x, f) {
  return reduceWithIndexU(a, x, Curry.__3(f));
}

function everyU(arr, b) {
  var len = arr.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === len) {
      return true;
    }
    if (!b(arr[i])) {
      return false;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function every(arr, f) {
  return everyU(arr, Curry.__1(f));
}

function someU(arr, b) {
  var len = arr.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === len) {
      return false;
    }
    if (b(arr[i])) {
      return true;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function some(arr, f) {
  return someU(arr, Curry.__1(f));
}

function everyAux2(arr1, arr2, _i, b, len) {
  while(true) {
    var i = _i;
    if (i === len) {
      return true;
    }
    if (!b(arr1[i], arr2[i])) {
      return false;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function every2U(a, b, p) {
  return everyAux2(a, b, 0, p, Caml_primitive.caml_int_min(a.length, b.length));
}

function every2(a, b, p) {
  return every2U(a, b, Curry.__2(p));
}

function some2U(a, b, p) {
  var _i = 0;
  var len = Caml_primitive.caml_int_min(a.length, b.length);
  while(true) {
    var i = _i;
    if (i === len) {
      return false;
    }
    if (p(a[i], b[i])) {
      return true;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function some2(a, b, p) {
  return some2U(a, b, Curry.__2(p));
}

function eqU(a, b, p) {
  var lena = a.length;
  var lenb = b.length;
  if (lena === lenb) {
    return everyAux2(a, b, 0, p, lena);
  } else {
    return false;
  }
}

function eq(a, b, p) {
  return eqU(a, b, Curry.__2(p));
}

function cmpU(a, b, p) {
  var lena = a.length;
  var lenb = b.length;
  if (lena > lenb) {
    return 1;
  } else if (lena < lenb) {
    return -1;
  } else {
    var _i = 0;
    while(true) {
      var i = _i;
      if (i === lena) {
        return 0;
      }
      var c = p(a[i], b[i]);
      if (c !== 0) {
        return c;
      }
      _i = i + 1 | 0;
      continue ;
    };
  }
}

function cmp(a, b, p) {
  return cmpU(a, b, Curry.__2(p));
}

function partitionU(a, f) {
  var l = a.length;
  var i = 0;
  var j = 0;
  var a1 = new Array(l);
  var a2 = new Array(l);
  for(var ii = 0; ii < l; ++ii){
    var v = a[ii];
    if (f(v)) {
      a1[i] = v;
      i = i + 1 | 0;
    } else {
      a2[j] = v;
      j = j + 1 | 0;
    }
  }
  a1.length = i;
  a2.length = j;
  return [
          a1,
          a2
        ];
}

function partition(a, f) {
  return partitionU(a, Curry.__1(f));
}

function unzip(a) {
  var l = a.length;
  var a1 = new Array(l);
  var a2 = new Array(l);
  for(var i = 0; i < l; ++i){
    var match = a[i];
    a1[i] = match[0];
    a2[i] = match[1];
  }
  return [
          a1,
          a2
        ];
}

exports.get = get;
exports.getExn = getExn;
exports.set = set;
exports.setExn = setExn;
exports.shuffleInPlace = shuffleInPlace;
exports.shuffle = shuffle;
exports.reverseInPlace = reverseInPlace;
exports.reverse = reverse;
exports.make = make;
exports.range = range;
exports.rangeBy = rangeBy;
exports.makeByU = makeByU;
exports.makeBy = makeBy;
exports.makeByAndShuffleU = makeByAndShuffleU;
exports.makeByAndShuffle = makeByAndShuffle;
exports.zip = zip;
exports.zipByU = zipByU;
exports.zipBy = zipBy;
exports.unzip = unzip;
exports.concat = concat;
exports.concatMany = concatMany;
exports.slice = slice;
exports.sliceToEnd = sliceToEnd;
exports.fill = fill;
exports.blit = blit;
exports.blitUnsafe = blitUnsafe;
exports.forEachU = forEachU;
exports.forEach = forEach;
exports.mapU = mapU;
exports.map = map;
exports.getByU = getByU;
exports.getBy = getBy;
exports.getIndexByU = getIndexByU;
exports.getIndexBy = getIndexBy;
exports.keepU = keepU;
exports.keep = keep;
exports.keepWithIndexU = keepWithIndexU;
exports.keepWithIndex = keepWithIndex;
exports.keepMapU = keepMapU;
exports.keepMap = keepMap;
exports.forEachWithIndexU = forEachWithIndexU;
exports.forEachWithIndex = forEachWithIndex;
exports.mapWithIndexU = mapWithIndexU;
exports.mapWithIndex = mapWithIndex;
exports.partitionU = partitionU;
exports.partition = partition;
exports.reduceU = reduceU;
exports.reduce = reduce;
exports.reduceReverseU = reduceReverseU;
exports.reduceReverse = reduceReverse;
exports.reduceReverse2U = reduceReverse2U;
exports.reduceReverse2 = reduceReverse2;
exports.reduceWithIndexU = reduceWithIndexU;
exports.reduceWithIndex = reduceWithIndex;
exports.someU = someU;
exports.some = some;
exports.everyU = everyU;
exports.every = every;
exports.every2U = every2U;
exports.every2 = every2;
exports.some2U = some2U;
exports.some2 = some2;
exports.cmpU = cmpU;
exports.cmp = cmp;
exports.eqU = eqU;
exports.eq = eq;
/* No side effect */

},{"./curry.js":"../node_modules/bs-platform/lib/js/curry.js","./js_math.js":"../node_modules/bs-platform/lib/js/js_math.js","./caml_option.js":"../node_modules/bs-platform/lib/js/caml_option.js","./caml_primitive.js":"../node_modules/bs-platform/lib/js/caml_primitive.js"}],"../node_modules/bs-platform/lib/js/belt_Option.js":[function(require,module,exports) {
'use strict';

var Curry = require("./curry.js");
var Caml_option = require("./caml_option.js");

function forEachU(opt, f) {
  if (opt !== undefined) {
    return f(Caml_option.valFromOption(opt));
  }
  
}

function forEach(opt, f) {
  return forEachU(opt, Curry.__1(f));
}

function getExn(x) {
  if (x !== undefined) {
    return Caml_option.valFromOption(x);
  }
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

function mapWithDefaultU(opt, $$default, f) {
  if (opt !== undefined) {
    return f(Caml_option.valFromOption(opt));
  } else {
    return $$default;
  }
}

function mapWithDefault(opt, $$default, f) {
  return mapWithDefaultU(opt, $$default, Curry.__1(f));
}

function mapU(opt, f) {
  if (opt !== undefined) {
    return Caml_option.some(f(Caml_option.valFromOption(opt)));
  }
  
}

function map(opt, f) {
  return mapU(opt, Curry.__1(f));
}

function flatMapU(opt, f) {
  if (opt !== undefined) {
    return f(Caml_option.valFromOption(opt));
  }
  
}

function flatMap(opt, f) {
  return flatMapU(opt, Curry.__1(f));
}

function getWithDefault(opt, $$default) {
  if (opt !== undefined) {
    return Caml_option.valFromOption(opt);
  } else {
    return $$default;
  }
}

function isSome(param) {
  return param !== undefined;
}

function isNone(x) {
  return x === undefined;
}

function eqU(a, b, f) {
  if (a !== undefined) {
    if (b !== undefined) {
      return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
    } else {
      return false;
    }
  } else {
    return b === undefined;
  }
}

function eq(a, b, f) {
  return eqU(a, b, Curry.__2(f));
}

function cmpU(a, b, f) {
  if (a !== undefined) {
    if (b !== undefined) {
      return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
    } else {
      return 1;
    }
  } else if (b !== undefined) {
    return -1;
  } else {
    return 0;
  }
}

function cmp(a, b, f) {
  return cmpU(a, b, Curry.__2(f));
}

exports.forEachU = forEachU;
exports.forEach = forEach;
exports.getExn = getExn;
exports.mapWithDefaultU = mapWithDefaultU;
exports.mapWithDefault = mapWithDefault;
exports.mapU = mapU;
exports.map = map;
exports.flatMapU = flatMapU;
exports.flatMap = flatMap;
exports.getWithDefault = getWithDefault;
exports.isSome = isSome;
exports.isNone = isNone;
exports.eqU = eqU;
exports.eq = eq;
exports.cmpU = cmpU;
exports.cmp = cmp;
/* No side effect */

},{"./curry.js":"../node_modules/bs-platform/lib/js/curry.js","./caml_option.js":"../node_modules/bs-platform/lib/js/caml_option.js"}],"../node_modules/bs-platform/lib/js/caml_int64.js":[function(require,module,exports) {
'use strict';

var Caml_primitive = require("./caml_primitive.js");

function mk(lo, hi) {
  return [
          hi,
          (lo >>> 0)
        ];
}

var min_int = [
  -2147483648,
  0
];

var max_int = [
  2147483647,
  4294967295
];

var one = [
  0,
  1
];

var zero = [
  0,
  0
];

var neg_one = [
  -1,
  4294967295
];

function neg_signed(x) {
  return (x & 2147483648) !== 0;
}

function non_neg_signed(x) {
  return (x & 2147483648) === 0;
}

function succ(param) {
  var x_lo = param[1];
  var x_hi = param[0];
  var lo = x_lo + 1 | 0;
  return mk(lo, x_hi + (
              lo === 0 ? 1 : 0
            ) | 0);
}

function neg(param) {
  var other_lo = (param[1] ^ -1) + 1 | 0;
  return mk(other_lo, (param[0] ^ -1) + (
              other_lo === 0 ? 1 : 0
            ) | 0);
}

function add_aux(param, y_lo, y_hi) {
  var x_lo = param[1];
  var lo = x_lo + y_lo | 0;
  var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || non_neg_signed(lo)) || neg_signed(y_lo) && non_neg_signed(lo) ? 1 : 0;
  return mk(lo, param[0] + y_hi + overflow | 0);
}

function add(self, param) {
  return add_aux(self, param[1], param[0]);
}

function eq(x, y) {
  if (x[0] === y[0]) {
    return x[1] === y[1];
  } else {
    return false;
  }
}

function equal_null(x, y) {
  if (y !== null) {
    return eq(x, y);
  } else {
    return false;
  }
}

function equal_undefined(x, y) {
  if (y !== undefined) {
    return eq(x, y);
  } else {
    return false;
  }
}

function equal_nullable(x, y) {
  if (y == null) {
    return false;
  } else {
    return eq(x, y);
  }
}

function sub_aux(x, lo, hi) {
  var y_lo = ((lo ^ -1) + 1 >>> 0);
  var y_hi = (hi ^ -1) + (
    y_lo === 0 ? 1 : 0
  ) | 0;
  return add_aux(x, y_lo, y_hi);
}

function sub(self, param) {
  return sub_aux(self, param[1], param[0]);
}

function lsl_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var lo = x[1];
  if (numBits >= 32) {
    return mk(0, (lo << (numBits - 32 | 0)));
  } else {
    return mk((lo << numBits), (lo >>> (32 - numBits | 0)) | (x[0] << numBits));
  }
}

function lsr_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var hi = x[0];
  var offset = numBits - 32 | 0;
  if (offset === 0) {
    return mk(hi, 0);
  } else if (offset > 0) {
    return mk((hi >>> offset), 0);
  } else {
    return mk((hi << (-offset | 0)) | (x[1] >>> numBits), (hi >>> numBits));
  }
}

function asr_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var hi = x[0];
  if (numBits < 32) {
    return mk((hi << (32 - numBits | 0)) | (x[1] >>> numBits), (hi >> numBits));
  } else {
    return mk((hi >> (numBits - 32 | 0)), hi >= 0 ? 0 : -1);
  }
}

function is_zero(param) {
  if (param[0] !== 0 || param[1] !== 0) {
    return false;
  } else {
    return true;
  }
}

function mul(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var lo;
    var this_hi = $$this[0];
    var exit = 0;
    var exit$1 = 0;
    var exit$2 = 0;
    if (this_hi !== 0) {
      exit$2 = 4;
    } else {
      if ($$this[1] === 0) {
        return zero;
      }
      exit$2 = 4;
    }
    if (exit$2 === 4) {
      if (other[0] !== 0) {
        exit$1 = 3;
      } else {
        if (other[1] === 0) {
          return zero;
        }
        exit$1 = 3;
      }
    }
    if (exit$1 === 3) {
      if (this_hi !== -2147483648 || $$this[1] !== 0) {
        exit = 2;
      } else {
        lo = other[1];
      }
    }
    if (exit === 2) {
      var other_hi = other[0];
      var lo$1 = $$this[1];
      var exit$3 = 0;
      if (other_hi !== -2147483648 || other[1] !== 0) {
        exit$3 = 3;
      } else {
        lo = lo$1;
      }
      if (exit$3 === 3) {
        var other_lo = other[1];
        if (this_hi < 0) {
          if (other_hi >= 0) {
            return neg(mul(neg($$this), other));
          }
          _other = neg(other);
          _this = neg($$this);
          continue ;
        }
        if (other_hi < 0) {
          return neg(mul($$this, neg(other)));
        }
        var a48 = (this_hi >>> 16);
        var a32 = this_hi & 65535;
        var a16 = (lo$1 >>> 16);
        var a00 = lo$1 & 65535;
        var b48 = (other_hi >>> 16);
        var b32 = other_hi & 65535;
        var b16 = (other_lo >>> 16);
        var b00 = other_lo & 65535;
        var c48 = 0;
        var c32 = 0;
        var c16 = 0;
        var c00 = a00 * b00;
        c16 = (c00 >>> 16) + a16 * b00;
        c32 = (c16 >>> 16);
        c16 = (c16 & 65535) + a00 * b16;
        c32 = c32 + (c16 >>> 16) + a32 * b00;
        c48 = (c32 >>> 16);
        c32 = (c32 & 65535) + a16 * b16;
        c48 = c48 + (c32 >>> 16);
        c32 = (c32 & 65535) + a00 * b32;
        c48 = c48 + (c32 >>> 16);
        c32 = c32 & 65535;
        c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
        return mk(c00 & 65535 | ((c16 & 65535) << 16), c32 | (c48 << 16));
      }
      
    }
    if ((lo & 1) === 0) {
      return zero;
    } else {
      return min_int;
    }
  };
}

function xor(param, param$1) {
  return mk(param[1] ^ param$1[1], param[0] ^ param$1[0]);
}

function or_(param, param$1) {
  return mk(param[1] | param$1[1], param[0] | param$1[0]);
}

function and_(param, param$1) {
  return mk(param[1] & param$1[1], param[0] & param$1[0]);
}

function ge(param, param$1) {
  var other_hi = param$1[0];
  var hi = param[0];
  if (hi > other_hi) {
    return true;
  } else if (hi < other_hi) {
    return false;
  } else {
    return param[1] >= param$1[1];
  }
}

function neq(x, y) {
  return !eq(x, y);
}

function lt(x, y) {
  return !ge(x, y);
}

function gt(x, y) {
  if (x[0] > y[0]) {
    return true;
  } else if (x[0] < y[0]) {
    return false;
  } else {
    return x[1] > y[1];
  }
}

function le(x, y) {
  return !gt(x, y);
}

function min(x, y) {
  if (ge(x, y)) {
    return y;
  } else {
    return x;
  }
}

function max(x, y) {
  if (gt(x, y)) {
    return x;
  } else {
    return y;
  }
}

function to_float(param) {
  return param[0] * 0x100000000 + param[1];
}

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  } else if (x <= -9.22337203685477581e+18) {
    return min_int;
  } else if (x + 1 >= 9.22337203685477581e+18) {
    return max_int;
  } else if (x < 0) {
    return neg(of_float(-x));
  } else {
    return mk(x % 4294967296 | 0, x / 4294967296 | 0);
  }
}

function isSafeInteger(param) {
  var hi = param[0];
  var top11Bits = (hi >> 21);
  if (top11Bits === 0) {
    return true;
  } else if (top11Bits === -1) {
    return !(param[1] === 0 && hi === (4292870144 | 0));
  } else {
    return false;
  }
}

function to_string(self) {
  if (isSafeInteger(self)) {
    return String(to_float(self));
  }
  if (self[0] < 0) {
    if (eq(self, min_int)) {
      return "-9223372036854775808";
    } else {
      return "-" + to_string(neg(self));
    }
  }
  var approx_div1 = of_float(Math.floor(to_float(self) / 10));
  var lo = approx_div1[1];
  var hi = approx_div1[0];
  var match = sub_aux(sub_aux(self, (lo << 3), (lo >>> 29) | (hi << 3)), (lo << 1), (lo >>> 31) | (hi << 1));
  var rem_lo = match[1];
  var rem_hi = match[0];
  if (rem_lo === 0 && rem_hi === 0) {
    return to_string(approx_div1) + "0";
  }
  if (rem_hi < 0) {
    var rem_lo$1 = ((rem_lo ^ -1) + 1 >>> 0);
    var delta = Math.ceil(rem_lo$1 / 10);
    var remainder = 10 * delta - rem_lo$1;
    return to_string(sub_aux(approx_div1, delta | 0, 0)) + String(remainder | 0);
  }
  var rem_lo$2 = rem_lo;
  var delta$1 = Math.floor(rem_lo$2 / 10);
  var remainder$1 = rem_lo$2 - 10 * delta$1;
  return to_string(add_aux(approx_div1, delta$1 | 0, 0)) + String(remainder$1 | 0);
}

function div(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var self_hi = self[0];
    var exit = 0;
    var exit$1 = 0;
    if (other[0] !== 0 || other[1] !== 0) {
      exit$1 = 2;
    } else {
      throw {
            RE_EXN_ID: "Division_by_zero",
            Error: new Error()
          };
    }
    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0) {
          exit = 1;
        } else {
          if (self[1] === 0) {
            return zero;
          }
          exit = 1;
        }
      } else if (self[1] !== 0) {
        exit = 1;
      } else {
        if (eq(other, one) || eq(other, neg_one)) {
          return self;
        }
        if (eq(other, min_int)) {
          return one;
        }
        var half_this = asr_(self, 1);
        var approx = lsl_(div(half_this, other), 1);
        var exit$2 = 0;
        if (approx[0] !== 0) {
          exit$2 = 3;
        } else {
          if (approx[1] === 0) {
            if (other[0] < 0) {
              return one;
            } else {
              return neg(one);
            }
          }
          exit$2 = 3;
        }
        if (exit$2 === 3) {
          var rem = sub(self, mul(other, approx));
          return add(approx, div(rem, other));
        }
        
      }
    }
    if (exit === 1) {
      var other_hi = other[0];
      var exit$3 = 0;
      if (other_hi !== -2147483648) {
        exit$3 = 2;
      } else {
        if (other[1] === 0) {
          return zero;
        }
        exit$3 = 2;
      }
      if (exit$3 === 2) {
        if (self_hi < 0) {
          if (other_hi >= 0) {
            return neg(div(neg(self), other));
          }
          _other = neg(other);
          _self = neg(self);
          continue ;
        }
        if (other_hi < 0) {
          return neg(div(self, neg(other)));
        }
        var res = zero;
        var rem$1 = self;
        while(ge(rem$1, other)) {
          var approx$1 = Caml_primitive.caml_float_max(1, Math.floor(to_float(rem$1) / to_float(other)));
          var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
          var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
          var approxRes = of_float(approx$1);
          var approxRem = mul(approxRes, other);
          while(approxRem[0] < 0 || gt(approxRem, rem$1)) {
            approx$1 = approx$1 - delta;
            approxRes = of_float(approx$1);
            approxRem = mul(approxRes, other);
          };
          if (is_zero(approxRes)) {
            approxRes = one;
          }
          res = add(res, approxRes);
          rem$1 = sub(rem$1, approxRem);
        };
        return res;
      }
      
    }
    
  };
}

function mod_(self, other) {
  return sub(self, mul(div(self, other), other));
}

function div_mod(self, other) {
  var quotient = div(self, other);
  return [
          quotient,
          sub(self, mul(quotient, other))
        ];
}

function compare(self, other) {
  var v = Caml_primitive.caml_nativeint_compare(self[0], other[0]);
  if (v === 0) {
    return Caml_primitive.caml_nativeint_compare(self[1], other[1]);
  } else {
    return v;
  }
}

function of_int32(lo) {
  return mk(lo, lo < 0 ? -1 : 0);
}

function to_int32(x) {
  return x[1] | 0;
}

function to_hex(x) {
  var x_lo = x[1];
  var x_hi = x[0];
  var aux = function (v) {
    return (v >>> 0).toString(16);
  };
  if (x_hi === 0 && x_lo === 0) {
    return "0";
  }
  if (x_lo === 0) {
    return aux(x_hi) + "00000000";
  }
  if (x_hi === 0) {
    return aux(x_lo);
  }
  var lo = aux(x_lo);
  var pad = 8 - lo.length | 0;
  if (pad <= 0) {
    return aux(x_hi) + lo;
  } else {
    return aux(x_hi) + ("0".repeat(pad) + lo);
  }
}

function discard_sign(x) {
  return [
          2147483647 & x[0],
          x[1]
        ];
}

function float_of_bits(x) {
  return (function(lo,hi){ return (new Float64Array(new Int32Array([lo,hi]).buffer))[0]})(x[1], x[0]);
}

function bits_of_float(x) {
  var match = (function(x){return new Int32Array(new Float64Array([x]).buffer)})(x);
  return mk(match[0], match[1]);
}

exports.mk = mk;
exports.succ = succ;
exports.min_int = min_int;
exports.max_int = max_int;
exports.one = one;
exports.zero = zero;
exports.neg_one = neg_one;
exports.of_int32 = of_int32;
exports.to_int32 = to_int32;
exports.add = add;
exports.neg = neg;
exports.sub = sub;
exports.lsl_ = lsl_;
exports.lsr_ = lsr_;
exports.asr_ = asr_;
exports.is_zero = is_zero;
exports.mul = mul;
exports.xor = xor;
exports.or_ = or_;
exports.and_ = and_;
exports.ge = ge;
exports.eq = eq;
exports.neq = neq;
exports.lt = lt;
exports.gt = gt;
exports.le = le;
exports.equal_null = equal_null;
exports.equal_undefined = equal_undefined;
exports.equal_nullable = equal_nullable;
exports.min = min;
exports.max = max;
exports.to_float = to_float;
exports.of_float = of_float;
exports.div = div;
exports.mod_ = mod_;
exports.compare = compare;
exports.float_of_bits = float_of_bits;
exports.bits_of_float = bits_of_float;
exports.div_mod = div_mod;
exports.to_hex = to_hex;
exports.discard_sign = discard_sign;
exports.to_string = to_string;
/* No side effect */

},{"./caml_primitive.js":"../node_modules/bs-platform/lib/js/caml_primitive.js"}],"../node_modules/bs-platform/lib/js/caml_format.js":[function(require,module,exports) {
'use strict';

var Caml_int64 = require("./caml_int64.js");

function parse_digit(c) {
  if (c >= 65) {
    if (c >= 97) {
      if (c >= 123) {
        return -1;
      } else {
        return c - 87 | 0;
      }
    } else if (c >= 91) {
      return -1;
    } else {
      return c - 55 | 0;
    }
  } else if (c > 57 || c < 48) {
    return -1;
  } else {
    return c - /* "0" */48 | 0;
  }
}

function int_of_string_base(param) {
  switch (param) {
    case /* Oct */0 :
        return 8;
    case /* Hex */1 :
        return 16;
    case /* Dec */2 :
        return 10;
    case /* Bin */3 :
        return 2;
    
  }
}

function parse_sign_and_base(s) {
  var sign = 1;
  var base = /* Dec */2;
  var i = 0;
  var match = s.charCodeAt(i);
  switch (match) {
    case 43 :
        i = i + 1 | 0;
        break;
    case 44 :
        break;
    case 45 :
        sign = -1;
        i = i + 1 | 0;
        break;
    default:
      
  }
  if (s[i] === "0") {
    var match$1 = s.charCodeAt(i + 1 | 0);
    if (match$1 >= 89) {
      if (match$1 >= 111) {
        if (match$1 < 121) {
          switch (match$1 - 111 | 0) {
            case 0 :
                base = /* Oct */0;
                i = i + 2 | 0;
                break;
            case 6 :
                i = i + 2 | 0;
                break;
            case 1 :
            case 2 :
            case 3 :
            case 4 :
            case 5 :
            case 7 :
            case 8 :
                break;
            case 9 :
                base = /* Hex */1;
                i = i + 2 | 0;
                break;
            
          }
        }
        
      } else if (match$1 === 98) {
        base = /* Bin */3;
        i = i + 2 | 0;
      }
      
    } else if (match$1 !== 66) {
      if (match$1 >= 79) {
        switch (match$1 - 79 | 0) {
          case 0 :
              base = /* Oct */0;
              i = i + 2 | 0;
              break;
          case 6 :
              i = i + 2 | 0;
              break;
          case 1 :
          case 2 :
          case 3 :
          case 4 :
          case 5 :
          case 7 :
          case 8 :
              break;
          case 9 :
              base = /* Hex */1;
              i = i + 2 | 0;
              break;
          
        }
      }
      
    } else {
      base = /* Bin */3;
      i = i + 2 | 0;
    }
  }
  return [
          i,
          sign,
          base
        ];
}

function caml_int_of_string(s) {
  var match = parse_sign_and_base(s);
  var i = match[0];
  var base = int_of_string_base(match[2]);
  var threshold = 4294967295;
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = parse_digit(c);
  if (d < 0 || d >= base) {
    throw {
          RE_EXN_ID: "Failure",
          _1: "int_of_string",
          Error: new Error()
        };
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      }
      var a = s.charCodeAt(k);
      if (a === /* "_" */95) {
        _k = k + 1 | 0;
        continue ;
      }
      var v = parse_digit(a);
      if (v < 0 || v >= base) {
        throw {
              RE_EXN_ID: "Failure",
              _1: "int_of_string",
              Error: new Error()
            };
      }
      var acc$1 = base * acc + v;
      if (acc$1 > threshold) {
        throw {
              RE_EXN_ID: "Failure",
              _1: "int_of_string",
              Error: new Error()
            };
      }
      _k = k + 1 | 0;
      _acc = acc$1;
      continue ;
    };
  };
  var res = match[1] * aux(d, i + 1 | 0);
  var or_res = res | 0;
  if (base === 10 && res !== or_res) {
    throw {
          RE_EXN_ID: "Failure",
          _1: "int_of_string",
          Error: new Error()
        };
  }
  return or_res;
}

function caml_int64_of_string(s) {
  var match = parse_sign_and_base(s);
  var hbase = match[2];
  var i = match[0];
  var base = Caml_int64.of_int32(int_of_string_base(hbase));
  var sign = Caml_int64.of_int32(match[1]);
  var threshold;
  switch (hbase) {
    case /* Oct */0 :
        threshold = Caml_int64.mk(-1, 536870911);
        break;
    case /* Hex */1 :
        threshold = Caml_int64.mk(-1, 268435455);
        break;
    case /* Dec */2 :
        threshold = Caml_int64.mk(-1717986919, 429496729);
        break;
    case /* Bin */3 :
        threshold = Caml_int64.max_int;
        break;
    
  }
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = Caml_int64.of_int32(parse_digit(c));
  if (Caml_int64.lt(d, Caml_int64.zero) || Caml_int64.ge(d, base)) {
    throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error()
        };
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      }
      var a = s.charCodeAt(k);
      if (a === /* "_" */95) {
        _k = k + 1 | 0;
        continue ;
      }
      var v = Caml_int64.of_int32(parse_digit(a));
      if (Caml_int64.lt(v, Caml_int64.zero) || Caml_int64.ge(v, base) || Caml_int64.gt(acc, threshold)) {
        throw {
              RE_EXN_ID: "Failure",
              _1: "int64_of_string",
              Error: new Error()
            };
      }
      var acc$1 = Caml_int64.add(Caml_int64.mul(base, acc), v);
      _k = k + 1 | 0;
      _acc = acc$1;
      continue ;
    };
  };
  var res = Caml_int64.mul(sign, aux(d, i + 1 | 0));
  var or_res = Caml_int64.or_(res, Caml_int64.zero);
  if (Caml_int64.eq(base, Caml_int64.mk(10, 0)) && Caml_int64.neq(res, or_res)) {
    throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error()
        };
  }
  return or_res;
}

function int_of_base(param) {
  switch (param) {
    case /* Oct */0 :
        return 8;
    case /* Hex */1 :
        return 16;
    case /* Dec */2 :
        return 10;
    
  }
}

function lowercase(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function parse_format(fmt) {
  var len = fmt.length;
  if (len > 31) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "format_int: format too long",
          Error: new Error()
        };
  }
  var f = {
    justify: "+",
    signstyle: "-",
    filter: " ",
    alternate: false,
    base: /* Dec */2,
    signedconv: false,
    width: 0,
    uppercase: false,
    sign: 1,
    prec: -1,
    conv: "f"
  };
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= len) {
      return f;
    }
    var c = fmt.charCodeAt(i);
    var exit = 0;
    if (c >= 69) {
      if (c >= 88) {
        if (c >= 121) {
          exit = 1;
        } else {
          switch (c - 88 | 0) {
            case 0 :
                f.base = /* Hex */1;
                f.uppercase = true;
                _i = i + 1 | 0;
                continue ;
            case 13 :
            case 14 :
            case 15 :
                exit = 5;
                break;
            case 12 :
            case 17 :
                exit = 4;
                break;
            case 23 :
                f.base = /* Oct */0;
                _i = i + 1 | 0;
                continue ;
            case 29 :
                f.base = /* Dec */2;
                _i = i + 1 | 0;
                continue ;
            case 1 :
            case 2 :
            case 3 :
            case 4 :
            case 5 :
            case 6 :
            case 7 :
            case 8 :
            case 9 :
            case 10 :
            case 11 :
            case 16 :
            case 18 :
            case 19 :
            case 20 :
            case 21 :
            case 22 :
            case 24 :
            case 25 :
            case 26 :
            case 27 :
            case 28 :
            case 30 :
            case 31 :
                exit = 1;
                break;
            case 32 :
                f.base = /* Hex */1;
                _i = i + 1 | 0;
                continue ;
            
          }
        }
      } else if (c >= 72) {
        exit = 1;
      } else {
        f.signedconv = true;
        f.uppercase = true;
        f.conv = String.fromCharCode(lowercase(c));
        _i = i + 1 | 0;
        continue ;
      }
    } else {
      switch (c) {
        case 35 :
            f.alternate = true;
            _i = i + 1 | 0;
            continue ;
        case 32 :
        case 43 :
            exit = 2;
            break;
        case 45 :
            f.justify = "-";
            _i = i + 1 | 0;
            continue ;
        case 46 :
            f.prec = 0;
            var j = i + 1 | 0;
            while((function(j){
                return function () {
                  var w = fmt.charCodeAt(j) - /* "0" */48 | 0;
                  return w >= 0 && w <= 9;
                }
                }(j))()) {
              f.prec = (Math.imul(f.prec, 10) + fmt.charCodeAt(j) | 0) - /* "0" */48 | 0;
              j = j + 1 | 0;
            };
            _i = j;
            continue ;
        case 33 :
        case 34 :
        case 36 :
        case 37 :
        case 38 :
        case 39 :
        case 40 :
        case 41 :
        case 42 :
        case 44 :
        case 47 :
            exit = 1;
            break;
        case 48 :
            f.filter = "0";
            _i = i + 1 | 0;
            continue ;
        case 49 :
        case 50 :
        case 51 :
        case 52 :
        case 53 :
        case 54 :
        case 55 :
        case 56 :
        case 57 :
            exit = 3;
            break;
        default:
          exit = 1;
      }
    }
    switch (exit) {
      case 1 :
          _i = i + 1 | 0;
          continue ;
      case 2 :
          f.signstyle = String.fromCharCode(c);
          _i = i + 1 | 0;
          continue ;
      case 3 :
          f.width = 0;
          var j$1 = i;
          while((function(j$1){
              return function () {
                var w = fmt.charCodeAt(j$1) - /* "0" */48 | 0;
                return w >= 0 && w <= 9;
              }
              }(j$1))()) {
            f.width = (Math.imul(f.width, 10) + fmt.charCodeAt(j$1) | 0) - /* "0" */48 | 0;
            j$1 = j$1 + 1 | 0;
          };
          _i = j$1;
          continue ;
      case 4 :
          f.signedconv = true;
          f.base = /* Dec */2;
          _i = i + 1 | 0;
          continue ;
      case 5 :
          f.signedconv = true;
          f.conv = String.fromCharCode(c);
          _i = i + 1 | 0;
          continue ;
      
    }
  };
}

function finish_formatting(config, rawbuffer) {
  var justify = config.justify;
  var signstyle = config.signstyle;
  var filter = config.filter;
  var alternate = config.alternate;
  var base = config.base;
  var signedconv = config.signedconv;
  var width = config.width;
  var uppercase = config.uppercase;
  var sign = config.sign;
  var len = rawbuffer.length;
  if (signedconv && (sign < 0 || signstyle !== "-")) {
    len = len + 1 | 0;
  }
  if (alternate) {
    if (base === /* Oct */0) {
      len = len + 1 | 0;
    } else if (base === /* Hex */1) {
      len = len + 2 | 0;
    }
    
  }
  var buffer = "";
  if (justify === "+" && filter === " ") {
    for(var _for = len; _for < width; ++_for){
      buffer = buffer + filter;
    }
  }
  if (signedconv) {
    if (sign < 0) {
      buffer = buffer + "-";
    } else if (signstyle !== "-") {
      buffer = buffer + signstyle;
    }
    
  }
  if (alternate && base === /* Oct */0) {
    buffer = buffer + "0";
  }
  if (alternate && base === /* Hex */1) {
    buffer = buffer + "0x";
  }
  if (justify === "+" && filter === "0") {
    for(var _for$1 = len; _for$1 < width; ++_for$1){
      buffer = buffer + filter;
    }
  }
  buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
  if (justify === "-") {
    for(var _for$2 = len; _for$2 < width; ++_for$2){
      buffer = buffer + " ";
    }
  }
  return buffer;
}

function caml_format_int(fmt, i) {
  if (fmt === "%d") {
    return String(i);
  }
  var f = parse_format(fmt);
  var i$1 = i < 0 ? (
      f.signedconv ? (f.sign = -1, -i) : (i >>> 0)
    ) : i;
  var s = i$1.toString(int_of_base(f.base));
  if (f.prec >= 0) {
    f.filter = " ";
    var n = f.prec - s.length | 0;
    if (n > 0) {
      s = "0".repeat(n) + s;
    }
    
  }
  return finish_formatting(f, s);
}

function dec_of_pos_int64(x) {
  if (!Caml_int64.lt(x, Caml_int64.zero)) {
    return Caml_int64.to_string(x);
  }
  var wbase = Caml_int64.mk(10, 0);
  var y = Caml_int64.discard_sign(x);
  var match = Caml_int64.div_mod(y, wbase);
  var match$1 = Caml_int64.div_mod(Caml_int64.add(Caml_int64.mk(8, 0), match[1]), wbase);
  var quotient = Caml_int64.add(Caml_int64.add(Caml_int64.mk(-858993460, 214748364), match[0]), match$1[0]);
  return Caml_int64.to_string(quotient) + "0123456789"[Caml_int64.to_int32(match$1[1])];
}

function oct_of_int64(x) {
  var s = "";
  var wbase = Caml_int64.mk(8, 0);
  var cvtbl = "01234567";
  if (Caml_int64.lt(x, Caml_int64.zero)) {
    var y = Caml_int64.discard_sign(x);
    var match = Caml_int64.div_mod(y, wbase);
    var quotient = Caml_int64.add(Caml_int64.mk(0, 268435456), match[0]);
    var modulus = match[1];
    s = cvtbl[Caml_int64.to_int32(modulus)] + s;
    while(Caml_int64.neq(quotient, Caml_int64.zero)) {
      var match$1 = Caml_int64.div_mod(quotient, wbase);
      quotient = match$1[0];
      modulus = match$1[1];
      s = cvtbl[Caml_int64.to_int32(modulus)] + s;
    };
  } else {
    var match$2 = Caml_int64.div_mod(x, wbase);
    var quotient$1 = match$2[0];
    var modulus$1 = match$2[1];
    s = cvtbl[Caml_int64.to_int32(modulus$1)] + s;
    while(Caml_int64.neq(quotient$1, Caml_int64.zero)) {
      var match$3 = Caml_int64.div_mod(quotient$1, wbase);
      quotient$1 = match$3[0];
      modulus$1 = match$3[1];
      s = cvtbl[Caml_int64.to_int32(modulus$1)] + s;
    };
  }
  return s;
}

function caml_int64_format(fmt, x) {
  if (fmt === "%d") {
    return Caml_int64.to_string(x);
  }
  var f = parse_format(fmt);
  var x$1 = f.signedconv && Caml_int64.lt(x, Caml_int64.zero) ? (f.sign = -1, Caml_int64.neg(x)) : x;
  var match = f.base;
  var s;
  switch (match) {
    case /* Oct */0 :
        s = oct_of_int64(x$1);
        break;
    case /* Hex */1 :
        s = Caml_int64.to_hex(x$1);
        break;
    case /* Dec */2 :
        s = dec_of_pos_int64(x$1);
        break;
    
  }
  var fill_s;
  if (f.prec >= 0) {
    f.filter = " ";
    var n = f.prec - s.length | 0;
    fill_s = n > 0 ? "0".repeat(n) + s : s;
  } else {
    fill_s = s;
  }
  return finish_formatting(f, fill_s);
}

function caml_format_float(fmt, x) {
  var f = parse_format(fmt);
  var prec = f.prec < 0 ? 6 : f.prec;
  var x$1 = x < 0 ? (f.sign = -1, -x) : x;
  var s = "";
  if (isNaN(x$1)) {
    s = "nan";
    f.filter = " ";
  } else if (isFinite(x$1)) {
    var match = f.conv;
    switch (match) {
      case "e" :
          s = x$1.toExponential(prec);
          var i = s.length;
          if (s[i - 3 | 0] === "e") {
            s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
          }
          break;
      case "f" :
          s = x$1.toFixed(prec);
          break;
      case "g" :
          var prec$1 = prec !== 0 ? prec : 1;
          s = x$1.toExponential(prec$1 - 1 | 0);
          var j = s.indexOf("e");
          var exp = Number(s.slice(j + 1 | 0)) | 0;
          if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
            var i$1 = j - 1 | 0;
            while(s[i$1] === "0") {
              i$1 = i$1 - 1 | 0;
            };
            if (s[i$1] === ".") {
              i$1 = i$1 - 1 | 0;
            }
            s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
            var i$2 = s.length;
            if (s[i$2 - 3 | 0] === "e") {
              s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
            }
            
          } else {
            var p = prec$1;
            if (exp < 0) {
              p = p - (exp + 1 | 0) | 0;
              s = x$1.toFixed(p);
            } else {
              while((function () {
                      s = x$1.toFixed(p);
                      return s.length > (prec$1 + 1 | 0);
                    })()) {
                p = p - 1 | 0;
              };
            }
            if (p !== 0) {
              var k = s.length - 1 | 0;
              while(s[k] === "0") {
                k = k - 1 | 0;
              };
              if (s[k] === ".") {
                k = k - 1 | 0;
              }
              s = s.slice(0, k + 1 | 0);
            }
            
          }
          break;
      default:
        
    }
  } else {
    s = "inf";
    f.filter = " ";
  }
  return finish_formatting(f, s);
}

var caml_hexstring_of_float = (function(x,prec,style){
  if (!isFinite(x)) {
    if (isNaN(x)) return "nan";
    return x > 0 ? "infinity":"-infinity";
  }
  var sign = (x==0 && 1/x == -Infinity)?1:(x>=0)?0:1;
  if(sign) x = -x;
  var exp = 0;
  if (x == 0) { }
  else if (x < 1) {
    while (x < 1 && exp > -1022)  { x *= 2; exp-- }
  } else {
    while (x >= 2) { x /= 2; exp++ }
  }
  var exp_sign = exp < 0 ? '' : '+';
  var sign_str = '';
  if (sign) sign_str = '-'
  else {
    switch(style){
    case 43 /* '+' */: sign_str = '+'; break;
    case 32 /* ' ' */: sign_str = ' '; break;
    default: break;
    }
  }
  if (prec >= 0 && prec < 13) {
    /* If a precision is given, and is small, round mantissa accordingly */
      var cst = Math.pow(2,prec * 4);
      x = Math.round(x * cst) / cst;
  }
  var x_str = x.toString(16);
  if(prec >= 0){
      var idx = x_str.indexOf('.');
    if(idx<0) {
      x_str += '.' +  '0'.repeat(prec);
    }
    else {
      var size = idx+1+prec;
      if(x_str.length < size)
        x_str += '0'.repeat(size - x_str.length);
      else
        x_str = x_str.substr(0,size);
    }
  }
  return  (sign_str + '0x' + x_str + 'p' + exp_sign + exp.toString(10));
});

var float_of_string = (function(s,exn){

    var res = +s;
    if ((s.length > 0) && (res === res))
        return res;
    s = s.replace(/_/g, "");
    res = +s;
    if (((s.length > 0) && (res === res)) || /^[+-]?nan$/i.test(s)) {
        return res;
    };
    var m = /^ *([+-]?)0x([0-9a-f]+)\.?([0-9a-f]*)p([+-]?[0-9]+)/i.exec(s);
    //            1        2             3           4
    if(m){
        var m3 = m[3].replace(/0+$/,'');
        var mantissa = parseInt(m[1] + m[2] + m3, 16);
        var exponent = (m[4]|0) - 4*m3.length;
        res = mantissa * Math.pow(2, exponent);
        return res;
    }
    if (/^\+?inf(inity)?$/i.test(s))
        return Infinity;
    if (/^-inf(inity)?$/i.test(s))
        return -Infinity;
    throw exn;
});

function caml_float_of_string(s) {
  return float_of_string(s, {
              RE_EXN_ID: "Failure",
              _1: "float_of_string"
            });
}

var caml_nativeint_format = caml_format_int;

var caml_int32_format = caml_format_int;

var caml_int32_of_string = caml_int_of_string;

var caml_nativeint_of_string = caml_int_of_string;

exports.caml_format_float = caml_format_float;
exports.caml_hexstring_of_float = caml_hexstring_of_float;
exports.caml_format_int = caml_format_int;
exports.caml_nativeint_format = caml_nativeint_format;
exports.caml_int32_format = caml_int32_format;
exports.caml_float_of_string = caml_float_of_string;
exports.caml_int64_format = caml_int64_format;
exports.caml_int_of_string = caml_int_of_string;
exports.caml_int32_of_string = caml_int32_of_string;
exports.caml_int64_of_string = caml_int64_of_string;
exports.caml_nativeint_of_string = caml_nativeint_of_string;
/* No side effect */

},{"./caml_int64.js":"../node_modules/bs-platform/lib/js/caml_int64.js"}],"../node_modules/bs-platform/lib/js/caml_bytes.js":[function(require,module,exports) {
'use strict';


function set(s, i, ch) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  s[i] = ch;
  
}

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return s[i];
}

function caml_fill_bytes(s, i, l, c) {
  if (l <= 0) {
    return ;
  }
  for(var k = i ,k_finish = l + i | 0; k < k_finish; ++k){
    s[k] = c;
  }
  
}

function caml_create_bytes(len) {
  if (len < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.create",
          Error: new Error()
        };
  }
  var result = new Array(len);
  for(var i = 0; i < len; ++i){
    result[i] = /* "\000" */0;
  }
  return result;
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len <= 0) {
    return ;
  }
  if (s1 === s2) {
    if (i1 < i2) {
      var range_a = (s1.length - i2 | 0) - 1 | 0;
      var range_b = len - 1 | 0;
      var range = range_a > range_b ? range_b : range_a;
      for(var j = range; j >= 0; --j){
        s1[i2 + j | 0] = s1[i1 + j | 0];
      }
      return ;
    }
    if (i1 <= i2) {
      return ;
    }
    var range_a$1 = (s1.length - i1 | 0) - 1 | 0;
    var range_b$1 = len - 1 | 0;
    var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
    for(var k = 0; k <= range$1; ++k){
      s1[i2 + k | 0] = s1[i1 + k | 0];
    }
    return ;
  }
  var off1 = s1.length - i1 | 0;
  if (len <= off1) {
    for(var i = 0; i < len; ++i){
      s2[i2 + i | 0] = s1[i1 + i | 0];
    }
    return ;
  }
  for(var i$1 = 0; i$1 < off1; ++i$1){
    s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
  }
  for(var i$2 = off1; i$2 < len; ++i$2){
    s2[i2 + i$2 | 0] = /* "\000" */0;
  }
  
}

function bytes_to_string(a) {
  var i = 0;
  var len = a.length;
  var s = "";
  var s_len = len;
  if (i === 0 && len <= 4096 && len === a.length) {
    return String.fromCharCode.apply(null, a);
  }
  var offset = 0;
  while(s_len > 0) {
    var next = s_len < 1024 ? s_len : 1024;
    var tmp_bytes = new Array(next);
    for(var k = 0; k < next; ++k){
      tmp_bytes[k] = a[k + offset | 0];
    }
    s = s + String.fromCharCode.apply(null, tmp_bytes);
    s_len = s_len - next | 0;
    offset = offset + next | 0;
  };
  return s;
}

function caml_blit_string(s1, i1, s2, i2, len) {
  if (len <= 0) {
    return ;
  }
  var off1 = s1.length - i1 | 0;
  if (len <= off1) {
    for(var i = 0; i < len; ++i){
      s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
    }
    return ;
  }
  for(var i$1 = 0; i$1 < off1; ++i$1){
    s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
  }
  for(var i$2 = off1; i$2 < len; ++i$2){
    s2[i2 + i$2 | 0] = /* "\000" */0;
  }
  
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);
  for(var i = 0; i < len; ++i){
    res[i] = s.charCodeAt(i);
  }
  return res;
}

function caml_bytes_compare_aux(s1, s2, _off, len, def) {
  while(true) {
    var off = _off;
    if (off >= len) {
      return def;
    }
    var a = s1[off];
    var b = s2[off];
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    _off = off + 1 | 0;
    continue ;
  };
}

function caml_bytes_compare(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;
  if (len1 === len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, 0);
  } else if (len1 < len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, -1);
  } else {
    return caml_bytes_compare_aux(s1, s2, 0, len2, 1);
  }
}

function caml_bytes_equal(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;
  if (len1 === len2) {
    var _off = 0;
    while(true) {
      var off = _off;
      if (off === len1) {
        return true;
      }
      var a = s1[off];
      var b = s2[off];
      if (a !== b) {
        return false;
      }
      _off = off + 1 | 0;
      continue ;
    };
  } else {
    return false;
  }
}

function caml_bytes_greaterthan(s1, s2) {
  return caml_bytes_compare(s1, s2) > 0;
}

function caml_bytes_greaterequal(s1, s2) {
  return caml_bytes_compare(s1, s2) >= 0;
}

function caml_bytes_lessthan(s1, s2) {
  return caml_bytes_compare(s1, s2) < 0;
}

function caml_bytes_lessequal(s1, s2) {
  return caml_bytes_compare(s1, s2) <= 0;
}

exports.caml_create_bytes = caml_create_bytes;
exports.caml_fill_bytes = caml_fill_bytes;
exports.get = get;
exports.set = set;
exports.bytes_to_string = bytes_to_string;
exports.caml_blit_bytes = caml_blit_bytes;
exports.caml_blit_string = caml_blit_string;
exports.bytes_of_string = bytes_of_string;
exports.caml_bytes_compare = caml_bytes_compare;
exports.caml_bytes_greaterthan = caml_bytes_greaterthan;
exports.caml_bytes_greaterequal = caml_bytes_greaterequal;
exports.caml_bytes_lessthan = caml_bytes_lessthan;
exports.caml_bytes_lessequal = caml_bytes_lessequal;
exports.caml_bytes_equal = caml_bytes_equal;
/* No side effect */

},{}],"../node_modules/bs-platform/lib/js/char.js":[function(require,module,exports) {
'use strict';

var Caml_bytes = require("./caml_bytes.js");

function chr(n) {
  if (n < 0 || n > 255) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Char.chr",
          Error: new Error()
        };
  }
  return n;
}

function escaped(c) {
  var exit = 0;
  if (c >= 40) {
    if (c === 92) {
      return "\\\\";
    }
    exit = c >= 127 ? 1 : 2;
  } else if (c >= 32) {
    if (c >= 39) {
      return "\\'";
    }
    exit = 2;
  } else if (c >= 14) {
    exit = 1;
  } else {
    switch (c) {
      case 8 :
          return "\\b";
      case 9 :
          return "\\t";
      case 10 :
          return "\\n";
      case 0 :
      case 1 :
      case 2 :
      case 3 :
      case 4 :
      case 5 :
      case 6 :
      case 7 :
      case 11 :
      case 12 :
          exit = 1;
          break;
      case 13 :
          return "\\r";
      
    }
  }
  switch (exit) {
    case 1 :
        var s = [
          0,
          0,
          0,
          0
        ];
        s[0] = /* "\\" */92;
        s[1] = 48 + (c / 100 | 0) | 0;
        s[2] = 48 + (c / 10 | 0) % 10 | 0;
        s[3] = 48 + c % 10 | 0;
        return Caml_bytes.bytes_to_string(s);
    case 2 :
        var s$1 = [0];
        s$1[0] = c;
        return Caml_bytes.bytes_to_string(s$1);
    
  }
}

function lowercase(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function uppercase(c) {
  if (c >= /* "a" */97 && c <= /* "z" */122 || c >= /* "\224" */224 && c <= /* "\246" */246 || c >= /* "\248" */248 && c <= /* "\254" */254) {
    return c - 32 | 0;
  } else {
    return c;
  }
}

function lowercase_ascii(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function uppercase_ascii(c) {
  if (c >= /* "a" */97 && c <= /* "z" */122) {
    return c - 32 | 0;
  } else {
    return c;
  }
}

function compare(c1, c2) {
  return c1 - c2 | 0;
}

function equal(c1, c2) {
  return (c1 - c2 | 0) === 0;
}

exports.chr = chr;
exports.escaped = escaped;
exports.lowercase = lowercase;
exports.uppercase = uppercase;
exports.lowercase_ascii = lowercase_ascii;
exports.uppercase_ascii = uppercase_ascii;
exports.compare = compare;
exports.equal = equal;
/* No side effect */

},{"./caml_bytes.js":"../node_modules/bs-platform/lib/js/caml_bytes.js"}],"../node_modules/bs-platform/lib/js/caml_exceptions.js":[function(require,module,exports) {
'use strict';


var id = {
  contents: 0
};

function create(str) {
  id.contents = id.contents + 1 | 0;
  return str + ("/" + id.contents);
}

function caml_is_extension(e) {
  if (e == null) {
    return false;
  } else {
    return typeof e.RE_EXN_ID === "string";
  }
}

function caml_exn_slot_name(x) {
  return x.RE_EXN_ID;
}

exports.id = id;
exports.create = create;
exports.caml_is_extension = caml_is_extension;
exports.caml_exn_slot_name = caml_exn_slot_name;
/* No side effect */

},{}],"../node_modules/bs-platform/lib/js/caml_js_exceptions.js":[function(require,module,exports) {
'use strict';

var Caml_option = require("./caml_option.js");
var Caml_exceptions = require("./caml_exceptions.js");

var $$Error = Caml_exceptions.create("Caml_js_exceptions.Error");

function internalToOCamlException(e) {
  if (Caml_exceptions.caml_is_extension(e)) {
    return e;
  } else {
    return {
            RE_EXN_ID: $$Error,
            _1: e
          };
  }
}

function caml_as_js_exn(exn) {
  if (exn.RE_EXN_ID === $$Error) {
    return Caml_option.some(exn._1);
  }
  
}

exports.$$Error = $$Error;
exports.internalToOCamlException = internalToOCamlException;
exports.caml_as_js_exn = caml_as_js_exn;
/* No side effect */

},{"./caml_option.js":"../node_modules/bs-platform/lib/js/caml_option.js","./caml_exceptions.js":"../node_modules/bs-platform/lib/js/caml_exceptions.js"}],"../node_modules/bs-platform/lib/js/bytes.js":[function(require,module,exports) {
'use strict';

var Char = require("./char.js");
var Curry = require("./curry.js");
var Caml_bytes = require("./caml_bytes.js");
var Caml_primitive = require("./caml_primitive.js");
var Caml_js_exceptions = require("./caml_js_exceptions.js");

function make(n, c) {
  var s = Caml_bytes.caml_create_bytes(n);
  Caml_bytes.caml_fill_bytes(s, 0, n, c);
  return s;
}

function init(n, f) {
  var s = Caml_bytes.caml_create_bytes(n);
  for(var i = 0; i < n; ++i){
    s[i] = Curry._1(f, i);
  }
  return s;
}

var empty = [];

function copy(s) {
  var len = s.length;
  var r = Caml_bytes.caml_create_bytes(len);
  Caml_bytes.caml_blit_bytes(s, 0, r, 0, len);
  return r;
}

function to_string(b) {
  return Caml_bytes.bytes_to_string(copy(b));
}

function of_string(s) {
  return copy(Caml_bytes.bytes_of_string(s));
}

function sub(s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.sub / Bytes.sub",
          Error: new Error()
        };
  }
  var r = Caml_bytes.caml_create_bytes(len);
  Caml_bytes.caml_blit_bytes(s, ofs, r, 0, len);
  return r;
}

function sub_string(b, ofs, len) {
  return Caml_bytes.bytes_to_string(sub(b, ofs, len));
}

function $plus$plus(a, b) {
  var c = a + b | 0;
  var match = a < 0;
  var match$1 = b < 0;
  var match$2 = c < 0;
  if (match) {
    if (!match$1) {
      return c;
    }
    if (match$2) {
      return c;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Bytes.extend",
          Error: new Error()
        };
  }
  if (match$1) {
    return c;
  }
  if (match$2) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Bytes.extend",
          Error: new Error()
        };
  }
  return c;
}

function extend(s, left, right) {
  var len = $plus$plus($plus$plus(s.length, left), right);
  var r = Caml_bytes.caml_create_bytes(len);
  var match = left < 0 ? [
      -left | 0,
      0
    ] : [
      0,
      left
    ];
  var dstoff = match[1];
  var srcoff = match[0];
  var cpylen = Caml_primitive.caml_int_min(s.length - srcoff | 0, len - dstoff | 0);
  if (cpylen > 0) {
    Caml_bytes.caml_blit_bytes(s, srcoff, r, dstoff, cpylen);
  }
  return r;
}

function fill(s, ofs, len, c) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.fill / Bytes.fill",
          Error: new Error()
        };
  }
  return Caml_bytes.caml_fill_bytes(s, ofs, len, c);
}

function blit(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Bytes.blit",
          Error: new Error()
        };
  }
  return Caml_bytes.caml_blit_bytes(s1, ofs1, s2, ofs2, len);
}

function blit_string(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.blit / Bytes.blit_string",
          Error: new Error()
        };
  }
  return Caml_bytes.caml_blit_string(s1, ofs1, s2, ofs2, len);
}

function iter(f, a) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    Curry._1(f, a[i]);
  }
  
}

function iteri(f, a) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    Curry._2(f, i, a[i]);
  }
  
}

function ensure_ge(x, y) {
  if (x >= y) {
    return x;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Bytes.concat",
        Error: new Error()
      };
}

function sum_lengths(_acc, seplen, _param) {
  while(true) {
    var param = _param;
    var acc = _acc;
    if (!param) {
      return acc;
    }
    var tl = param.tl;
    var hd = param.hd;
    if (!tl) {
      return hd.length + acc | 0;
    }
    _param = tl;
    _acc = ensure_ge((hd.length + seplen | 0) + acc | 0, acc);
    continue ;
  };
}

function concat(sep, l) {
  if (!l) {
    return empty;
  }
  var seplen = sep.length;
  var dst = Caml_bytes.caml_create_bytes(sum_lengths(0, seplen, l));
  var _pos = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var pos = _pos;
    if (!param) {
      return dst;
    }
    var tl = param.tl;
    var hd = param.hd;
    if (tl) {
      Caml_bytes.caml_blit_bytes(hd, 0, dst, pos, hd.length);
      Caml_bytes.caml_blit_bytes(sep, 0, dst, pos + hd.length | 0, seplen);
      _param = tl;
      _pos = (pos + hd.length | 0) + seplen | 0;
      continue ;
    }
    Caml_bytes.caml_blit_bytes(hd, 0, dst, pos, hd.length);
    return dst;
  };
}

function cat(s1, s2) {
  var l1 = s1.length;
  var l2 = s2.length;
  var r = Caml_bytes.caml_create_bytes(l1 + l2 | 0);
  Caml_bytes.caml_blit_bytes(s1, 0, r, 0, l1);
  Caml_bytes.caml_blit_bytes(s2, 0, r, l1, l2);
  return r;
}

function is_space(param) {
  var switcher = param - 9 | 0;
  if (switcher > 4 || switcher < 0) {
    return switcher === 23;
  } else {
    return switcher !== 2;
  }
}

function trim(s) {
  var len = s.length;
  var i = 0;
  while(i < len && is_space(s[i])) {
    i = i + 1 | 0;
  };
  var j = len - 1 | 0;
  while(j >= i && is_space(s[j])) {
    j = j - 1 | 0;
  };
  if (j >= i) {
    return sub(s, i, (j - i | 0) + 1 | 0);
  } else {
    return empty;
  }
}

function escaped(s) {
  var n = 0;
  for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
    var match = s[i];
    var tmp;
    if (match >= 32) {
      var switcher = match - 34 | 0;
      tmp = switcher > 58 || switcher < 0 ? (
          switcher >= 93 ? 4 : 1
        ) : (
          switcher > 57 || switcher < 1 ? 2 : 1
        );
    } else {
      tmp = match >= 11 ? (
          match !== 13 ? 4 : 2
        ) : (
          match >= 8 ? 2 : 4
        );
    }
    n = n + tmp | 0;
  }
  if (n === s.length) {
    return copy(s);
  }
  var s$prime = Caml_bytes.caml_create_bytes(n);
  n = 0;
  for(var i$1 = 0 ,i_finish$1 = s.length; i$1 < i_finish$1; ++i$1){
    var c = s[i$1];
    var exit = 0;
    if (c >= 35) {
      if (c !== 92) {
        if (c >= 127) {
          exit = 1;
        } else {
          s$prime[n] = c;
        }
      } else {
        exit = 2;
      }
    } else if (c >= 32) {
      if (c >= 34) {
        exit = 2;
      } else {
        s$prime[n] = c;
      }
    } else if (c >= 14) {
      exit = 1;
    } else {
      switch (c) {
        case 8 :
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = /* "b" */98;
            break;
        case 9 :
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = /* "t" */116;
            break;
        case 10 :
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = /* "n" */110;
            break;
        case 0 :
        case 1 :
        case 2 :
        case 3 :
        case 4 :
        case 5 :
        case 6 :
        case 7 :
        case 11 :
        case 12 :
            exit = 1;
            break;
        case 13 :
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = /* "r" */114;
            break;
        
      }
    }
    switch (exit) {
      case 1 :
          s$prime[n] = /* "\\" */92;
          n = n + 1 | 0;
          s$prime[n] = 48 + (c / 100 | 0) | 0;
          n = n + 1 | 0;
          s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
          n = n + 1 | 0;
          s$prime[n] = 48 + c % 10 | 0;
          break;
      case 2 :
          s$prime[n] = /* "\\" */92;
          n = n + 1 | 0;
          s$prime[n] = c;
          break;
      
    }
    n = n + 1 | 0;
  }
  return s$prime;
}

function map(f, s) {
  var l = s.length;
  if (l === 0) {
    return s;
  }
  var r = Caml_bytes.caml_create_bytes(l);
  for(var i = 0; i < l; ++i){
    r[i] = Curry._1(f, s[i]);
  }
  return r;
}

function mapi(f, s) {
  var l = s.length;
  if (l === 0) {
    return s;
  }
  var r = Caml_bytes.caml_create_bytes(l);
  for(var i = 0; i < l; ++i){
    r[i] = Curry._2(f, i, s[i]);
  }
  return r;
}

function uppercase_ascii(s) {
  return map(Char.uppercase_ascii, s);
}

function lowercase_ascii(s) {
  return map(Char.lowercase_ascii, s);
}

function apply1(f, s) {
  if (s.length === 0) {
    return s;
  }
  var r = copy(s);
  r[0] = Curry._1(f, s[0]);
  return r;
}

function capitalize_ascii(s) {
  return apply1(Char.uppercase_ascii, s);
}

function uncapitalize_ascii(s) {
  return apply1(Char.lowercase_ascii, s);
}

function index_rec(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    if (s[i] === c) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function index(s, c) {
  return index_rec(s, s.length, 0, c);
}

function index_rec_opt(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      return ;
    }
    if (s[i] === c) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function index_opt(s, c) {
  return index_rec_opt(s, s.length, 0, c);
}

function index_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.index_from / Bytes.index_from",
          Error: new Error()
        };
  }
  return index_rec(s, l, i, c);
}

function index_from_opt(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.index_from_opt / Bytes.index_from_opt",
          Error: new Error()
        };
  }
  return index_rec_opt(s, l, i, c);
}

function rindex_rec(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    if (s[i] === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}

function rindex_from(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rindex_from / Bytes.rindex_from",
          Error: new Error()
        };
  }
  return rindex_rec(s, i, c);
}

function rindex_rec_opt(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      return ;
    }
    if (s[i] === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex_opt(s, c) {
  return rindex_rec_opt(s, s.length - 1 | 0, c);
}

function rindex_from_opt(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rindex_from_opt / Bytes.rindex_from_opt",
          Error: new Error()
        };
  }
  return rindex_rec_opt(s, i, c);
}

function contains_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.contains_from / Bytes.contains_from",
          Error: new Error()
        };
  }
  try {
    index_rec(s, l, i, c);
    return true;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return false;
    }
    throw exn;
  }
}

function contains(s, c) {
  return contains_from(s, 0, c);
}

function rcontains_from(s, i, c) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rcontains_from / Bytes.rcontains_from",
          Error: new Error()
        };
  }
  try {
    rindex_rec(s, i, c);
    return true;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return false;
    }
    throw exn;
  }
}

var compare = Caml_bytes.caml_bytes_compare;

function uppercase(s) {
  return map(Char.uppercase, s);
}

function lowercase(s) {
  return map(Char.lowercase, s);
}

function capitalize(s) {
  return apply1(Char.uppercase, s);
}

function uncapitalize(s) {
  return apply1(Char.lowercase, s);
}

var equal = Caml_bytes.caml_bytes_equal;

var unsafe_to_string = Caml_bytes.bytes_to_string;

var unsafe_of_string = Caml_bytes.bytes_of_string;

exports.make = make;
exports.init = init;
exports.empty = empty;
exports.copy = copy;
exports.of_string = of_string;
exports.to_string = to_string;
exports.sub = sub;
exports.sub_string = sub_string;
exports.extend = extend;
exports.fill = fill;
exports.blit = blit;
exports.blit_string = blit_string;
exports.concat = concat;
exports.cat = cat;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi;
exports.trim = trim;
exports.escaped = escaped;
exports.index = index;
exports.index_opt = index_opt;
exports.rindex = rindex;
exports.rindex_opt = rindex_opt;
exports.index_from = index_from;
exports.index_from_opt = index_from_opt;
exports.rindex_from = rindex_from;
exports.rindex_from_opt = rindex_from_opt;
exports.contains = contains;
exports.contains_from = contains_from;
exports.rcontains_from = rcontains_from;
exports.uppercase = uppercase;
exports.lowercase = lowercase;
exports.capitalize = capitalize;
exports.uncapitalize = uncapitalize;
exports.uppercase_ascii = uppercase_ascii;
exports.lowercase_ascii = lowercase_ascii;
exports.capitalize_ascii = capitalize_ascii;
exports.uncapitalize_ascii = uncapitalize_ascii;
exports.compare = compare;
exports.equal = equal;
exports.unsafe_to_string = unsafe_to_string;
exports.unsafe_of_string = unsafe_of_string;
/* No side effect */

},{"./char.js":"../node_modules/bs-platform/lib/js/char.js","./curry.js":"../node_modules/bs-platform/lib/js/curry.js","./caml_bytes.js":"../node_modules/bs-platform/lib/js/caml_bytes.js","./caml_primitive.js":"../node_modules/bs-platform/lib/js/caml_primitive.js","./caml_js_exceptions.js":"../node_modules/bs-platform/lib/js/caml_js_exceptions.js"}],"../node_modules/bs-platform/lib/js/caml_string.js":[function(require,module,exports) {
'use strict';


function get(s, i) {
  if (i >= s.length || i < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return s.charCodeAt(i);
}

function make(n, ch) {
  return String.fromCharCode(ch).repeat(n);
}

exports.get = get;
exports.make = make;
/* No side effect */

},{}],"../node_modules/bs-platform/lib/js/string.js":[function(require,module,exports) {
'use strict';

var Bytes = require("./bytes.js");
var Curry = require("./curry.js");
var Caml_bytes = require("./caml_bytes.js");
var Caml_string = require("./caml_string.js");
var Caml_primitive = require("./caml_primitive.js");
var Caml_js_exceptions = require("./caml_js_exceptions.js");

function init(n, f) {
  return Caml_bytes.bytes_to_string(Bytes.init(n, f));
}

function copy(s) {
  return Caml_bytes.bytes_to_string(Bytes.copy(Caml_bytes.bytes_of_string(s)));
}

function sub(s, ofs, len) {
  return Caml_bytes.bytes_to_string(Bytes.sub(Caml_bytes.bytes_of_string(s), ofs, len));
}

function ensure_ge(x, y) {
  if (x >= y) {
    return x;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "String.concat",
        Error: new Error()
      };
}

function sum_lengths(_acc, seplen, _param) {
  while(true) {
    var param = _param;
    var acc = _acc;
    if (!param) {
      return acc;
    }
    var tl = param.tl;
    var hd = param.hd;
    if (!tl) {
      return hd.length + acc | 0;
    }
    _param = tl;
    _acc = ensure_ge((hd.length + seplen | 0) + acc | 0, acc);
    continue ;
  };
}

function unsafe_blits(dst, _pos, sep, seplen, _param) {
  while(true) {
    var param = _param;
    var pos = _pos;
    if (!param) {
      return dst;
    }
    var tl = param.tl;
    var hd = param.hd;
    if (tl) {
      Caml_bytes.caml_blit_string(hd, 0, dst, pos, hd.length);
      Caml_bytes.caml_blit_string(sep, 0, dst, pos + hd.length | 0, seplen);
      _param = tl;
      _pos = (pos + hd.length | 0) + seplen | 0;
      continue ;
    }
    Caml_bytes.caml_blit_string(hd, 0, dst, pos, hd.length);
    return dst;
  };
}

function concat(sep, l) {
  if (!l) {
    return "";
  }
  var seplen = sep.length;
  return Caml_bytes.bytes_to_string(unsafe_blits(Caml_bytes.caml_create_bytes(sum_lengths(0, seplen, l)), 0, sep, seplen, l));
}

function iter(f, s) {
  for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
    Curry._1(f, s.charCodeAt(i));
  }
  
}

function iteri(f, s) {
  for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
    Curry._2(f, i, s.charCodeAt(i));
  }
  
}

function map(f, s) {
  return Caml_bytes.bytes_to_string(Bytes.map(f, Caml_bytes.bytes_of_string(s)));
}

function mapi(f, s) {
  return Caml_bytes.bytes_to_string(Bytes.mapi(f, Caml_bytes.bytes_of_string(s)));
}

function is_space(param) {
  var switcher = param - 9 | 0;
  if (switcher > 4 || switcher < 0) {
    return switcher === 23;
  } else {
    return switcher !== 2;
  }
}

function trim(s) {
  if (s === "" || !(is_space(s.charCodeAt(0)) || is_space(s.charCodeAt(s.length - 1 | 0)))) {
    return s;
  } else {
    return Caml_bytes.bytes_to_string(Bytes.trim(Caml_bytes.bytes_of_string(s)));
  }
}

function escaped(s) {
  var needs_escape = function (_i) {
    while(true) {
      var i = _i;
      if (i >= s.length) {
        return false;
      }
      var match = s.charCodeAt(i);
      if (match < 32) {
        return true;
      }
      var switcher = match - 34 | 0;
      if (switcher > 58 || switcher < 0) {
        if (switcher >= 93) {
          return true;
        }
        _i = i + 1 | 0;
        continue ;
      }
      if (switcher > 57 || switcher < 1) {
        return true;
      }
      _i = i + 1 | 0;
      continue ;
    };
  };
  if (needs_escape(0)) {
    return Caml_bytes.bytes_to_string(Bytes.escaped(Caml_bytes.bytes_of_string(s)));
  } else {
    return s;
  }
}

function index_rec(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function index(s, c) {
  return index_rec(s, s.length, 0, c);
}

function index_rec_opt(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      return ;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function index_opt(s, c) {
  return index_rec_opt(s, s.length, 0, c);
}

function index_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.index_from / Bytes.index_from",
          Error: new Error()
        };
  }
  return index_rec(s, l, i, c);
}

function index_from_opt(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.index_from_opt / Bytes.index_from_opt",
          Error: new Error()
        };
  }
  return index_rec_opt(s, l, i, c);
}

function rindex_rec(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}

function rindex_from(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rindex_from / Bytes.rindex_from",
          Error: new Error()
        };
  }
  return rindex_rec(s, i, c);
}

function rindex_rec_opt(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      return ;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex_opt(s, c) {
  return rindex_rec_opt(s, s.length - 1 | 0, c);
}

function rindex_from_opt(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rindex_from_opt / Bytes.rindex_from_opt",
          Error: new Error()
        };
  }
  return rindex_rec_opt(s, i, c);
}

function contains_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.contains_from / Bytes.contains_from",
          Error: new Error()
        };
  }
  try {
    index_rec(s, l, i, c);
    return true;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return false;
    }
    throw exn;
  }
}

function contains(s, c) {
  return contains_from(s, 0, c);
}

function rcontains_from(s, i, c) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rcontains_from / Bytes.rcontains_from",
          Error: new Error()
        };
  }
  try {
    rindex_rec(s, i, c);
    return true;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return false;
    }
    throw exn;
  }
}

function uppercase_ascii(s) {
  return Caml_bytes.bytes_to_string(Bytes.uppercase_ascii(Caml_bytes.bytes_of_string(s)));
}

function lowercase_ascii(s) {
  return Caml_bytes.bytes_to_string(Bytes.lowercase_ascii(Caml_bytes.bytes_of_string(s)));
}

function capitalize_ascii(s) {
  return Caml_bytes.bytes_to_string(Bytes.capitalize_ascii(Caml_bytes.bytes_of_string(s)));
}

function uncapitalize_ascii(s) {
  return Caml_bytes.bytes_to_string(Bytes.uncapitalize_ascii(Caml_bytes.bytes_of_string(s)));
}

var compare = Caml_primitive.caml_string_compare;

function split_on_char(sep, s) {
  var r = /* [] */0;
  var j = s.length;
  for(var i = s.length - 1 | 0; i >= 0; --i){
    if (s.charCodeAt(i) === sep) {
      r = {
        hd: sub(s, i + 1 | 0, (j - i | 0) - 1 | 0),
        tl: r
      };
      j = i;
    }
    
  }
  return {
          hd: sub(s, 0, j),
          tl: r
        };
}

function uppercase(s) {
  return Caml_bytes.bytes_to_string(Bytes.uppercase(Caml_bytes.bytes_of_string(s)));
}

function lowercase(s) {
  return Caml_bytes.bytes_to_string(Bytes.lowercase(Caml_bytes.bytes_of_string(s)));
}

function capitalize(s) {
  return Caml_bytes.bytes_to_string(Bytes.capitalize(Caml_bytes.bytes_of_string(s)));
}

function uncapitalize(s) {
  return Caml_bytes.bytes_to_string(Bytes.uncapitalize(Caml_bytes.bytes_of_string(s)));
}

var make = Caml_string.make;

var fill = Bytes.fill;

var blit = Bytes.blit_string;

function equal(prim, prim$1) {
  return prim === prim$1;
}

exports.make = make;
exports.init = init;
exports.copy = copy;
exports.sub = sub;
exports.fill = fill;
exports.blit = blit;
exports.concat = concat;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi;
exports.trim = trim;
exports.escaped = escaped;
exports.index = index;
exports.index_opt = index_opt;
exports.rindex = rindex;
exports.rindex_opt = rindex_opt;
exports.index_from = index_from;
exports.index_from_opt = index_from_opt;
exports.rindex_from = rindex_from;
exports.rindex_from_opt = rindex_from_opt;
exports.contains = contains;
exports.contains_from = contains_from;
exports.rcontains_from = rcontains_from;
exports.uppercase = uppercase;
exports.lowercase = lowercase;
exports.capitalize = capitalize;
exports.uncapitalize = uncapitalize;
exports.uppercase_ascii = uppercase_ascii;
exports.lowercase_ascii = lowercase_ascii;
exports.capitalize_ascii = capitalize_ascii;
exports.uncapitalize_ascii = uncapitalize_ascii;
exports.compare = compare;
exports.equal = equal;
exports.split_on_char = split_on_char;
/* No side effect */

},{"./bytes.js":"../node_modules/bs-platform/lib/js/bytes.js","./curry.js":"../node_modules/bs-platform/lib/js/curry.js","./caml_bytes.js":"../node_modules/bs-platform/lib/js/caml_bytes.js","./caml_string.js":"../node_modules/bs-platform/lib/js/caml_string.js","./caml_primitive.js":"../node_modules/bs-platform/lib/js/caml_primitive.js","./caml_js_exceptions.js":"../node_modules/bs-platform/lib/js/caml_js_exceptions.js"}],"ShirtSize.bs.js":[function(require,module,exports) {
// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var $$String = require("bs-platform/lib/js/string.js");

function price(size) {
  if (typeof size !== "number") {
    return 16.00 + (size._0 - 1 | 0) * 0.50;
  }

  switch (size) {
    case
    /* Small */
    0:
      return 11.00;

    case
    /* Medium */
    1:
      return 12.50;

    case
    /* Large */
    2:
      return 14.00;
  }
}

function toString(size) {
  if (typeof size !== "number") {
    return $$String.make(size._0,
    /* "X" */
    88) + "L";
  }

  switch (size) {
    case
    /* Small */
    0:
      return "S";

    case
    /* Medium */
    1:
      return "M";

    case
    /* Large */
    2:
      return "L";
  }
}

function fromString(str) {
  switch (str) {
    case "L":
      return (
        /* Large */
        2
      );

    case "M":
      return (
        /* Medium */
        1
      );

    case "S":
      return (
        /* Small */
        0
      );

    case "XL":
      return (
        /* XLarge */
        {
          _0: 1
        }
      );

    case "XXL":
      return (
        /* XLarge */
        {
          _0: 2
        }
      );

    case "XXXL":
      return (
        /* XLarge */
        {
          _0: 3
        }
      );

    case "XXXXL":
      return (
        /* XLarge */
        {
          _0: 4
        }
      );

    default:
      return;
  }
}

function toFixed(prim, prim$1) {
  return prim.toFixed(prim$1);
}

exports.price = price;
exports.toString = toString;
exports.fromString = fromString;
exports.toFixed = toFixed;
/* No side effect */
},{"bs-platform/lib/js/string.js":"../node_modules/bs-platform/lib/js/string.js"}],"OrderPage.bs.js":[function(require,module,exports) {
// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

var Caml_array = require("bs-platform/lib/js/caml_array.js");

var Belt_Option = require("bs-platform/lib/js/belt_Option.js");

var Caml_format = require("bs-platform/lib/js/caml_format.js");

var Caml_option = require("bs-platform/lib/js/caml_option.js");

var ShirtSize$Chapter5 = require("./ShirtSize.bs.js");

function commaSplit(s) {
  var pattern = /\s*,\s*/;

  var __x = s.split(pattern);

  return Belt_Array.map(__x, function (__x) {
    return Belt_Option.getWithDefault(__x, "");
  });
}

function orderFromCaptures(optCaptures, input) {
  if (optCaptures === undefined) {
    return {
      TAG:
      /* Error */
      1,
      _0: input
    };
  }

  var size = ShirtSize$Chapter5.fromString(Caml_array.get(optCaptures, 2));

  if (size !== undefined) {
    return {
      TAG:
      /* Ok */
      0,
      _0: [Caml_format.caml_int_of_string(Caml_array.get(optCaptures, 1)), size]
    };
  } else {
    return {
      TAG:
      /* Error */
      1,
      _0: input
    };
  }
}

function toOrder(input) {
  var pattern = /(\d{1,4})\s*@?\s*(S|M|X{0,4}L)/;
  return orderFromCaptures(Caml_option.null_to_opt(input.toUpperCase().match(pattern)), input);
}

function calculateTotalShirts(orders) {
  var adder = function adder(accumulator, resOrder) {
    if (resOrder.TAG) {
      return accumulator;
    } else {
      return accumulator + resOrder._0[0] | 0;
    }
  };

  return Belt_Array.reduce(orders, 0, adder);
}

var str = "3M, 5 @ S, 7 BAD, 9 XXL";
var nShirts = calculateTotalShirts(Belt_Array.map(commaSplit(str), toOrder));
console.log(nShirts);

function orderPrice(param) {
  return param[0] * ShirtSize$Chapter5.price(param[1]);
}

function addOrderTotal(current, orderResult) {
  if (orderResult.TAG) {
    return current;
  }

  var order = orderResult._0;
  return [current[0] + order[0] | 0, current[1] + orderPrice(order)];
}

function calculateTotals(orders) {
  return Belt_Array.reduce(orders, [0, 0.0], addOrderTotal);
}

function createRow(anOrder) {
  if (anOrder.TAG) {
    return "<tr><td colspan=\"3\"> Bad input " + anOrder._0 + "</td></tr>\n";
  }

  var match = anOrder._0;
  var size = match[1];
  var n = match[0];
  var totalPrice = orderPrice([n, size]).toFixed(2);
  var sizeStr = ShirtSize$Chapter5.toString(size);
  return "\n        <tr>\n            <td class=\"right\">" + n + "</td>\n            <td class=\"center\"> " + sizeStr + "</td>\n            <td class=\"right>\$" + totalPrice + "</td>\n        </tr>\n\n    ";
}

function createTable(orderArray) {
  var tableBody = Belt_Array.reduce(orderArray, "", function (accumulator, item) {
    return accumulator + createRow(item);
  });
  return "\n    <table>\n        <thead>\n            <tr><th>Quantity</th><th>Size</th><th>Price</th>\n        </thead>\n        <tbody>\n            " + (tableBody + "\n        </tbody>\n    </table>\n  ");
}

function getValue(element) {
  var __x = Belt_Option.map(element, function (prim) {
    return prim;
  });

  return Belt_Option.map(__x, function (prim) {
    return prim.value;
  });
}

function setInnerHTML(id, htmlString) {
  var __x = document.getElementById(id);

  return Belt_Option.map(__x == null ? undefined : Caml_option.some(__x), function (__x) {
    __x.innerHTML = htmlString;
  });
}

function setInnerText(id, textString) {
  var __x = document.getElementById(id);

  return Belt_Option.map(__x == null ? undefined : Caml_option.some(__x), function (__x) {
    __x.innerText = textString;
  });
}

function calculate(param) {
  var str = getValue(Caml_option.nullable_to_opt(document.getElementById("orders")));

  if (str === undefined) {
    return;
  }

  var __x = commaSplit(str);

  var orderArray = Belt_Array.map(Belt_Array.keep(__x, function (item) {
    return item !== "";
  }), toOrder);
  var match = calculateTotals(orderArray);
  var priceString = match[1].toFixed(2);
  setInnerHTML("table", createTable(orderArray));
  setInnerText("totalShirts", String(match[0]));
  setInnerText("totalPrice", priceString);
}

var calcButton = document.getElementById("calculate");

if (!(calcButton == null)) {
  calcButton.addEventListener("click", calculate);
}

var D;
var Doc;
var Elem;
var calcButton$1 = calcButton == null ? undefined : Caml_option.some(calcButton);
exports.commaSplit = commaSplit;
exports.orderFromCaptures = orderFromCaptures;
exports.toOrder = toOrder;
exports.calculateTotalShirts = calculateTotalShirts;
exports.str = str;
exports.nShirts = nShirts;
exports.orderPrice = orderPrice;
exports.addOrderTotal = addOrderTotal;
exports.calculateTotals = calculateTotals;
exports.createRow = createRow;
exports.createTable = createTable;
exports.D = D;
exports.Doc = Doc;
exports.Elem = Elem;
exports.getValue = getValue;
exports.setInnerHTML = setInnerHTML;
exports.setInnerText = setInnerText;
exports.calculate = calculate;
exports.calcButton = calcButton$1;
/* nShirts Not a pure module */
},{"bs-platform/lib/js/belt_Array.js":"../node_modules/bs-platform/lib/js/belt_Array.js","bs-platform/lib/js/caml_array.js":"../node_modules/bs-platform/lib/js/caml_array.js","bs-platform/lib/js/belt_Option.js":"../node_modules/bs-platform/lib/js/belt_Option.js","bs-platform/lib/js/caml_format.js":"../node_modules/bs-platform/lib/js/caml_format.js","bs-platform/lib/js/caml_option.js":"../node_modules/bs-platform/lib/js/caml_option.js","./ShirtSize.bs.js":"ShirtSize.bs.js"}],"../../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51198" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","OrderPage.bs.js"], null)
//# sourceMappingURL=/OrderPage.bs.0004abc4.js.map