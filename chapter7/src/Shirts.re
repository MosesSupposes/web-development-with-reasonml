module Size = {
  type t =
    | XSmall(int)
    | Small
    | Medium
    | Large
    | XLarge(int);

  let toString = (size: t): string => {
    switch (size) {
    | XSmall(n) => String.make(n, 'X') ++ "S"
    | Small => "S"
    | Medium => "M"
    | Large => "L"
    | XLarge(n) => String.make(n, 'X') ++ "L"
    };
  };

  let fromString = (str: string): option(t) => {
    switch (Js.String.toUpperCase(str)) {
    | "S" => Some(Small)
    | "M" => Some(Medium)
    | "L" => Some(Large)
    | s when Js.Re.test(s, [%re "/^X+S$/"]) =>
      Some(XSmall(String.length(s) - 1))
    | s when Js.Re.test(s, [%re "/^X+L$/"]) =>
      Some(XLarge(String.length(s) - 1))
    | _ => None
    };
  };
};

module Cuff = {
  type t =
    | Button
    | French
    | NoCuff;

  let toString = (cuff: t): string => {
    switch (cuff) {
    | Button => "button"
    | French => "french"
    | NoCuff => "none"
    };
  };

  let fromString = (s: string): option(t) => {
    switch (Js.String.toLowerCase(s)) {
    | "button" => Some(Button)
    | "french" => Some(French)
    | ""
    | "none"
    | "nocuff" => Some(NoCuff)
    | _ => None
    };
  };
};

type sleeve =
  | Short
  | Long
  | XLong;

type color =
  | White
  | Blue
  | Red
  | Green
  | Brown;

type pattern =
  | Solid
  | Pinstripe
  | Check;

type collar =
  | Button
  | Straight
  | Spread;

type order = {
  quantity: int,
  size: Size.t,
  sleeve,
  color,
  pattern,
  cuff: Cuff.t,
  collar,
};

let myOrder = {
  quantity: 1,
  size: XLarge(1),
  sleeve: Long,
  color: Blue,
  pattern: Solid,
  cuff: Button,
  collar: Button,
};

let otherOrder = {...myOrder, color: White, cuff: French};
