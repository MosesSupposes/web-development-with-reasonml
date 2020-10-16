// DIsplay the innards of a aa list...

let intReducer = (accumulator: string, item: int) => {
  accumulator ++ string_of_int(item) ++ ", ";
};

let stringOfIntList = (items: list(int)): string => {
  "[" ++ Belt.List.reduce(items, "", intReducer) ++ "]";
};

let items = [10, 11, 12, 13, 14, 15];
Js.log(stringOfIntList(items));

// Doing the same operation as aboce, but with a list of floats
let floatReducer = (accumulator: string, item: float) => {
  accumulator ++ Js.Float.toString(item) ++ ", ";
};

let stringOfFloatList = (items: list(float)): string => {
  "[" ++ Belt.List.reduce(items, "", floatReducer) ++ "]";
};

let floatItems = [3.6, 7.9, 8.25, 41.0];
Js.log(stringOfFloatList(floatItems));

/* There's a problem brewing here: we're going to need a different display and reducer function for every different data type. This, again, is far from ideala. Instead, we'd like to use a parametric data type. In addition to passing the list, we'll also need to pass in a function that tells us how to convert the elements in that list to a string*/

let displayList = (items: list('a), stringify: 'a => string): string => {
  let elementReducer = (accumulator: string, item: 'a) => {
    accumulator ++ stringify(item) ++ ", ";
  };
  "[" ++ Belt.List.reduce(items, "", elementReducer) ++ "]";
};

Js.log(displayList(items, string_of_int));
Js.log(displayList(floatItems, Js.Float.toString));
