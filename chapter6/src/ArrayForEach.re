let head = (array: array('a)): option('a) => {
  switch (array) {
  | [||] => None
  | _ => Some(array[0])
  };
};
let tail = (array: array('a)): array('a) => {
  Belt.Array.slice(array, ~offset=1, ~len=Belt.Array.size(array) - 1);
};

let rec forEachArr = (cb: 'a => 'b, array: array('a)): unit => {
  switch (array) {
  | [||] => ()
  | array when Belt.Array.size(array) > 0 =>
    // We can safely destructure the option into `Some(value)` because the guard guarantees that we're dealing with an array of at least one value.
    let Some(value) = head(array);
    cb(value);
    forEachArr(cb, tail(array));
  };
};

let arr = [|1, 2, 3, 4, 5|];
Js.log(forEachArr(Js.log, arr));
