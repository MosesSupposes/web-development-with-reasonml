let items = [10, 11, 12, 13, 14, 15, 16];

let sqrtPlusOne = x => {
  sqrt(float_of_int(x) +. 1.0);
};
let roots = Belt.List.makeBy(5, sqrtPlusOne);

// adds 9 to the beginning of the list
let added1 = Belt.List.add(items, 9);
let added2 = [9, ...items];

let more = [17, 18, 19];
let joined = Belt.List.concat(items, more); // [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

let taken3 = Belt.List.take(items, 3); // Some([10, 11, 12])
let dropped3 = Belt.List.drop(items, 3);
// Some([13,14, 15, 16]
let badTake = Belt.List.take(items, 10); // None;

let result = Belt.List.splitAt(items, 3);
switch (result) {
| Some((firstPart, lastPart)) =>
  Js.log(firstPart); // [10,11,12]
  Js.log(lastPart); // [13, 14, 15, 16]
| None => Js.log("None")
};

let optElement = Belt.List.get(items, 3) /* Some(13*/;
let badOptElement = Belt.List.get(items, 10); // None
let element = Belt.List.getExn(items, 3); // 13
let badElement =
  try(Belt.List.getExn(items, 10)) {
  | Js.Exn.Error(e) =>
    switch (Js.Exn.message(e)) {
    | Some(message) => Js.log({|Error: $message|}) // Error: getExn
    | None => Js.log("An unkown error occurred")
    };
    (-1);
  };
