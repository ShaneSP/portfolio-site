import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { BoardColumnType, CardType, GroupBy } from "types";
import BoardColumn from "./BoardColumn";
import "./content.scss";
import Filter from "./Filter";

const defaultCard = () => {
  return {
    id: uuid(),
    title: "Card title",
    description: "",
    epic: { id: uuid(), title: "epic" },
    labels: [
      { id: uuid(), title: "label1" },
      { id: uuid(), title: "label2" },
    ],
  };
};
const defaultColumns: BoardColumnType[] = [
  {
    id: uuid(),
    cards: [
      {
        id: uuid(),
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        description: "",
        epic: { id: uuid(), title: "Avatar Customization" },
        labels: [
          { id: uuid(), title: "label1" },
          { id: uuid(), title: "label2" },
        ],
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

export default function Content() {
  const [groupBy, setGroupBy] = useState<string>(GroupBy.Epic);
  const [columns, setColumns] = useState<BoardColumnType[]>(defaultColumns);
  const onCreate = (id: string) => () => {
    setColumns(
      columns.map((column) => {
        if (column.id === id) {
          return {
            ...column,
            cards: [...column.cards, defaultCard()],
          };
        }
        return column;
      })
    );
  };
  return (
    <div className="content">
      <h1>Kanban Board</h1>
      <div className="toolbar">
        <input className="search" placeholder="Search..."></input>
        <div className="filter-container">
          {["Epic", "Label"].map((title) => (
            <Filter title={title} options={Array(3).fill(Math.random() * 10)} />
          ))}
        </div>
      </div>
      <div className="board">
        {columns.map((data) => (
          <BoardColumn
            {...data}
            onCreate={onCreate(data.id)}
            groupBy={groupBy}
          />
        ))}
      </div>
    </div>
  );
}
