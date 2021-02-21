import React, { Component } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import "./app.scss";

interface ComponentProps {}
interface ComponentState {}

class App extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div className="app">
        <Header />
        <Navigation />
        <div
          className="content"
        />
        {/* content */}
      </div>
    );
  }
}

export default App;
