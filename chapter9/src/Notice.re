let component = ReasonReact.statelessComponent("Notice");

let noticeStyle = color =>
  ReactDOMRe.Style.make(
    ~color,
    ~clear="left",
    ~minHeight="64px",
    ~marginBottom="0.5rem",
    ~width="30%",
    ~display="flex",
    ~alignItems="center",
    ~border="1px solid black",
    (),
  );

[@react.component]
let make = (~message, ~color, ~icon) => {
  <div style={noticeStyle(color)}>
    <img
      src={"notice_icons/" ++ icon ++ ".svg"}
      style={ReactDOMRe.Style.make(~width="48px", ~float="left", ())}
    />
    {ReasonReact.string(message)}
  </div>;
};
