import React from "react";
import { CardType } from "types";
import "./boardColumn.scss";
import Card from "./Card";
import { AddIcon } from "./icons/Add";

interface BoardColumnProps {
  cards: CardType[];
  title: string;
  groupBy: string;
  onCreate: () => void;
}

export default function BoardColumn(props: BoardColumnProps) {
  const { cards, title, groupBy, onCreate } = props;
  const onSave = (index: number) => (card: CardType) => {
    console.log("New card:", card);
  };
  return (
    <div className="board-column">
      <h3>{title.toUpperCase()}</h3>
      {cards.map((card, index) => (
        <Card card={card} onSave={onSave(index)} />
      ))}
      <div className="create-card" onClick={onCreate}>
        <AddIcon size={24} />
        <span>Create new card</span>
      </div>
    </div>
  );
}
