import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (nextMode, replace = false) => {
    if (replace) {
      setMode(nextMode);
      setHistory((prevHistory) => [...prevHistory.slice(0, -1), nextMode]);
    } else {
      setMode(nextMode);
      setHistory((prevHistory) => [...prevHistory, nextMode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  return { mode, transition, back };
}
