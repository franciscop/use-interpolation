import $, { until } from "react-test";

import useInterpolation from "./index";

let state: {
  soft: number | undefined;
  set: (value: number | ((prev: number | undefined) => number)) => void;
  hard: number | undefined;
};

const Comp = ({ init, time }: { init?: number; time?: number }) => {
  const [soft, set, hard] = useInterpolation(init, time);
  state = { soft, set, hard };
  return null;
};

describe("useInterpolation", () => {
  it("starts at the initial value", () => {
    $(<Comp init={10} />);
    expect(state.soft).toBe(10);
    expect(state.hard).toBe(10);
  });

  it("starts as undefined without an initial value", () => {
    $(<Comp />);
    expect(state.soft).toBe(undefined);
    expect(state.hard).toBe(undefined);
  });

  it("updates the hard value immediately", async () => {
    const comp = $(<Comp init={0} />);
    await comp.delay(10);
    state.set(100);
    await until(() => state.hard === 100);
    expect(state.hard).toBe(100);
  });

  it("interpolates the soft value over time", async () => {
    const comp = $(<Comp init={0} time={100} />);
    await comp.delay(10);
    state.set(100);
    await until(() => state.hard === 100);
    expect(state.soft).toBeLessThan(100);
    await until(() => state.soft === 100);
    expect(state.soft).toBe(100);
  });

  it("accepts a functional update", async () => {
    const comp = $(<Comp init={10} time={100} />);
    await comp.delay(10);
    state.set((prev) => (prev ?? 0) + 5);
    await until(() => state.hard === 15);
    expect(state.hard).toBe(15);
  });

  it("can be initialized lazily with the setter", async () => {
    const comp = $(<Comp time={100} />);
    await comp.delay(10);
    state.set(50);
    await until(() => state.hard === 50);
    await until(() => state.soft === 50);
    expect(state.soft).toBe(50);
  });
});
