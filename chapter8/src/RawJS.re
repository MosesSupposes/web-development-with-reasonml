// The easiest and least type-safe way to access JavaScript is by placing raw JavaScript code in the middle of your ReasonML code. The generic form is: [%raw {| /* Js expression */ |}]. The JavaScript must be an expression, not a series of statements, nor even an expression followed by a semicolon.

// What if you really need multiple statements? You can get around the limitation by using an immediately invoked function expression (IIFE).
let rightNow = [%raw
  {|
  (function() {
    const d = new Date()
    return d.toString()
  })()
|}
];

let message = "It is now " ++ rightNow;
Js.log(message);
