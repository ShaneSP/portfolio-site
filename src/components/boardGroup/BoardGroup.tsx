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

const BoardGroup = ({
  title,
  cards,
  groupById,
  onCreate,
  onOpenCardDetail,
}: BoardGroupProps) => {
  const [active, setActive] = useState(true);
  const onClick = () => {
    setActive(!active);
  };
  return (
    <div className="board-group">
      <div className="group-header" onClick={onClick}>
        <ChevronDownIcon
          size={18}
          className="icon"
          transform={active ? "rotate(180)" : ""}
        />
        <h3>{title}</h3>
      </div>
      <div className={`collapsible-board ${active ? "active" : ""}`}>
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
};

export default BoardGroup;