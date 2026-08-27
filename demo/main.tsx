import { createRoot } from "react-dom/client";

import useInterpolation from "../src/index";

const App = () => {
  const [x, setX] = useInterpolation(200, 300);
  const [y, setY] = useInterpolation(200, 300);
  return (
    <div
      style={{ position: "fixed", inset: 0, cursor: "crosshair" }}
      onPointerMove={(e) => {
        setX(e.clientX);
        setY(e.clientY);
      }}
    >
      <p style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        Move the mouse, the ball follows with interpolation
      </p>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 30,
          height: 30,
          marginLeft: -15,
          marginTop: -15,
          borderRadius: "50%",
          background: "dodgerblue",
        }}
      />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
