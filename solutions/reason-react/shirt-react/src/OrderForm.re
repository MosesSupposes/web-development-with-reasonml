let toIntWithDefault = (s:string, defaultValue:int): int => {
  try (int_of_string(s)) {
    | _ => defaultValue
  }
};

type state = {
  qtyStr: string,
  size: Shirt.Size.t,
  sleeve: Shirt.Sleeve.t,
  color: Shirt.Color.t,
  pattern: Shirt.Pattern.t,
  nextOrderNumber: int,
  orders: array(Shirt.Order.t),
  errorText: string,
};

type action =
  | Enter(Shirt.Order.t)
  | ChangeQty(string)
  | ChangeSize(Shirt.Size.t)
  | ChangeSleeve(Shirt.Sleeve.t)
  | ChangeColor(Shirt.Color.t)
  | ChangePattern(Shirt.Pattern.t)
  | Delete(Shirt.Order.t);

let createOrder = (state) : Shirt.Order.t => {
  {
    orderNumber: state.nextOrderNumber,
    quantity: toIntWithDefault(state.qtyStr, 0),
    size: state.size,
    sleeve: state.sleeve,
    color: state.color,
    pattern: state.pattern,
  }
};

[@react.component]
let make = () => {
  let initialState = {
    qtyStr: "1",
    size: Shirt.Size.Medium,
    sleeve: Shirt.Sleeve.Long,
    color: Shirt.Color.White,
    pattern: Shirt.Pattern.Solid,
    orders: [| |],
    nextOrderNumber: 1,
    errorText: ""
  };

  let (state, dispatch) = React.useReducer((state, action) =>
    switch (action) {
    | Enter(order) => {
        let n = toIntWithDefault(state.qtyStr, 0);
        if (n > 0 && n <= 100) {
          {...state, 
            orders: Belt.Array.concat(state.orders, [|order|]), 
            nextOrderNumber: state.nextOrderNumber + 1, 
            errorText: "" 
          }
        } else {
          {...state,
            errorText: "Quantity must be between 1 and 100." 
          }
        }
      }
    | ChangeQty(newQty) => {...state, qtyStr: newQty}
    | ChangeSize(newSize) => {...state, size: newSize}
    | ChangeSleeve(newSleeve) => {...state, sleeve: newSleeve}
    | ChangeColor(newColor) => {...state, color: newColor}
    | ChangePattern(newPattern) => {...state, pattern: newPattern}
    | Delete(order) => {...state,
        orders: Belt.Array.keep(state.orders,
                    (item) => (item.orderNumber != order.orderNumber))}
    }, initialState);

  let orderItems = Belt.Array.map(state.orders, (order) => 
      <OrderItem key={string_of_int(order.orderNumber)}
        order={order} deleteFunction=(_event => dispatch(Delete(order)))/>);
    let orderTable = 
      if (Belt.Array.length(state.orders) > 0) {
         <table>
          <thead>
            <tr>
              <th>{ReasonReact.string("Qty")}</th>
              <th>{ReasonReact.string("Size")}</th>
              <th>{ReasonReact.string("Sleeve")}</th>
              <th>{ReasonReact.string("Color")}</th>
              <th>{ReasonReact.string("Pattern")}</th>
              <th>{ReasonReact.string("Action")}</th>
            </tr>
          </thead>
          <tbody>
            {ReasonReact.array(orderItems)}
          </tbody>
        </table>
     } else {
        <p>
          {ReasonReact.string("No orders entered yet.")}
        </p>
    };


    <div>
      <p className="flex">
      <span className="item"> 
        {ReasonReact.string("Qty: ")}
        <input type_="text" size=4
          value={state.qtyStr} 
          onChange={(event)=> 
            dispatch(ChangeQty(ReactEvent.Form.target(event)##value))}/> 
      </span>

    <SelectMenu
      label="Size"
      options={[|
        Shirt.Size.XSmall(1), Shirt.Size.Small, Shirt.Size.Medium,
        Shirt.Size.Large, Shirt.Size.XLarge(1), Shirt.Size.XLarge(2),
        Shirt.Size.XLarge(3)
      |]}
      value={state.size}
      toString={Shirt.Size.toString}
      fromString={Shirt.Size.fromString}
      changeFunction = {(v) => dispatch(ChangeSize(v))} />

    <SelectMenu
      label="Sleeve"
      options={[|
        Shirt.Sleeve.Short, Shirt.Sleeve.Long, Shirt.Sleeve.XLong,
      |]}
      value={state.sleeve}
      toString={Shirt.Sleeve.toString}
      fromString=Shirt.Sleeve.fromString
      changeFunction = {(v) => dispatch(ChangeSleeve(v))} />

    <SelectMenu
      label="Color"
      options={Shirt.Color.[|White, Blue, Red, Green, Brown|]}
      value={state.color}
      toString={Shirt.Color.toString}
      fromString=Shirt.Color.fromString
      changeFunction = {(v) => dispatch(ChangeColor(v))} />

    <SelectMenu
      label="Pattern"
      options={Shirt.Pattern.[|Solid, Pinstripe, Check|]}
      value={state.pattern}
      toString={Shirt.Pattern.toString}
      fromString=Shirt.Pattern.fromString
      changeFunction = {{(v) => dispatch(ChangePattern(v))}} />

      <span className="item">
        <button onClick=(_event => {
            let order = createOrder(state);
            dispatch(Enter(order))}) >
          {ReasonReact.string("Add")}
        </button>
      </span>
      </p>

      <p id="errorText">
        {ReasonReact.string(state.errorText)}
      </p>

      {orderTable}
    </div>;
};

