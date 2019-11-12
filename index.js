// Based off a tweet and codesandbox:
// https://mobile.twitter.com/hieuhlc/status/1164369876825169920
import { useEffect, useRef, useState } from "react";
import Ola from "ola";
import useAnimationFrame from "use-animation-frame";

// Reusable component that also takes dependencies
export default (init, time) => {
  const ref = useRef(new Ola(init, time));

  const [val, setVal] = useState(init);
  const [hard, setHard] = useState(init);

  const setUserValue = value => {
    if (typeof value === "function") {
      ref.current.value = value(hard);
    } else {
      ref.current.value = value;
    }
    setHard(value);
  };

  useAnimationFrame(() => {
    const value = ref.current.value;
    if (value !== val) {
      setVal(value);
    }
  }, []);

  return [val, setUserValue, hard];
};
