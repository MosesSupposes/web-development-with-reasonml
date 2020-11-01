[@react.component]
let make = (~label: string, 
  ~options: array('a),
  ~value: 'a,
  ~toString: ('a) => string,
  ~fromString: (string) => option('a),
  ~changeFunction: ('a) => unit)  => {
  
  let makeOptionElement = (value: 'a) => { 
    let v = toString(value);
    <option key={v} value={v}>{ReasonReact.string(v)}</option>
  };
  
  let menuOptionElements = Belt.Array.map(options, makeOptionElement); 
  
  let onChange = (e) => { 
    let value = ReactEvent.Form.target(e)##value;
    switch (fromString(value)) {
      | Some(v) => changeFunction(v)
      | None => ()
    };
  };

  let v = toString(value);  
  
  <span className="item"> 
    <label>{ReasonReact.string(" " ++ label ++ ": ")}</label>
    <select value={v} onChange>
      {ReasonReact.array(menuOptionElements)} 
    </select>
  </span>
};
 
