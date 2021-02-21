import React, { Component } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

interface ComponentProps {}
interface ComponentState {}

class App extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        {/* content */}
      </div>
    );
  }
}

export default App;
