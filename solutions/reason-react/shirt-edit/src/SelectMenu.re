[@react.component]
let make = (~label: string,
  ~options: array(option('a)),
  ~value: option('a),
  ~toString: ('a) => string,
  ~fromString: (string) => option('a),
  ~changeFunction: (option('a)) => unit)  => {

  let makeOptionElement = (optValue: option('a)) => {
    switch (optValue) {
      | Some(value) => {
        let v = toString(value);
        <option key={v} value={v}>{ReasonReact.string(v)}</option>
        }
      | None => {
        <option key={"----"} value={"----"}>{ReasonReact.string("----")}</option>
        }
    }
  };
  
  let menuOptionElements = 
    Belt.Array.map(options, makeOptionElement);
  
  let onChange = (e) => {
    let value = ReactEvent.Form.target(e)##value;
    changeFunction(fromString(value))
  };

  let v = switch(value) {
    | Some(enclosedValue) => toString(enclosedValue)
    | None => "----"
  };

  <span className="item"> 
    <label>{ReasonReact.string(" " ++ label ++ ": ")}</label>
    <select value={v} onChange>
      {ReasonReact.array(menuOptionElements)} 
    </select>
  </span>
};
 
