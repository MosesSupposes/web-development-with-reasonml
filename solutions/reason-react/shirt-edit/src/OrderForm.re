module RR = ReasonReact;

let toInt = (s:string): option(int) => {
  try (Some(int_of_string(s))) {
    | _ => None
  }
};

/*
let toInt = (s:string): option(int) => {
  switch (int_of_string(s)) {
    | result => Some(result)
    | exception(Failure("int_of_string")) => None
  }
};
*/

type state = {
  qty: option(int),
  size: option(Shirt.Size.t),
  sleeve: option(Shirt.Sleeve.t),
  color: option(Shirt.Color.t),
  pattern: option(Shirt.Pattern.t),
  nextOrderNumber: int,
  orders: array(Shirt.Order.t),
  errorText: string,
  editingNumber: option(int)
};

type action =
  | Enter(Shirt.Order.t)
  | ChangeQty(option(int))
  | ChangeSize(option(Shirt.Size.t))
  | ChangeSleeve(option(Shirt.Sleeve.t))
  | ChangeColor(option(Shirt.Color.t))
  | ChangePattern(option(Shirt.Pattern.t))
  | Delete(Shirt.Order.t)
  | Edit(Shirt.Order.t)
  | MissingData;


let setQty = (order: Shirt.Order.t, qty: int): Shirt.Order.t => {
  {...order, quantity: qty};
};

let setSize = (order: Shirt.Order.t, newSize: Shirt.Size.t): Shirt.Order.t => {
  {...order, size: newSize}
};

let setSleeve = (order: Shirt.Order.t, newSleeve: Shirt.Sleeve.t): Shirt.Order.t => {
  {...order, sleeve: newSleeve}
};

let setColor = (order: Shirt.Order.t, newColor: Shirt.Color.t): Shirt.Order.t => {
  {...order, color: newColor}
};

let setPattern = (order: Shirt.Order.t, newPattern: Shirt.Pattern.t): Shirt.Order.t => {
  {...order, pattern: newPattern}
};

let createOrder = (state) : option(Shirt.Order.t) => {
  switch ((state.qty, state.size, state.sleeve, state.color, state.pattern)) {
    | (Some(qty), Some(size), Some(sleeve), Some(color), Some(pattern)) =>
        Some({
          orderNumber: state.nextOrderNumber,
          quantity: qty,
          size: size,
          sleeve: sleeve,
          color: color,
          pattern: pattern})
    | (_, _, _, _, _) => None
  }
};

[@react.component]
let make = () => {

  let initialState = {
    qty: None,
    size: None,
    sleeve: None,
    color: None,
    pattern: None,
    nextOrderNumber: 1,
    orders: [| |],
    errorText: "",
    editingNumber: None
  };

  /* State transitions */
  let (state, dispatch) = React.useReducer((state, action) =>
    switch (action) {
    | Enter(order) => {
        let n = Belt.Option.getWithDefault(state.qty, 0);
        if (n > 0 && n <= 100) {
          {
            /* clear out the form fields */
            qty: None,
            size: None,
            sleeve: None,
            color: None,
            pattern: None,
            orders: switch (state.editingNumber) {
              | Some(n) => Belt.Array.map(state.orders,
                (item) => {(item.orderNumber == n) ? order : item})
              | None => Belt.Array.concat(state.orders, [|order|])
            },
            nextOrderNumber: state.nextOrderNumber + 1,
            editingNumber: None,
            errorText: ""
          }
        } else {
          {...state,
            errorText: "Quantity must be between 1 and 100."
          }
        }
      }
    | ChangeQty(newQty) => {...state, qty: newQty}
    | ChangeSize(newSize) => {...state, size: newSize}
    | ChangeSleeve(newSleeve) => {...state, sleeve: newSleeve}
    | ChangeColor(newColor) => {...state, color: newColor}
    | ChangePattern(newPattern) => {...state, pattern: newPattern}
    | Delete(order) => {...state,
        orders: Belt.Array.keep(state.orders,
          (item) => (item.orderNumber != order.orderNumber))}
    | Edit(order) => {...state,
          /* set the values here */
          qty: Some(order.quantity),
          size: Some(order.size),
          sleeve: Some(order.sleeve),
          color: Some(order.color),
          pattern: Some(order.pattern),
          editingNumber: Some(order.orderNumber)
        }
    | MissingData => {...state, errorText: "Please fill in all fields."}
  }, initialState);

  let orderItems = Belt.Array.map(state.orders, (order) => {
    let beingEdited = switch (state.editingNumber) {
      | Some(n) => n == order.orderNumber
      | None => false
    };
    <OrderItem key={string_of_int(order.orderNumber)}
      order={order} deleteFunction=(_event => dispatch(Delete(order)))
      editFunction=(_event => dispatch(Edit(order)))
      editing={beingEdited}/>
    });

  let orderTable = 
    if (Belt.Array.length(state.orders) > 0) {
        <table>
        <thead>
          <tr>
            <th>{RR.string("Qty")}</th>
            <th>{RR.string("Size")}</th>
            <th>{RR.string("Sleeve")}</th>
            <th>{RR.string("Color")}</th>
            <th>{RR.string("Pattern")}</th>
            <th>{RR.string("Action")}</th>
          </tr>
        </thead>
        <tbody>
          {RR.array(orderItems)}
        </tbody>
      </table>
    } else {
      <p>
        {RR.string("No orders entered yet.")}
      </p>
  };
    
  <div>
    <p className="flex">
    <span className="item">
      {RR.string("Qty: ")}
      <input type_="text" size=4
        value={switch (state.qty) {
                | Some(q) => string_of_int(q)
                | None => ""
              }}
        onChange={(event)=>
          dispatch(ChangeQty(toInt(ReactEvent.Form.target(event)##value)))}/>
    </span>

    <SelectMenu
      label="Size"
      options={Shirt.Size.[|
        None,
        Some(XSmall(1)), Some(Small), Some(Medium),
        Some(Large), Some(XLarge(1)), Some(XLarge(2)),
        Some(XLarge(3))
      |]}
      value={state.size}
      toString={Shirt.Size.toString}
      fromString={Shirt.Size.fromString}
      changeFunction = {(v) => dispatch(ChangeSize(v))} />

    <SelectMenu
      label="Sleeve"
      options={Shirt.Sleeve.[|
        None, Some(Short), Some(Long),Some(XLong),
      |]}
      value={state.sleeve}
      toString={Shirt.Sleeve.toString}
      fromString=Shirt.Sleeve.fromString
      changeFunction = {(v) => dispatch(ChangeSleeve(v))} />

    <SelectMenu
      label="Color"
      options={Shirt.Color.[|None, Some(White), Some(Blue), Some(Red),
        Some(Green), Some( Brown)|]}
      value={state.color}
      toString={Shirt.Color.toString}
      fromString=Shirt.Color.fromString
      changeFunction = {(v) => dispatch(ChangeColor(v))} />

    <SelectMenu
      label="Pattern"
      options={Shirt.Pattern.[|None, Some(Solid), Some(Pinstripe), Some(Check)|]}
      value={state.pattern}
      toString={Shirt.Pattern.toString}
      fromString=Shirt.Pattern.fromString
      changeFunction = {{(v) => dispatch(ChangePattern(v))}} />

      <span className="item">
        <button onClick=(_event => {
            let optOrder = createOrder(state);
            switch (optOrder) {
              | Some(order) => dispatch(Enter(order))
              | None => dispatch(MissingData)
            }})>
          {RR.string((state.editingNumber == None) ? "Add" : "Update")}
        </button>
      </span>
    </p>
    
    <p id="errorText">
      {RR.string(state.errorText)}
    </p>
    
    {orderTable}
  </div>;
};

