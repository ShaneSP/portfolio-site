import React from "react";
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import "./app.scss";
import Content from "components/content/Content";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Navigation />
      <Content />
    </div>
  );
};

export default App;
