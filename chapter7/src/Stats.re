module ColorComparator =
  Belt.Id.MakeComparable({
    type t = Shirts.Color.t;
    let cmp = compare;
  });

type colorMapType = Belt.Map.t(Shirts.Color.t, int, ColorComparator.identity);

let colorReducer =
    (accumulatedMap: colorMapType, item: Shirts.order): colorMapType => {
  let n = Belt.Map.getWithDefault(accumulatedMap, item.color, 0);
  Belt.Map.set(accumulatedMap, item.color, n + item.quantity);
};

let printStatistics = (orders: list(Shirts.order)): unit => {
  let colorDistribution =
    Belt.List.reduce(
      orders,
      Belt.Map.make(~id=(module ColorComparator)),
      colorReducer,
    );
  Js.log2("Color", "Quantity");
  Belt.Map.forEach(colorDistribution, (key, value) =>
    Js.log2(Shirts.Color.toString(key), value)
  );
};

let map2 = (optX: option('a), optY: option('b), f: 'c => 'd) => {
  switch (optX, optY) {
  | (Some(x), Some(y)) => Some(f(x, y))
  | (_, _) => None
  };
};

let lineReducer =
    (acc: list(Shirts.order), line: string): list(Shirts.order) => {
  let items = Js.String.split(",", line);
  if (Belt.Array.length(items) != 7) {
    acc;
  } else {
    open Shirts;
    let initial =
      Some({
        quantity: 0,
        size: Small,
        sleeve: Short,
        color: White,
        pattern: Solid,
        cuff: Button,
        collar: Straight,
      });

    let orderRecord =
      map2(initial, optInt(items[0]), (result, n) =>
        {...result, quantity: n}
      )
      ->map2(Size.fromString(items[1]), (result, sz) =>
          {...result, size: sz}
        )
      ->map2(Color.fromString(items[2]), (result, c) =>
          {...result, color: c}
        )
      ->map2(Pattern.fromString(items[3]), (result, pat) =>
          {...result, pattern: pat}
        )
      ->map2(Collar.fromString(items[4]), (result, coll) =>
          {...result, collar: coll}
        )
      ->map2(Sleeve.fromString(items[5]), (result, sleeve) =>
          {...result, sleeve}
        )
      ->map2(Cuff.fromString(items[6]), (result, cuff) =>
          {...result, cuff}
        );

    switch (orderRecord) {
    | Some(result) => [result, ...acc]
    | None => acc
    };
  };
};

let processFile = (inFileName: string) => {
  let fileContents = Node.Fs.readFileAsUtf8Sync(inFileName);
  let lines =
    Js.String.split("\n", fileContents) |> Belt.Array.sliceToEnd(_, 1); // get rid of header line

  let orders = Belt.Array.reduce(lines, [], lineReducer);

  printStatistics(orders);
};

let nodeArg = Belt.Array.get(Node.Process.argv, 0);
let progArg = Belt.Array.get(Node.Process.argv, 1);
let fileArg = Belt.Array.get(Node.Process.argv, 2);

switch (nodeArg, progArg, fileArg) {
| (_, _, Some(inFileName)) => processFile(inFileName)
| (Some(node), Some(prog), _) =>
  Js.log("Usage: " ++ node ++ " " ++ prog ++ " inputfile.csv")
| (_, _, _) =>
  Js.log("How did you get here without NodeJS or aa program to run?")
};
