import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { CardType } from "constants/types";
import "./boardColumn.scss";
import Card from "../card/Card";
import { AddIcon } from "../icons/Add";
import { createCard } from "constants/data";
import NewCard from "components/card/NewCard";

interface BoardColumnProps {
  id: string;
  droppableId: string;
  cards: CardType[];
  title: string;
  onCreate: (title: string, columnId: string, index: number) => void;
  onOpenCardDetail: (id: string) => () => void;
}

const BoardColumn = ({
  id,
  droppableId,
  cards,
  onCreate,
  onOpenCardDetail,
}: BoardColumnProps) => {
  const [tempCard, setTempCard] = useState<CardType>();
  const onSave = (title?: string) => {
    setTempCard(undefined);
    if (title) {
      onCreate(title, id, cards.length);
    }
  };
  const handleCreate = () => {
    setTempCard(createCard("", id, cards.length));
  };
  return (
    <div className="board-column">
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ height: "100%", padding: "grid" }}
          >
            {cards
              .sort((a, b) => a.order - b.order)
              .map((card, index) => (
                <Card
                  key={`card-${card.id}`}
                  card={card}
                  index={index}
                  onOpenDetail={onOpenCardDetail(card.id)}
                />
              ))}
            {tempCard && (
              <NewCard
                key="temp-card"
                card={tempCard}
                onSave={onSave}
                index={cards.length}
              />
            )}
            <div
              className="create-card"
              onClick={handleCreate}
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
};

export default BoardColumn;