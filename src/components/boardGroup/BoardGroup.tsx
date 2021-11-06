import React, { useState } from "react";
import { columns } from "constants/data";
import BoardColumn from "components/column/BoardColumn";
import "./boardGroup.scss";
import { ChevronDownIcon } from "components/icons/Chevron";
import { CardType } from "constants/types";

interface BoardGroupProps {
  title: string;
  cards: CardType[];
  groupById: string;
  onCreate: (title: string, columnId: string, index: number) => void;
  onOpenCardDetail: (id: string) => () => void;
}

export default function BoardGroup(props: BoardGroupProps) {
  const [isActive, setIsActive] = useState(true);
  const { title, cards, groupById, onCreate, onOpenCardDetail } = props;
  const onClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="board-group">
      <div className="group-header" onClick={onClick}>
        <ChevronDownIcon
          size={18}
          className="icon"
          transform={isActive ? "rotate(180)" : ""}
        />
        <h3>{title}</h3>
      </div>
      <div className={`collapsible-board ${isActive ? "active" : ""}`}>
        <div className="board">
          {columns.map((data) => (
            <BoardColumn
              {...data}
              droppableId={`${data.id}$${groupById}`}
              cards={cards.filter((card) => card.columnId === data.id)}
              key={`board-column-${groupById}-${data.id}`}
              onCreate={onCreate}
              onOpenCardDetail={onOpenCardDetail}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
