import * as React from 'react';
// Here's the lifecycle of a React app:
// →  render → reconciliation → useLayoutEffect -> commit
//          ↖                                      ↙
//               state change   <-   useEffect

// Let's define a few terms:
// The "render" phase: create React elements React.createElement
// The "reconciliation" phase: compare previous elements with the new ones
// The "commit" phase: update the DOM (if needed).

// A React Component can re-render for any of the following reasons:
// Prop: Its props change
// Parent: Its parent re-renders
// InternalState: Its internal state changes
// Context: It is consuming context values which have changed 🍽️
// whyDidItRender

function Prop({ counter = 'default' }) {
  console.log('<Prop />');
  return (
    <div>
      <h6>I'm Prop Component = {counter}</h6>
    </div>
  );
}

// memo => class/function {all-of pev === all-of next}
// PureComponent (class)
// shouldComponentUpdate (class)
const PropOptimized_1 = React.memo(
  function PropOptimized_1({ counter = 'default' }) {
    // const context
    console.log(`<PropOptimized_1 counter=${counter}/>`);
    return (
      <div>
        <h6>I'm Prop Component = {counter}</h6>
      </div>
    );
  },

  function arePropsEqual(prevProps, nextProps) {
    // complex solution
    if (typeof prevProps.counter === 'number')
      return prevProps.counter === nextProps.counter;
    return prevProps.counter && prevProps.counter.id === nextProps.counter.id;
  },
);

// state = {}
// constructor(props) {
//   super(props)
//   this.state = {}
// }
class PropOptimized_2 extends React.PureComponent {
  render() {
    const counter = this.props.counter || 'default';
    console.log(`<PropOptimized_2 counter=${counter}/>`);
    return (
      <div>
        <h6>I'm Prop Component = {counter}</h6>
      </div>
    );
  }
}

class PropOptimized_3 extends React.Component {
  // state = {}
  shouldComponentUpdate(oldProps, oldState) {
    // oldProps, oldState = this.props, this.state => PureComponent
    return false; // akherat optimization
    return true; // default
  }

  render() {
    const counter = this.props.counter || 'default';
    console.log(`<PropOptimized_2 counter=${counter}/>`);
    return (
      <div>
        <h6>I'm Prop Component = {counter}</h6>
      </div>
    );
  }
}

export default function ReRender() {
  const [state, setState] = React.useState(0);
  // console.log('<App />');

  // <div className='display-flex'></div>
  return [
    // <PropOptimized_1 key="prop=counter" counter={state} />,
    // <PropOptimized_1 key="prop=1" counter={'one'} notExist={{}} />,

    <PropOptimized_2 key="prop=2+{}" counter={'two+{}'} notExist={{}} />,
    <PropOptimized_2 key="prop=2" counter={'two'} />,

    // <PropOptimized_3 key="prop=3" counter={'three'} />,
    // <PropOptimized_3 key="prop=3+{}" counter={'three+{}'} notExist={{}} />,
    <button key="button" onClick={() => setState(state + 1)}>
      counter: {state}
    </button>,
  ];
}

// First optimization rule, push down every thing to the deepest layer
// function IncrementalButton() {
//   const [state, setState] = React.useState(0);
//   console.log('<IncrementalButton />');
//   return (
//     <button key="button" onClick={() => setState(state + 1)}>
//       counter: {state}
//     </button>
//   );
// }
// export default function ReRender() {
//   console.log('<App />');

//   return [
//     <Prop key="prop" />,
//     <IncrementalButton key="increment" />,
//     // <button key="button" onClick={() => setState(state + 1)}>
//     //   counter: {state}
//     // </button>,
//   ];
// }

// export default function ReRender() {
//   const [state, setState] = React.useState(0);

//   React.useEffect(() => {
//     if (state > 50) return;
//     setState(state + 1);
//   }, [state]);

//   return state;
// }
