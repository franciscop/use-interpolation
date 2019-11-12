// Based off a tweet and codesandbox:
// https://mobile.twitter.com/hieuhlc/status/1164369876825169920
import { useRef, useState } from "react";
import Ola from "ola";
import useAnimationFrame from "use-animation-frame";

const isDefined = val => typeof val !== "undefined" && val !== null;

// Reusable component that also takes dependencies
export default (init, time) => {
  const initValue = isDefined(init) ? new Ola(init, time) : null;
  const ref = useRef(initValue);

  // Soft is the value being interpolated
  const [soft, setSoft] = useState(init);

  // Hard is the actual value set by the user
  const [hard, setHard] = useState(init);

  const setUserValue = value => {
    if (typeof value === "function") {
      value = value(hard);
    }
    if (isDefined(ref.current)) {
      ref.current.value = value;
    } else {
      ref.current = new Ola(value, time);
    }
    setHard(value);
  };

  useAnimationFrame(
    () => {
      if (!isDefined(ref.current)) return;
      const value = ref.current.value;
      if (value === soft) return;
      setSoft(value);
    },
    [soft]
  );

  return [soft, setUserValue, hard];
};
