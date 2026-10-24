# use-interpolation [![npm install use-interpolation](https://img.shields.io/badge/npm%20install-use--interpolation-blue.svg)](https://www.npmjs.com/package/use-interpolation) [![tests](https://github.com/franciscop/use-interpolation/workflows/tests/badge.svg)](https://github.com/franciscop/use-interpolation/actions) [![gzip size](https://img.badgesize.io/franciscop/use-interpolation/master/index.min.js.svg?label=gzip&logo=&compression=gzip)](https://github.com/franciscop/use-interpolation/blob/master/index.min.js)

A hook to interpolate values easily in React with [Ola](https://github.com/franciscop/ola/):

```js
import useInterpolation from 'use-interpolation';

const Counter = () => {
  // Either initialize it with a value or with no value
  const [fps, setFps] = useInterpolation();
  useAnimationFrame(e => {
    setFps(1 / e.delta);
    // Do something...
  }, []);
  if (!fps) return 'Loading...';
  return <div>{fps.value}</div>;
};
```

It is useful for listening to remote values that change over time and setting like displaying a graph like [Ola](https://github.com/franciscop/ola/):

![Graph interpolation](https://raw.githubusercontent.com/franciscop/ola/master/docs/line.gif)

![Touch interpolation](https://raw.githubusercontent.com/franciscop/ola/master/docs/ball.gif)

![Many points interpolation](https://raw.githubusercontent.com/franciscop/ola/master/docs/dots.gif)
