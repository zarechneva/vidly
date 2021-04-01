import React, { useState } from "react";

const Test = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      {counter}
      {baz}
      <button onClick={() => setCounter(counter + 1)}></button>
    </div>
  );
};

class TestParent extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <Test foo={"bar"} />
      </div>
    );
  }
}
