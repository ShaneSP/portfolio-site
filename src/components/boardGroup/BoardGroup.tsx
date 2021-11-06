import React, { useState } from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { columns } from "constants/data";
import BoardColumn from "components/column/BoardColumn";
import "./boardGroup.scss";
import { ChevronDownIcon } from "components/icons/Chevron";
import { CardType } from "constants/types";

interface BoardGroupProps {
  title: string;
  cards: CardType[];
  groupBy: string;
  onCreate: (title: string, columnId: string, index: number) => void;
  onOpenCardDetail: (id: string) => () => void;
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
}

export default function BoardGroup(props: BoardGroupProps) {
  const [isActive, setIsActive] = useState(true);
  const { title, cards, groupBy, onCreate, onOpenCardDetail, onDragEnd } =
    props;
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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board">
            {columns.map((data) => (
              <BoardColumn
                {...data}
                cards={cards.filter((card) => card.columnId === data.id)}
                key={`board-column-${groupBy}-${data.id}`}
                onCreate={onCreate}
                onOpenCardDetail={onOpenCardDetail}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
