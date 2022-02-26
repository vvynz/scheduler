import { useState } from "react";

export default function useVisualMode(initial) {
  // takes in an initial mode and sets the mode state with the initial value
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //keeps track of the history of our modes
  // initializes the history array with the first mode that gets passed in

  // takes in a new mode and updates the mode state with the new value 
  function transition(mode, replace = false) {
    return setMode(mode);
  }

  // transition BACK to a previous mode
  function back() {
    // user can't go back past the initial value
    if (history.length >= 1) {
      setMode(initial);
    } else {

      setMode(history[history.length - 2]); //sets the mode to the PREVIOUS mode in the history array
      setHistory(history.slice(0, -1)); //removes the last item in the history array
    }
  };

  return { mode, transition, back };
}

