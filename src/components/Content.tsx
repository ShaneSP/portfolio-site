import React from "react";
import "./content.scss";
import Filter from "./Filter";

export default function Content() {
  return (
    <div className="content">
      <h1>Kanban Board</h1>
      <div className="toolbar">
        <input placeholder="search"></input>
        <div className="filter-container">
          {["Epic", "Label"].map((title) => (
            <Filter title={title} options={Array(3).fill(Math.random() * 10)} />
          ))}
        </div>
      </div>
      <div className="board">
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
      </div>
    </div>
  );
}
