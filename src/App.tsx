import React, { Component } from "react";

interface ComponentProps {}
interface ComponentState {}

class App extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div>
        <span>hello, world.</span>
      </div>
    );
  }
}

export default App;
