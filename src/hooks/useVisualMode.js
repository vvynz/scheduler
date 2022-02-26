import { useState } from "react";

export default function useVisualMode(initial) {
  // takes in an initial mode and sets the mode state with the initial value
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //keeps track of the history of our modes

  // takes in a new mode and updates the mode state with the new value 
  function transition(mode) {
    return setMode(mode);
  }

  // transition BACK to a previous mode
  function back() {

  };

  return { mode, transition, back };
}

