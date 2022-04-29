import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardType } from "constants/types";
import "./card.scss";
import { epics } from "constants/data";

interface CardProps {
  card: CardType;
  index: number;
  onOpenDetail: () => void;
}

const Card = ({ card, index, onOpenDetail }: CardProps) => {
  const { title, description, labels, epicId } = card;
  const epic = epics.find((epic) => epic.id === epicId);
  const onClick = () => {
    onOpenDetail();
  };
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="card"
          onClick={onClick}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className="card-title">{title}</span>
          {epic && (
            <h4 key={`epic-${epicId}-${card.id}`} className="card-epic">
              {epic.title}
            </h4>
          )}
          <div className="card-tag-container">
            {labels.map((label) => (
              <span key={`label-${label.id}-${card.id}`}>{label.title}</span>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;