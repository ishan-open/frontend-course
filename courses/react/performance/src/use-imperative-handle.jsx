import * as React from 'react';

const Child = React.forwardRef(function Child(props, ref) {
  const childRef = React.useRef();
  function api() {
    return {
      select: () => {
        console.log("I'm going to select the input");
        childRef.current.select();
      },
      focus: () => console.log("I'm going to focus the input"),
    };
  }
  React.useImperativeHandle(ref, api);

  return <input placeholder={props.placeholder} type="text" ref={childRef} />;
});

export default function App() {
  const ref = React.useRef();

  return (
    <div>
      <Child ref={ref} placeholder="placeholder" />
      <button onClick={() => ref.current.select()} children="select" />
      <button onClick={() => ref.current.focus()} children="focus" />
      <button onClick={() => (ref.current.value = '')} children="reset" />
      <button onClick={() => console.log(ref.current)} children="logger" />
    </div>
  );
}
