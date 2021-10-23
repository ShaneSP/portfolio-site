import React from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { columns } from "constants/data";
import BoardColumn from "components/column/BoardColumn";
import { CardType } from "constants/types";
import "./boardGroup.scss";

interface BoardGroupProps {
  title: string;
  groupBy: string;
  isActive: boolean;
  onToggleActive: (groupId: string) => void;
  onCreate: (columnId: string) => void;
  onOpenCardDetail: (id: string) => () => void;
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
}

export default function BoardGroup(props: BoardGroupProps) {
  const { title, groupBy, isActive, onCreate, onOpenCardDetail, onDragEnd } =
    props;
  return (
    <div className="column-group">
      <div className="group-header">
        <h3>{title}</h3>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columns.map((data) => (
            <BoardColumn
              {...data}
              onCreate={() => onCreate(data.id)}
              groupBy={groupBy}
              onOpenCardDetail={onOpenCardDetail}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
