//  Gives the first elements of the list that satisfy the predicate, stopping when it encounters an element that doesn’t fit.
let takeWhile = (predicate: 'a => bool, list: list('a)): list('a) => {
  let rec helper = (accumulator: list('a), list: list('a)): list('a) => {
    switch (list) {
    | [] => accumulator
    | [x, ...xs] =>
      if (predicate(x)) {
        helper(Belt.List.concat(accumulator, [x]), xs);
      } else {
        accumulator;
      }
    };
  };
  helper([], list);
};

// Here's another way to define the takeWhile function
let takeWhile = (predicate: 'a => bool, list: list('a)): list('a) => {
  let rec helper = (accumulator: list('a), list: list('a)): list('a) => {
    switch (list) {
    | [] => accumulator
    | [x, ...xs] when predicate(x) =>
      helper(Belt.List.concat(accumulator, [x]), xs)
    | [x, ...xs] when !predicate(x) => accumulator
    | _ => accumulator
    };
  };
  helper([], list);
};

// Returns everything except the first elements of the list that satisfy the predicate.
let rec dropWhile: ('a => bool, list('a)) => list('a) =
  (predicate, list) => {
    switch (list) {
    | [] => list
    | [x, ...xs] when predicate(x) => dropWhile(predicate, xs)
    | [x, ...xs] when !predicate(x) => [x] @ xs
    | _ => list
    };
  };

let data = [2, 6, 42, 5, 7, 20, 3];
let isEven = n => n mod 2 == 0;

takeWhile(isEven, data)
|> DisplayList.stringOfList(_, string_of_int)
|> Js.log; // [2, 6, 42]

dropWhile(isEven, data)
|> DisplayList.stringOfList(_, string_of_int)
|> Js.log; // [5, 7, 20, 3]
