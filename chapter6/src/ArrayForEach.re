let rec forEachArr = (cb: 'a => 'b, array: array('a)): unit => {
  switch (array) {
  | [||] => ()
  | array when Belt.Array.size(array) > 0 =>
    cb(array[0]);
    forEachArr(
      cb,
      Belt.Array.slice(array, ~offset=1, ~len=Belt.Array.size(array) - 1),
    );
  };
};

let arr = [|1, 2, 3, 4, 5|];
Js.log(forEachArr(Js.log, arr));
