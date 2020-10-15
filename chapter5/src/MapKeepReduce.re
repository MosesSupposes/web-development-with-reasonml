let orderList: list((int, ShirtSize.t)) = [
  (7, ShirtSize.Medium),
  (5, ShirtSize.XLarge(3)),
  (4, ShirtSize.Small),
  (6, ShirtSize.Large),
  (8, ShirtSize.Small),
  (2, ShirtSize.Large),
  (9, ShirtSize.Medium),
  (3, ShirtSize.XLarge(2)),
];

let onePrice = ((qty: int, size: ShirtSize.t)): float => {
  float_of_int(qty) *. ShirtSize.price(size);
};

let priceList: list(float) = Belt.List.map(orderList, onePrice);

let isMedium = ((_, size)) => {
  size === ShirtSize.Medium;
};

let mediums: list((int, ShirtSize.t)) = Belt.List.keep(orderList, isMedium);

let addPriceLogged = (runningTotal, orderItem) => {
  let price = onePrice(orderItem);
  runningTotal +. price;
};

let totalPrice = Belt.List.reduce(orderList, 0.0, addPriceLogged);
Js.log({j|Total price: $totalPrice|j});

// Here's another way of writing the above code
let addPriceToTotal = (runningTotal, price) => runningTotal +. price;
let totalPrice2 =
  Belt.List.map(orderList, onePrice)
  |> Belt.List.reduce(_, 0.0, (runningTotal, price) => runningTotal +. price);
Js.log({j|Total price: $totalPrice2|j});

let mediumTotal =
  Belt.List.keep(orderList, isMedium)
  ->Belt.List.map(onePrice)
  ->Belt.List.reduce(0.0, addPriceToTotal);
