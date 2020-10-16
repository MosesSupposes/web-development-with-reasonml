let items = [|10, 11, 12, 13, 14, 15, 16|];

// The `Array` counterpart to `Belt.List.take`
let arrayTake = (amount: int, array: array('a)): array('a) => {
  Belt.Array.slice(array, ~offset=0, ~len=amount);
};
Js.log(arrayTake(3, items)); // [10, 11, 12]

// The `Array` counterpart to `Belt.List.drop`
let arrayDrop = (amount: int, array: array('a)): array('a) => {
  Belt.Array.slice(array, ~offset=amount, ~len=Array.length(array) - 1);
};
Js.log(arrayDrop(3, items)); // [13, 14, 15, 16]

let arraySplitAt = (index: int, array: array('a)): (array('a), array('a)) => {
  let firstHalf = Belt.Array.slice(array, ~offset=0, ~len=index);

  let secondHalf =
    Belt.Array.slice(
      array,
      ~offset=index,
      ~len=Belt.Array.length(array) - 1,
    );
  (firstHalf, secondHalf);
};

Js.log(arraySplitAt(3, items)); // ([10, 11, 12], [13, 14, 15, 16])
