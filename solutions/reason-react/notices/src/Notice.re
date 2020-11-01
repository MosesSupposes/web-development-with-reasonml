[@bs.val] external require : string => string = ""; 

require("../notice_icons/warning.svg");
require("../notice_icons/error.svg");
require("../notice_icons/information.svg");

let component = ReasonReact.statelessComponent("Notice");

let noticeStyle = (color) =>
  ReactDOMRe.Style.make( 
    ~color=color, ~clear="left",
    ~minHeight="64px", ~marginBottom="0.5em",
    ~width="30%", ~display="flex", ~alignItems="center", 
    ~border="1px solid black", ());

[@react.component]
let make =  (~message, ~color, ~icon) => { 
  <div style={noticeStyle(color)}> 
    <img src={"notice_icons/" ++ icon ++ ".svg"} 
      style = {ReactDOMRe.Style.make(~width="48px", ~float="left", ())} />
    {ReasonReact.string(message)} 
    </div>
};
