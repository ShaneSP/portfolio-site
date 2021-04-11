import React from "react";
import { CardType } from "types";
import "./card.scss";
import { AddIcon } from "./icons/Add";

interface CardProps {
  card: CardType;
  onSave: (card: CardType) => void;
}

export default function Card(props: CardProps) {
  const { card, onSave } = props;
  const { title, description, labels, epic } = card;
  return (
    <div id={`card-${card.id}`} className="card">
      <h4 className="card-title">{title}</h4>
      <h4 id={`epic-${epic.id}`} className="card-epic">
        {epic.title}
      </h4>
      <div className="card-tag-container">
        {labels.map((label) => (
          <span id={`label-${label.id}`}>{label.title}</span>
        ))}
      </div>
    </div>
  );
}
