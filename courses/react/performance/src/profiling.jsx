import * as React from 'react';

function HeavyCounter({ value }) {
  return (
    <div>
      <ul style={{ display: 'flex' /*  display: 'none' */ }}>
        {Array.from({ length: 1000 * (value + 1) }).map((_value, i) => (
          <li key={i}>item {i}</li>
        ))}
      </ul>
      <p>{value}</p>
    </div>
  );
}

const Counter = ({ value }) => <h1>{value}</h1>;
function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  // TODO: profiler in depth
  // https://gist.github.com/bvaughn/8de925562903afd2e7a12554adcdda16
  // https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
  // https://calibreapp.com/blog/react-performance-profiling-optimization
  // https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
  // yarn build --profile

  interactions, // the Set of interactions belonging to this update
) {
  console.table({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
}

function App() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setValue(old => Math.min(old + 1, 5));
    }, 250);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {/* <React.Profiler id="counter" onRender={onRenderCallback}> */}
      {value !== 4 && <Counter value={value} />}
      {/* {value !== 4 && <HeavyCounter value={value} />} */}
      {/* </React.Profiler> */}
    </div>
  );
}

export default App;
