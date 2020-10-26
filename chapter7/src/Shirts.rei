// Whatever's included in this file from the originating Shirts.re file is accessible via a public API. Whatever is not specified is considered private/internal.
module Size: {
  type t =
    | XSmall(int)
    | Small
    | Medium
    | Large
    | XLarge(int);
  let toString: t => string;
  let fromString: string => option(t);
};

module Cuff: {
  type t =
    | Button
    | French
    | NoCuff;
  let toString: t => string;
  let fromString: string => option(t);
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
