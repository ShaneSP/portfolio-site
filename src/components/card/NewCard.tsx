import React, { createRef, useEffect, useState } from "react";
import { CardType } from "constants/types";
import { epics } from "constants/data";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import "./card.scss";

interface NewCardProps {
  card: CardType;
  onSave: (title?: string) => void;
  index: number;
}

export default function NewCard(props: NewCardProps) {
  const { card, onSave } = props;
  const { labels, epicId } = card;
  const [title, setTitle] = useState<string>();
  const [isActive, setIsActive, ref] = useDetectOutsideClick(true);
  const textAreaRef = createRef<HTMLTextAreaElement>();
  const epic = epics.find((epic) => epic.id === epicId);
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // "enter" keyCode is 13
      onSave(title);
      e.preventDefault();
    }
  };
  const onChange = (e) => {
    setTitle(e.target.value);
  };
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  });
  useEffect(() => {
    if (!isActive) {
      onSave();
    }
  }, [isActive]);
  return (
    <>
      <div className="card" ref={ref}>
        <textarea
          ref={textAreaRef}
          className="card-title"
          rows={3}
          onChange={onChange}
          onKeyDown={onKeyDown}
          defaultValue={title}
          placeholder="Enter card title"
        />
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
    </>
  );
}
