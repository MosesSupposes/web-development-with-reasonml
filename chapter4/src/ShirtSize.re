type shirtSize =
  | Small
  | Medium
  | Large
  | XLarge;

let shirtSizeOfString = (str: string): option(shirtSize) => {
  switch (str) {
  | "S" => Some(Small)
  | "M" => Some(Medium)
  | "L" => Some(Large)
  | "XL" => Some(XLarge)
  | _ => None
  };
};

let price = (size: shirtSize): float => {
  switch (size) {
  | Small => 11.00
  | Medium => 12.50
  | Large => 14.00
  | XLarge => 16.00
  };
};
