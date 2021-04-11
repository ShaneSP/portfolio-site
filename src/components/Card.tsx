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
  const { title, description, label, labelId, epic, epicId } = card;
  return (
    <div className="card">
      <h4 className="card-title">{title}</h4>
      <div className="card-tag-container">
        <span>{epic}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}
