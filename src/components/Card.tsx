import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardType } from "types";
import "./card.scss";
import { AddIcon } from "./icons/Add";

interface CardProps {
  card: CardType;
  onSave: (card: CardType) => void;
  index: number;
}

export default function Card(props: CardProps) {
  const { card, onSave, index } = props;
  const { title, description, labels, epic } = card;
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          id={`card-${card.id}`}
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className="card-title">{title}</span>
          <h4 id={`epic-${epic.id}`} className="card-epic">
            {epic.title}
          </h4>
          <div className="card-tag-container">
            {labels.map((label) => (
              <span id={`label-${label.id}`}>{label.title}</span>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
}
