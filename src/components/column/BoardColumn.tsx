import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { CardType } from "types";
import "./boardColumn.scss";
import Card from "../card/Card";
import { AddIcon } from "../icons/Add";

interface BoardColumnProps {
  id: string;
  cards: CardType[];
  title: string;
  groupBy: string;
  onCreate: () => void;
  onOpenCardDetail: (id: string) => () => void;
}

export default function BoardColumn(props: BoardColumnProps) {
  const { id, cards, title, groupBy, onCreate, onOpenCardDetail } = props;
  const onSave = (index: number) => (card: CardType) => {
    console.log("New card:", card);
  };
  return (
    <div className="board-column">
      <h3>{title.toUpperCase()}</h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ height: "100%", padding: "grid" }}
          >
            {cards.map((card, index) => (
              <Card
                card={card}
                onSave={onSave(index)}
                index={index}
                onOpenDetail={onOpenCardDetail(card.id)}
              />
            ))}
            <div
              className="create-card"
              onClick={onCreate}
              style={{
                visibility: snapshot.isDraggingOver
                  ? "hidden"
                  : !!cards.length
                  ? "visible"
                  : undefined,
              }}
            >
              <AddIcon className="add-icon" size={24} />
              <span>Create new card</span>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
