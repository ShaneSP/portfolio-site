import React, { Component } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import "./app.scss";
import Content from "components/Content";

interface ComponentProps {}
interface ComponentState {}

class App extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div className="app">
        <Header />
        <Navigation />
        <Content />
      </div>
    );
  }
}

export default App;
