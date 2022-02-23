import React from "react";

export default function Header(props) {
  return (
    <header className="appointment__time" time={props.time}>
      <h4 className="text--semi-bold">12pm</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
