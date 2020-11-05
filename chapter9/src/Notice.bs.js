'use strict';

var React = require("react");
var ReasonReact = require("reason-react/src/legacy/ReasonReact.bs.js");

var component = ReasonReact.statelessComponent("Notice");

function noticeStyle(color) {
  return {
          border: "1px solid black",
          clear: "left",
          color: color,
          display: "flex",
          marginBottom: "0.5rem",
          minHeight: "64px",
          width: "30%",
          alignItems: "center"
        };
}

function Notice(Props) {
  var message = Props.message;
  var color = Props.color;
  var icon = Props.icon;
  return React.createElement("div", {
              style: noticeStyle(color)
            }, React.createElement("img", {
                  style: {
                    float: "left",
                    width: "48px"
                  },
                  src: "notice_icons/" + (icon + ".svg")
                }), message);
}

var make = Notice;

exports.component = component;
exports.noticeStyle = noticeStyle;
exports.make = make;
/* component Not a pure module */
