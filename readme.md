# use-interpolation

A hook to interpolate values easily in React with [Ola](https://github.com/franciscop/ola/):

```js
import useInterpolation from 'use-interpolation';

const Counter = () => {
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
