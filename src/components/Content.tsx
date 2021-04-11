import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { BoardColumnType, CardType, GroupBy } from "types";
import BoardColumn from "./BoardColumn";
import "./content.scss";
import Filter from "./Filter";

export default function Content() {
  const [groupBy, setGroupBy] = useState<string>(GroupBy.Epic);
  const columns: BoardColumnType[] = [
    {
      id: uuid(),
      cards: [
        {
          title: "Card title",
          description: "",
          epic: "epic",
          epicId: "0",
          label: "label",
          labelId: "0",
        },
      ],
      title: "To Do",
    },
    {
      id: uuid(),
      cards: [],
      title: "In Progress",
    },
    {
      id: uuid(),
      cards: [],
      title: "Done",
    },
  ];
  const onCreate = (card: CardType) => {
    console.log("Create clicked");
  };
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
        {columns.map((data) => (
          <BoardColumn {...data} onCreate={onCreate} groupBy={groupBy} />
        ))}
      </div>
    </div>
  );
}
