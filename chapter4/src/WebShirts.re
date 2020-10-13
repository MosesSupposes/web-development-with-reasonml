module D = Webapi.Dom;
module Doc = Webapi.Dom.Document;
module Elem = Webapi.Dom.Element;

let calcButton = Doc.getElementById("calculate", D.document);

let calculate = (_: Dom.event): unit => {
  Js.log("You clicked me!");

  let getValue = (element: option(Elem.t)): option(string) => {
    element
    |> Belt.Option.map(_, Elem.unsafeAsHtmlElement)
    |> Belt.Option.map(_, D.HtmlElement.value);
  };

  let toInt = (str: string): option(int) => {
    switch (int_of_string(str)) {
    | result => Some(result)
    | exception (Failure("int_of_string")) => None
    };
  };

  let quantity: option(int) =
    getValue(Doc.getElementById("quantity", D.document))
    |> Belt.Option.flatMap(_, toInt);

  let unitPrice: option(float) =
    getValue(Doc.getElementById("size", D.document))
    |> Belt.Option.flatMap(_, ShirtSize.shirtSizeOfString)
    |> Belt.Option.map(_, ShirtSize.price);

  let totalPrice: option(float) =
    switch (unitPrice, quantity) {
    | (Some(uPrice), Some(qty)) => Some(uPrice *. float_of_int(qty))
    | (_, _) => None
    };

  let priceString: string =
    switch (totalPrice) {
    | Some(total) => Js.Float.toFixedWithPrecision(total, ~digits=2)
    | None => ""
    };

  // We bind the result to a "_" because we don't need to use the result for any furthure calculation

  //There are two underscores on the right-hand side, and they serve very different purposes. The first underscore after Belt.Option.Map tells pipe first where to put the option(Element). The second underscore takes a bit more explanation. The setInnerText function has two parameters: the element and the desired text, but Belt.Option.Map wants a function with one parameter. Just as we did in our discussion of Belt.Option, we use partial application to solve this problem. The underscore in the setInnerText call skips the first positional parameter and partially applies the priceString.
  let _ =
    Doc.getElementById("price", D.document)
    |> Belt.Option.map(_, Elem.setInnerText(_, priceString));
  ();
};

switch (calcButton) {
| Some(element) =>
  D.EventTarget.addEventListener(
    "click",
    calculate,
    Elem.asEventTarget(element),
  )
| None => Js.log("None")
};
