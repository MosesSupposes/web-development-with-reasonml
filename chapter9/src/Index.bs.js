'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var ReactDOMRe = require("reason-react/src/legacy/ReactDOMRe.bs.js");
var Notice$Chapter9 = require("./Notice.bs.js");
var ExampleStyles$Chapter9 = require("./ExampleStyles.bs.js");
var BlinkingGreeting$Chapter9 = require("./BlinkingGreeting/BlinkingGreeting.bs.js");
var FetchedDogPictures$Chapter9 = require("./FetchedDogPictures/FetchedDogPictures.bs.js");
var ReducerFromReactJSDocs$Chapter9 = require("./ReducerFromReactJSDocs/ReducerFromReactJSDocs.bs.js");
var ReasonUsingJSUsingReason$Chapter9 = require("./ReasonUsingJSUsingReason/ReasonUsingJSUsingReason.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$Chapter9.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

ReactDom.render(React.createElement(BlinkingGreeting$Chapter9.make, {
          children: "Hello!"
        }), makeContainer("Blinking Greeting"));

ReactDom.render(React.createElement(ReducerFromReactJSDocs$Chapter9.make, {}), makeContainer("Reducer From ReactJS Docs"));

ReactDom.render(React.createElement(FetchedDogPictures$Chapter9.make, {}), makeContainer("Fetched Dog Pictures"));

ReactDom.render(React.createElement(ReasonUsingJSUsingReason$Chapter9.make, {}), makeContainer("Reason Using JS Using Reason"));

ReactDOMRe.renderToElementWithId(React.createElement(Notice$Chapter9.make, {
          message: "Total file size 1280 bytes",
          color: "#000",
          icon: "information"
        }), "info");

ReactDOMRe.renderToElementWithId(React.createElement(Notice$Chapter9.make, {
          message: "Variable x is unused",
          color: "#FF8C00",
          icon: "warning"
        }), "warn");

ReactDOMRe.renderToElementWithId(React.createElement(Notice$Chapter9.make, {
          message: "Variable x is not defined",
          color: "#8B0000",
          icon: "error"
        }), "err");

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
