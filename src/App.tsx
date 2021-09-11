import React, { Component } from "react";
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import "./app.scss";
import Content from "components/content/Content";

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
