/// <reference path="./ola.d.ts" />
import Ola, { type OlaScalar } from "ola";
import { useRef, useState } from "react";
import useAnimationFrame from "use-animation-frame";

export type Setter = (
  value: number | ((prev: number | undefined) => number),
) => void;

const isDefined = (val: unknown): val is number =>
  typeof val !== "undefined" && val !== null;

export default function useInterpolation(
  init?: number,
  time?: number,
): [number | undefined, Setter, number | undefined] {
  const ref = useRef<OlaScalar | null>(
    isDefined(init) ? Ola(init, time) : null,
  );

  // Soft is the value being interpolated
  const [soft, setSoft] = useState(init);

  // Hard is the actual value set by the user
  const [hard, setHard] = useState(init);

  const setUserValue: Setter = (value) => {
    const next = typeof value === "function" ? value(hard) : value;
    if (ref.current) {
      ref.current.value = next;
    } else {
      ref.current = Ola(next, time);
    }
    setHard(next);
  };

  useAnimationFrame(() => {
    if (!ref.current) return;
    const value = ref.current.value;
    if (value === soft) return;
    setSoft(value);
  });

  return [soft, setUserValue, hard];
}
