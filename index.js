// Based off a tweet and codesandbox:
// https://mobile.twitter.com/hieuhlc/status/1164369876825169920
import { useRef } from "react";
import Ola from "ola";

// Reusable component that also takes dependencies
export default time => {
  const ref = useRef();
  const setValue = value => {
    if (ref.current) {
      ref.current.value = value;
    } else {
      ref.current = new Ola(value, time);
    }
  };
  return [ref.current, setValue];
};
