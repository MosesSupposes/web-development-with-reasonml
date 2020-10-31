[@bs.deriving abstract]
type meta = {
  delimiter: string,
  linebreak: string,
  aborted: bool,
  fields: array(string),
  truncated: bool,
};

let metaData =
  meta(
    ~delimiter=",",
    ~aborted=false,
    ~linebreak="\n",
    ~truncated=false,
    ~fields=[|"Quantity", "Size", "Color"|],
  );

//   The preceding code generates this JavaScript:

// ​ 	​var​ metaData = {
// ​ 	  delimiter: ​","​,
// ​ 	  linebreak: ​"​​\​​n"​,
// ​ 	  aborted: ​false​,
// ​ 	  fields: ​/* array */​[
// ​ 	    ​"Quantity"​,
// ​ 	    ​"Size"​,
// ​ 	    ​"Color"​
// ​ 	  ],
// ​ 	  truncated: ​false​
// ​ 	};

Js.log(fieldsGet(metaData)); // ["Quantity", "Size", "Color"]
Js.log(truncatedGet(metaData)); // false

Js.log(Js.Nullable.isNullable([%raw {|undefined|}])); // true

[@bs.deriving abstract]
type error = {
  [@bs.as "type"]
  type_: string,
  code: string,
  message: string,
  row: int,
  index: int,
};

let errExample =
  error(
    ~code="InvalidQuotes",
    ~type_="Quotes",
    ~row=1,
    ~index=30,
    ~message="Trailing quote on quoted field is malformed",
  ) /* ​ 	}*/;

// And here is the JavaScript:

// ​ 	​var​ errExample = {
// ​ 	  type: ​"Quotes"​,
// ​ 	  code: ​"InvalidQuotes"​,
// ​ 	  message: ​"Trailing quote on quoted field is malformed"​,
// ​ 	  row: 1,
// ​ 	  index: 30
