type t;
// invoking the new keyword on a constructor function.
[@bs.new] external createDate: unit => t = "Date";
// accessing a class method.
[@bs.scope "Date"] [@bs.val] external now: unit => float;
[@bs.scope "Date"] [@bs.val] external jsDateParse: string => float = "parse";
// accessing an instance method.
[@bs.send] external toString: t => string;
[@bs.send] external getFullYear: t => float;

let parse = (s: string): option(float) => {
  let result = jsDateParse(s);
  if (Js.Float.isNaN(result)) {
    None;
  } else {
    Some(result);
  };
};
