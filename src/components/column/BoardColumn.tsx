import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { CardType } from "constants/types";
import "./boardColumn.scss";
import Card from "../card/Card";
import { AddIcon } from "../icons/Add";
import { createCard } from "constants/data";

interface BoardColumnProps {
  id: string;
  cards: CardType[];
  title: string;
  onCreate: (title: string, columnId: string, index: number) => void;
  onOpenCardDetail: (id: string) => () => void;
}

export default function BoardColumn(props: BoardColumnProps) {
  const { id, cards, onOpenCardDetail } = props;
  const [tempCard, setTempCard] = useState<CardType>();
  const onSave = (index: number) => (card: CardType) => {
    setTempCard(undefined);
    console.log("New card:", card);
  };
  const onCreate = () => {
    setTempCard(createCard("", id, cards.length));
  };
  // TODO: create component for temp/new card
  return (
    <div className="board-column">
      <Droppable droppableId={id}>
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
                  onSave={onSave(index)}
                  index={index}
                  onOpenDetail={onOpenCardDetail(card.id)}
                />
              ))}
            {tempCard && (
              <Card
                key="temp-card"
                card={tempCard}
                onSave={onSave(cards.length)}
                index={cards.length}
                onOpenDetail={onOpenCardDetail(tempCard.id)}
              />
            )}
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
